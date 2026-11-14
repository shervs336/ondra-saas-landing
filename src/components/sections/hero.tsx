import { FadeIn, Reveal } from "@/components/reveal";
import { WaitlistForm } from "@/components/waitlist-form";
import { ProductMockup } from "@/components/product-mockup";

const companies = ["Brasswing", "Quillmoor", "Fernhollow Labs", "Tallowmere", "Oarlock", "Pebblestack & Co"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-36 pb-20 sm:pt-44">
      {/* Background: grid + glow */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="absolute top-[-20%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-glow/25 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <FadeIn>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 rounded-full border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            Now in private beta · 2,400 teams waiting
          </a>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="mt-6 font-serif text-[3.25rem] leading-[0.95] tracking-tight text-balance sm:text-7xl md:text-8xl">
            Every meeting,{" "}
            <em className="bg-gradient-to-br from-glow to-accent bg-clip-text pr-1 text-transparent">remembered.</em>
          </h1>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground text-balance sm:text-lg">
            Ondra joins your calls, writes the notes, and turns every decision into a follow-up, so your team can
            stop typing and start talking.
          </p>
        </FadeIn>

        <FadeIn delay={0.24} className="mt-8 flex w-full justify-center">
          <WaitlistForm id="hero-email" />
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="text-xs text-muted-foreground">Free during beta. Works with Zoom, Meet and Teams.</p>
        </FadeIn>
      </div>

      <FadeIn rise delay={0.35} className="mt-16 sm:mt-20">
        <ProductMockup />
      </FadeIn>

      <Reveal className="mx-auto mt-20 max-w-4xl">
        <p className="text-center text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Trusted by thoughtful teams
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {companies.map((c) => (
            <li key={c} className="font-serif text-xl text-muted-foreground/70 italic sm:text-2xl">
              {c}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
