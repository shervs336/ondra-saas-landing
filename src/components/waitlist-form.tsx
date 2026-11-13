"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon, CheckIcon, LoaderCircleIcon } from "lucide-react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";

export function WaitlistForm({ id }: { id: string }) {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(
    joinWaitlist,
    { status: "idle" },
  );
  const done = state.status === "success";

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            className="flex h-12 items-center gap-3 rounded-full border border-accent/30 bg-accent/10 px-5 text-sm"
          >
            <span className="grid size-6 place-items-center rounded-full bg-accent text-accent-foreground">
              <CheckIcon className="size-3.5" strokeWidth={3} />
            </span>
            {state.message}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={action}
            exit={{ opacity: 0, y: -8 }}
            className="group relative flex h-12 items-center rounded-full border border-input bg-surface/80 p-1 pl-5 shadow-soft backdrop-blur transition-colors focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/15"
          >
            <label htmlFor={id} className="sr-only">
              Work email
            </label>
            <input
              id={id}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={state.status === "error"}
              aria-describedby={state.status === "error" ? `${id}-error` : undefined}
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
            />
            {/* Honeypot for bots */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-full shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {pending ? (
                <LoaderCircleIcon className="size-4 animate-spin" aria-label="Joining" />
              ) : (
                <>
                  Join the beta
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      <p
        id={`${id}-error`}
        aria-live="polite"
        className="mt-2 min-h-5 px-5 text-left text-xs text-destructive"
      >
        {state.status === "error" ? state.message : ""}
      </p>
    </div>
  );
}
