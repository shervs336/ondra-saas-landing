"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const plans = [
  {
    name: "Free",
    blurb: "For trying Lumen on your own calls.",
    monthly: 0,
    yearly: 0,
    cta: "Start free",
    features: ["10 meetings a month", "Live transcripts", "AI summaries", "7-day history"],
  },
  {
    name: "Pro",
    blurb: "For people who live in meetings.",
    monthly: 12,
    yearly: 10,
    cta: "Join the beta",
    featured: true,
    features: ["Unlimited meetings", "Action items with owners", "Search across every call", "40+ languages", "Unlimited history"],
  },
  {
    name: "Team",
    blurb: "For teams that share decisions.",
    monthly: 24,
    yearly: 20,
    cta: "Talk to us",
    features: ["Everything in Pro", "Shared team workspace", "Admin & retention controls", "SSO and role-based access", "Priority support"],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="px-4 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple plans. Free while in beta."
        description="Everyone on the waitlist gets Pro free until launch, then 3 months at half price."
      />

      <Reveal className="mt-10 flex items-center justify-center gap-3 text-sm">
        <label htmlFor="billing" className={yearly ? "text-muted-foreground" : ""}>
          Monthly
        </label>
        <Switch id="billing" checked={yearly} onCheckedChange={setYearly} aria-label="Bill yearly" />
        <label htmlFor="billing" className={yearly ? "" : "text-muted-foreground"}>
          Yearly
        </label>
        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">Save 17%</span>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((p, i) => {
          const price = yearly ? p.yearly : p.monthly;
          return (
            <Reveal key={p.name} delay={i * 0.06}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-soft ${
                  p.featured ? "border-accent/40 bg-card ring-1 ring-accent/20" : "bg-card"
                }`}
              >
                {p.featured && (
                  <>
                    <div aria-hidden className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                    <span className="absolute top-6 right-6 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                      Most popular
                    </span>
                  </>
                )}
                <h3 className="text-base font-medium">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-serif text-5xl tracking-tight">$</span>
                  <span className="relative inline-flex h-14 overflow-hidden font-serif text-5xl leading-[3.5rem] tracking-tight">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={price}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {price}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    {price === 0 ? "forever" : yearly ? "/ month, billed yearly" : "/ month"}
                  </span>
                </div>
                <a
                  href="#waitlist"
                  className={`mt-6 inline-flex h-10 items-center justify-center rounded-full text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ${
                    p.featured ? "bg-primary text-primary-foreground" : "border bg-muted/50 hover:bg-muted"
                  }`}
                >
                  {p.cta}
                </a>
                <ul className="mt-6 space-y-3 border-t pt-6 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
