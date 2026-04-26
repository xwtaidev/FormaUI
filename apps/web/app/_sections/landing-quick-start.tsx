import React from "react";
import Link from "next/link";

import { quickStartSteps, webLinks } from "./content";

export default function LandingQuickStart() {
  return (
    <section data-section="LandingQuickStart" className="landing-shell pt-8">
      <div className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:grid-cols-2">
        <article className="rounded-2xl bg-slate-950 p-6 text-slate-100">
          <p className="text-xs uppercase tracking-wide text-slate-400">Quick Start</p>
          <pre className="mt-3 overflow-x-auto text-sm text-emerald-300">{`1 pnpm install formaui\n2 import { Button, Card } from "formaui"\n3 export default function Dashboard() {\n4   return <Card className="p-6">\n5     <Button>Create Project</Button>\n6   </Card>;\n7 }`}</pre>
        </article>
        <article>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Quick Start</h2>
          <ol className="mt-4 space-y-3">
            {quickStartSteps.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">
                  {index + 1}. {step.title}
                </p>
                <p className="text-sm text-slate-600">{step.command}</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium text-emerald-700">
            <Link href={webLinks.docs}>View docs</Link>
            <Link href="/showcase">Browse blocks</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
