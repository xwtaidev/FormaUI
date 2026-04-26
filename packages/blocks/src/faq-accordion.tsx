import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@formaui/components";

const DEFAULT_FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "Can I install only one block?",
    answer: "Yes. Every block ships as a standalone registry item."
  },
  {
    id: "faq-2",
    question: "Do these blocks work with existing FormaUI components?",
    answer: "Yes. Marketing blocks are built from FormaUI components and token-friendly classes."
  },
  {
    id: "faq-3",
    question: "Can I edit copy and layout after install?",
    answer: "Absolutely. FormaUI is source-owned, so your team can customize content and behavior directly."
  }
] as const;

export interface FaqAccordionProps {
  title?: string;
  description?: string;
  items?: ReadonlyArray<{ id: string; question: string; answer: string }>;
}

export function FaqAccordion({
  title = "FAQ",
  description = "Common questions from teams adopting FormaUI for marketing and product surfaces.",
  items = DEFAULT_FAQ_ITEMS
}: FaqAccordionProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Accordion type="single" collapsible className="rounded-lg border border-border px-5">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
