"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades content in when it scrolls into view.
 * Plain CSS + IntersectionObserver (no animation library), so it adds almost no JavaScript.
 * Styles live in globals.css (.reveal); reduced motion and no-JS both show content immediately.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

/** Above-the-fold entrance: pure CSS, runs on first paint without waiting for JavaScript. */
export function FadeIn({
  children,
  delay = 0,
  className = "",
  rise = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Move + sharpen without fading, so text keeps full contrast throughout. */
  rise?: boolean;
}) {
  return (
    <div className={`${rise ? "rise-in" : "fade-in-up"} ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
