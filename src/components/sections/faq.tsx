"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const faqs = [
  {
    q: "How does Ondra join my meetings?",
    a: "Connect your calendar and Ondra joins the calls you choose as a quiet participant. You can also start it manually from the desktop app for in-person meetings.",
  },
  {
    q: "Does everyone know they're being recorded?",
    a: "Yes. Ondra announces itself when it joins, shows a recording badge to every participant, and anyone can ask it to leave.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "Never. Your recordings and notes belong to you. They're encrypted, kept only as long as your retention setting allows, and never used for training.",
  },
  {
    q: "Which meeting apps are supported?",
    a: "Zoom, Google Meet and Microsoft Teams today, with more on the way. The desktop app works with anything that plays audio.",
  },
  {
    q: "What happens when the beta ends?",
    a: "Your notes stay put. Beta members keep Pro free until launch, then get three months at half price. You can drop to the Free plan at any time.",
  },
  {
    q: "Can I edit the notes Ondra writes?",
    a: "Of course. Every summary and action item is editable, and Ondra learns your team's preferred format over time.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="px-4 py-24 sm:py-32">
      <SectionHeading eyebrow="FAQ" title="Questions, answered." />
      <Reveal className="mx-auto mt-12 max-w-2xl">
        <Accordion className="rounded-2xl border bg-card px-6 shadow-soft">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="py-5 text-base hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
