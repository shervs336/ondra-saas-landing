import { Reveal } from "@/components/reveal";
import { WaitlistForm } from "@/components/waitlist-form";

export function Cta() {
  return (
    <section id="waitlist" className="px-4 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-16 text-center shadow-soft sm:px-16 sm:py-24">
          <div aria-hidden className="absolute inset-0 -z-0">
            <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
            <div className="absolute bottom-[-55%] left-1/2 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-glow/15 blur-[110px]" />
          </div>
          <div className="relative flex flex-col items-center">
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Stop taking notes.
              <br />
              <em className="text-accent">Start remembering.</em>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground text-balance">
              Join 2,400 teams on the waitlist. Beta spots open every week.
            </p>
            <div className="mt-8 flex w-full justify-center">
              <WaitlistForm id="cta-email" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
