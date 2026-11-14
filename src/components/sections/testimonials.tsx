import { SectionHeading } from "@/components/section-heading";

const quotes = [
  { name: "Priya Raman", role: "Head of Product, Quillmoor", text: "I used to spend 30 minutes after every call writing notes. Now I just read Ondra's and fix one line." },
  { name: "Marcus Webb", role: "Engineering Manager, Oarlock", text: "The action items are scary accurate. It caught a promise I'd already forgotten I made." },
  { name: "Ana Lucía Torres", role: "Founder, Tallowmere", text: "Our investor updates basically write themselves now. Search across old calls is the killer feature." },
  { name: "Jonah Feld", role: "Sales Lead, Brasswing", text: "I'm finally present on discovery calls instead of typing the whole time. My close rate noticed." },
  { name: "Keiko Tanaka", role: "Design Director, Fernhollow Labs", text: "It's the first AI tool our whole team actually kept using after the first week." },
  { name: "Samuel Okafor", role: "COO, Pebblestack & Co", text: "Onboarding new hires is easier when they can search a year of decisions in seconds." },
  { name: "Lena Brandt", role: "Researcher, Oarlock", text: "User interviews used to take a day to synthesize. Ondra gives me the themes before I've hung up." },
  { name: "Rafael Mendes", role: "CTO, Quillmoor", text: "The privacy controls are what got it past our security review. The notes are what made people love it." },
];

const gradients = [
  "from-amber-300 to-orange-500",
  "from-sky-300 to-indigo-500",
  "from-emerald-300 to-teal-600",
  "from-rose-300 to-fuchsia-500",
];

function QuoteCard({ q, i }: { q: (typeof quotes)[number]; i: number }) {
  const initials = q.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <figure className="w-[300px] shrink-0 rounded-2xl border bg-card p-5 shadow-soft sm:w-[360px]">
      <blockquote className="text-sm leading-relaxed">&ldquo;{q.text}&rdquo;</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span
          className={`grid size-8 place-items-center rounded-full bg-gradient-to-br text-[11px] font-semibold text-white ${gradients[i % gradients.length]}`}
        >
          {initials}
        </span>
        <span>
          <span className="block text-sm font-medium">{q.name}</span>
          <span className="block text-xs text-muted-foreground">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse, offset }: { items: typeof quotes; reverse?: boolean; offset: number }) {
  return (
    <div className="group mask-fade-x flex overflow-hidden">
      <div
        className={`flex w-max gap-4 pr-4 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.map((q, i) => (
          <QuoteCard key={q.name} q={q} i={i + offset} />
        ))}
        {/* Duplicate for a seamless loop; hidden from screen readers */}
        <div aria-hidden className="flex gap-4">
          {items.map((q, i) => (
            <QuoteCard key={`dup-${q.name}`} q={q} i={i + offset} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="px-4">
        <SectionHeading
          eyebrow="Loved by early teams"
          title={<>Fewer notes. More <em className="text-accent">talking.</em></>}
        />
      </div>
      <div className="mt-16 flex flex-col gap-4">
        <Row items={quotes.slice(0, 4)} offset={0} />
        <Row items={quotes.slice(4)} offset={2} reverse />
      </div>
    </section>
  );
}
