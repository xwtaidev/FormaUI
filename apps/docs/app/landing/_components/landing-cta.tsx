import React from "react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@formaui/components";

import type { FaqItem, FooterLink, QuickStartStep } from "../content";

type LandingCtaProps = {
  quickStartSteps: QuickStartStep[];
  faqItems: FaqItem[];
  footerLinks: FooterLink[];
};

export function LandingCta({ quickStartSteps, faqItems, footerLinks }: LandingCtaProps) {
  return (
    <div className="space-y-10">
      <section id="quick-start-path" className="space-y-4">
        <h2 className="m-0 text-3xl font-semibold text-slate-950">Install & Quick Start Path</h2>
        <Card>
          <CardHeader>
            <CardTitle>From zero to productive in three CLI steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ol className="m-0 space-y-3 pl-5">
              {quickStartSteps.map((step) => (
                <li key={step.title} className="text-slate-700">
                  <p className="m-0 font-medium text-slate-900">{step.title}</p>
                  <code>{step.command}</code>
                </li>
              ))}
            </ol>
            <div className="flex flex-col gap-3 sm:flex-row">
              <form action="/quick-start">
                <Button type="submit">Open Quick Start</Button>
              </form>
              <form action="/installation">
                <Button type="submit" variant="outline">
                  Installation Guide
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="faq" className="space-y-4">
        <h2 className="m-0 text-3xl font-semibold text-slate-950">FAQ</h2>
        <Accordion type="single" collapsible className="rounded-xl border border-slate-200 bg-white px-6">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section id="landing-footer" className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-slate-100">
        <div className="space-y-4">
          <h2 className="m-0 text-3xl font-semibold">Build your product UI with source ownership</h2>
          <p className="m-0 max-w-3xl text-slate-300">
            Use the landing as your team baseline, then evolve blocks and components directly in your repo.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <form action="/introduction">
              <Button type="submit" variant="secondary">
                Open Docs
              </Button>
            </form>
            <form action="/quick-start">
              <Button type="submit" variant="outline">
                Start Quick
              </Button>
            </form>
          </div>
          <ul className="m-0 grid gap-2 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {footerLinks.map((link) => {
              const isExternal = link.href.startsWith("http");

              return (
                <li key={link.label} className="list-none">
                  <Link
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="text-sm text-slate-200 underline underline-offset-2 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
