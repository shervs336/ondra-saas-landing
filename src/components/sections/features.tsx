import type { ReactNode } from "react";
import {
  AudioLinesIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  LockKeyholeIcon,
  MessageSquareIcon,
  SearchIcon,
  ShieldCheckIcon,
  UsersIcon,
  ListChecksIcon,
  PlugIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

function Card({
  className = "",
  icon,
  title,
  description,
  children,
  delay = 0,
}: {
  className?: string;
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-soft transition-colors duration-300 hover:border-accent/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-glow/0 blur-3xl transition-colors duration-500 group-hover:bg-glow/15"
        />
        <span className="grid size-9 place-items-center rounded-lg border bg-muted/60 text-accent">{icon}</span>
        <h3 className="mt-4 text-base font-medium">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
        {children && <div className="mt-6 flex-1">{children}</div>}
      </article>
    </Reveal>
  );
}

export function Features() {
  return (
    <section id="features" className="px-4 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Features"
        title={
          <>
            Notes that write themselves.
            <br />
            <span className="text-muted-foreground italic">Follow-ups that don&apos;t slip.</span>
          </>
        }
        description="Lumen listens, understands who said what, and hands you a clean record of every conversation."
      />

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-6">
        <Card
          className="md:col-span-4"
          icon={<AudioLinesIcon className="size-4" />}
          title="Live transcription with speaker labels"
          description="Accurate, real-time transcripts that know the difference between Maya and Dev, even when they talk over each other."
        >
          <div className="space-y-2.5 rounded-xl border bg-muted/40 p-4">
            {[
              { n: "Maya", c: "bg-amber-400/90", t: "Can we lock the launch date today?" },
              { n: "Dev", c: "bg-sky-400/90", t: "Yes, the 14th works if QA starts Monday." },
            ].map((l) => (
              <div key={l.n} className="flex items-center gap-3">
                <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-black/80 ${l.c}`}>
                  {l.n[0]}
                </span>
                <p className="rounded-lg bg-surface px-3 py-1.5 text-sm">{l.t}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card
          className="md:col-span-2"
          delay={0.05}
          icon={<ListChecksIcon className="size-4" />}
          title="Action items, assigned"
          description="Every “I'll take that” becomes a task with an owner and a due date."
        >
          <ul className="space-y-2">
            {[
              ["Send revised deck", "Fri"],
              ["Book QA window", "Mon"],
            ].map(([t, d]) => (
              <li key={t} className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2 text-sm">
                <span className="truncate">{t}</span>
                <span className="text-xs text-muted-foreground">{d}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          className="md:col-span-2"
          delay={0.05}
          icon={<SearchIcon className="size-4" />}
          title="Ask your meetings anything"
          description="Search every call you've ever had, in plain English."
        >
          <div className="rounded-xl border bg-muted/40 p-3 text-sm">
            <p className="flex items-center gap-2 text-muted-foreground">
              <SearchIcon className="size-3.5" /> What did we decide on pricing?
            </p>
            <p className="mt-3 border-t pt-3 leading-relaxed">
              Keep the $12 Pro plan and add annual billing.{" "}
              <span className="text-accent">Mar 4 · Pricing review</span>
            </p>
          </div>
        </Card>

        <Card
          className="md:col-span-2"
          delay={0.1}
          icon={<GlobeIcon className="size-4" />}
          title="Fluent in 40+ languages"
          description="Transcribe in one language, read the summary in another."
        >
          <div className="flex flex-wrap gap-1.5">
            {["English", "Español", "Français", "Deutsch", "日本語", "Português", "Tagalog", "हिन्दी"].map((l) => (
              <span key={l} className="rounded-full border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">
                {l}
              </span>
            ))}
          </div>
        </Card>

        <Card
          className="md:col-span-2"
          delay={0.15}
          icon={<PlugIcon className="size-4" />}
          title="Goes where your work goes"
          description="Push notes and tasks straight into the tools your team already uses."
        >
          <div className="grid grid-cols-4 gap-2">
            {[CalendarIcon, MessageSquareIcon, FileTextIcon, UsersIcon].map((Icon, i) => (
              <span key={i} className="grid aspect-square place-items-center rounded-lg border bg-muted/40 text-muted-foreground">
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </Card>

        <Card
          className="md:col-span-6"
          delay={0.1}
          icon={<ShieldCheckIcon className="size-4" />}
          title="Private by default"
          description="Recordings are encrypted at rest and in transit, never used to train models, and deleted on your schedule. Admins decide who sees what."
        >
          <div className="flex flex-wrap gap-2">
            {["End-to-end encryption", "No training on your data", "Auto-delete after 30, 90 or 365 days", "SSO & role-based access"].map(
              (t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1.5 text-xs">
                  <LockKeyholeIcon className="size-3 text-accent" /> {t}
                </span>
              ),
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
