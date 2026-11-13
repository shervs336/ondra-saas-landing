# Lumen: SaaS landing page

A premium landing page for **Lumen**, a made-up AI meeting-notes product. It's a portfolio piece showing the kind of marketing site freelance clients and startups pay for: editorial typography, layered motion, a working waitlist and a dark/light theme.

> Lumen is fictional. Company names, people and testimonials on the page are invented for the demo.

## Features
- **Animated product mockup**: a live transcript fills in line by line, then AI notes and action items check themselves off, on a loop
- **Bento-grid features** with hover glow
- **Testimonials marquee**: two rows moving in opposite directions, pause on hover
- **Pricing** with a monthly/yearly toggle and rolling price animation
- **FAQ accordion** (Base UI via shadcn/ui)
- **Waitlist form** using a Next.js Server Action → Supabase (Postgres + row-level security) → Resend confirmation email, with validation, honeypot spam protection, duplicate handling and a demo mode when no keys are set
- **Dark (default) and light themes**, saved per visitor with no flash on load
- Smooth scrolling (Lenis), scroll-reveal animations (Motion), full `prefers-reduced-motion` support
- Responsive down to 360px, keyboard accessible, skip link, semantic landmarks

## Stack ($0)
Next.js 16 (App Router, Server Actions) · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI) · Motion · Lenis · Supabase free tier · Resend free tier · Vercel Hobby

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000. Without env vars, the waitlist runs in **demo mode**: it logs the email on the server and shows the success state.

## Connect the waitlist (optional, free)
1. Create a project at [supabase.com](https://supabase.com) and run [`supabase/schema.sql`](supabase/schema.sql) in its SQL editor.
2. Create an API key at [resend.com](https://resend.com).
3. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` (or `SUPABASE_ANON_KEY` on older projects) and `RESEND_API_KEY`.

The public key can only **insert** into the `waitlist` table (row-level security), so it's safe to use from the server.

## Deploy
Push to GitHub, import the repo on [vercel.com](https://vercel.com), and add the same env vars in the project settings.

## Project structure
```
src/
  app/
    actions.ts        # joinWaitlist server action (Supabase + Resend)
    layout.tsx        # fonts, metadata, theme script, smooth scroll
    page.tsx          # section composition
    globals.css       # design tokens (warm ink / warm paper), utilities
  components/
    sections/         # hero, features, testimonials, pricing, faq, cta, footer
    product-mockup.tsx
    waitlist-form.tsx
    reveal.tsx        # scroll-reveal wrapper
    ui/               # shadcn/ui components
supabase/schema.sql
```

## What I learned
_Write 3–5 bullets here after you finish: e.g. design tokens with OKLCH, Server Actions + `useActionState`, building seamless CSS marquees, making motion respect reduced-motion._
