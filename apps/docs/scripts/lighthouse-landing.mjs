import { execFileSync, spawn } from "node:child_process";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";

const BASE_URL = process.env.LIGHTHOUSE_BASE_URL ?? "http://127.0.0.1:4311";
const TARGET_URL = `${BASE_URL}/landing`;
const THRESHOLDS = {
  performance: 90,
  accessibility: 95,
  "best-practices": 95,
  seo: 95
};

async function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.status >= 200 && response.status < 500) {
        return;
      }
    } catch {
      // Keep waiting until timeout.
    }

    await delay(500);
  }

  throw new Error(`Timed out waiting for Next.js server at ${url}`);
}

function toPercent(score) {
  return Math.round((score ?? 0) * 100);
}

async function run() {
  const url = new URL(BASE_URL);
  const port = Number(url.port || "80");
  const hostname = url.hostname;

  if (Number.isNaN(port)) {
    throw new Error(`Invalid LIGHTHOUSE_BASE_URL port: ${BASE_URL}`);
  }

  execFileSync("pnpm", ["exec", "next", "build"], { stdio: "inherit" });

  const serverProcess = spawn("pnpm", ["exec", "next", "start", "-p", String(port), "-H", hostname], {
    stdio: "inherit"
  });

  let chrome;

  try {
    await waitForServer(TARGET_URL);

    const { launch } = await import("chrome-launcher");
    const lighthouseModule = await import("lighthouse");
    const lighthouse = lighthouseModule.default;

    chrome = await launch({
      chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
    });

    const runnerResult = await lighthouse(TARGET_URL, {
      port: chrome.port,
      logLevel: "error",
      output: "json",
      onlyCategories: Object.keys(THRESHOLDS)
    });

    const categories = runnerResult?.lhr?.categories;
    if (!categories) {
      throw new Error("Lighthouse did not return category scores.");
    }

    const failures = [];

    for (const [category, threshold] of Object.entries(THRESHOLDS)) {
      const score = toPercent(categories[category]?.score);
      const pass = score >= threshold;
      const message = `${pass ? "PASS" : "FAIL"} ${category}: ${score} (threshold ${threshold})`;
      console.log(message);

      if (!pass) {
        failures.push(message);

        const failedAudits =
          categories[category]?.auditRefs
            ?.filter((auditRef) => {
              const audit = runnerResult.lhr.audits[auditRef.id];
              return typeof audit?.score === "number" && audit.score < 1;
            })
            .map((auditRef) => {
              const audit = runnerResult.lhr.audits[auditRef.id];
              const auditScore = toPercent(audit.score);
              return `- ${auditRef.id}: ${audit.title} (${auditScore})`;
            }) ?? [];

        if (failedAudits.length > 0) {
          console.log(`Failed audits in ${category}:`);
          failedAudits.forEach((line) => {
            console.log(line);
          });

          for (const auditRef of categories[category]?.auditRefs ?? []) {
            const audit = runnerResult.lhr.audits[auditRef.id];
            if (!audit || typeof audit.score !== "number" || audit.score >= 1) {
              continue;
            }

            const detailItems = audit.details?.items;
            if (Array.isArray(detailItems) && detailItems.length > 0) {
              console.log(`Details for ${auditRef.id}:`);
              detailItems.slice(0, 5).forEach((item) => {
                const nodeLabel =
                  (typeof item.node === "object" && item.node !== null && "selector" in item.node
                    ? item.node.selector
                    : undefined) ??
                  (typeof item.node === "object" && item.node !== null && "snippet" in item.node
                    ? item.node.snippet
                    : undefined) ??
                  "unknown-node";
                console.log(`  - ${String(nodeLabel)}`);
              });
            }
          }
        }
      }
    }

    if (failures.length > 0) {
      throw new Error(`Lighthouse thresholds not satisfied:\n${failures.join("\n")}`);
    }
  } finally {
    if (chrome) {
      await chrome.kill();
    }
    serverProcess.kill("SIGTERM");
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
