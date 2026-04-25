import { inspectProject } from "../project/detect-project.js";
import { createLogger, type Logger } from "../utils/logger.js";

export interface DoctorCommandOptions {
  cwd?: string;
  logger?: Logger;
}

export async function runDoctorCommand(options: DoctorCommandOptions = {}) {
  const cwd = options.cwd ?? process.cwd();
  const logger = options.logger ?? createLogger();
  const report = await inspectProject(cwd);

  logger.info("FormaUI Doctor");
  logger.info(`Project: ${cwd}`);
  logger.info(`Package manager: ${report.packageManager}`);

  for (const check of report.checks) {
    logger.info(`[${check.ok ? "OK" : "MISSING"}] ${check.label}`);
  }

  const failedChecks = report.checks.filter((check) => !check.ok);
  if (failedChecks.length > 0) {
    logger.warn("Suggested fixes:");
    for (const check of failedChecks) {
      logger.warn(`- ${check.hint}`);
    }
  } else {
    logger.success("All checks passed.");
  }

  return report;
}
