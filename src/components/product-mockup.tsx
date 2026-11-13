"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckIcon, SparklesIcon } from "lucide-react";

const transcript = [
  { who: "Maya", color: "bg-amber-400/90", text: "So the main question is whether we ship search in Q3 or push it." },
  { who: "Dev", color: "bg-sky-400/90", text: "If we cut the filters, I think we can make the August release." },
  { who: "Maya", color: "bg-amber-400/90", text: "Okay. Let's do that and keep filters for the fall." },
  { who: "Iris", color: "bg-emerald-400/90", text: "I'll update the roadmap and tell the support team." },
];

const summary = [
  "Search ships in the August release, without filters.",
  "Filters move to the fall roadmap.",
];

const actions = [
  { task: "Update the Q3 roadmap", owner: "Iris" },
  { task: "Scope search without filters", owner: "Dev" },
  { task: "Brief support on the change", owner: "Iris" },
];

// Steps: 0..3 transcript lines, 4 summary, 5..7 actions, then hold and restart.
const LAST = transcript.length + 1 + actions.length;

export function ProductMockup() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const delay = step >= LAST ? 4200 : step === transcript.length ? 1100 : 900;
    const t = setTimeout(() => setStep((s) => (s >= LAST ? 0 : s + 1)), delay);
    return () => clearTimeout(t);
  }, [step, reduce]);

  const s = reduce ? LAST : step;
  const lines = transcript.slice(0, Math.min(s + 1, transcript.length));
  const showSummary = s >= transcript.length;
  const actionCount = Math.max(0, s - transcript.length);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div aria-hidden className="absolute -inset-x-10 -top-10 -bottom-10 -z-10 rounded-[3rem] bg-glow/20 blur-3xl" />
      <div
        role="img"
        aria-label="Lumen app: a live meeting transcript on the left, AI summary and action items on the right"
        className="overflow-hidden rounded-2xl border bg-surface/90 shadow-soft backdrop-blur-xl"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="ml-3 truncate text-xs text-muted-foreground">Q3 roadmap sync</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-500">
            <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
            Recording
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr]">
          {/* Transcript */}
          <div className="border-b p-5 md:border-r md:border-b-0 md:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Live transcript</p>
              <Waveform active={!reduce} />
            </div>
            <ul className="mt-4 flex min-h-64 flex-col gap-4">
              <AnimatePresence initial={false}>
                {lines.map((l, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-3"
                  >
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-black/80 ${l.color}`}>
                      {l.who[0]}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium">{l.who}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{l.text}</p>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* AI notes */}
          <div className="bg-muted/40 p-5 md:p-6">
            <p className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-accent uppercase">
              <SparklesIcon className="size-3.5" /> Lumen notes
            </p>
            <div className="mt-4 min-h-64">
              <AnimatePresence>
                {showSummary ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-sm font-medium">Decisions</p>
                    <ul className="mt-2 space-y-1.5">
                      {summary.map((t) => (
                        <li key={t} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-sm font-medium">Action items</p>
                    <ul className="mt-2 space-y-2">
                      {actions.map((a, i) => (
                        <motion.li
                          key={a.task}
                          initial={false}
                          animate={{ opacity: i < actionCount ? 1 : 0.25 }}
                          transition={{ duration: 0.35 }}
                          className="flex items-center gap-2.5 rounded-lg border bg-surface px-3 py-2 text-sm"
                        >
                          <span
                            className={`grid size-4 shrink-0 place-items-center rounded border transition-colors ${
                              i < actionCount ? "border-accent bg-accent text-accent-foreground" : ""
                            }`}
                          >
                            {i < actionCount && <CheckIcon className="size-3" strokeWidth={3} />}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{a.task}</span>
                          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                            {a.owner}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2.5"
                  >
                    <p className="text-sm text-muted-foreground">Listening and taking notes…</p>
                    {[80, 64, 72].map((w) => (
                      <div key={w} className="h-3 animate-pulse rounded-full bg-foreground/8" style={{ width: `${w}%` }} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Waveform({ active }: { active: boolean }) {
  const bars = [0.4, 0.8, 0.55, 1, 0.65, 0.9, 0.45, 0.7, 0.5];
  return (
    <div aria-hidden className="flex h-4 items-center gap-0.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full bg-accent"
          style={{ height: `${h * 100}%` }}
          animate={active ? { scaleY: [0.35, 1, 0.5, 0.9, 0.35] } : undefined}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.09, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
