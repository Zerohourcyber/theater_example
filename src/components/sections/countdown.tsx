"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { formatDate } from "@/lib/utils";

interface CountdownProps {
  /** ISO datetime of opening night. */
  target: string;
  productionTitle: string;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getRemaining(target: string): Remaining | null {
  const diff = new Date(target).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  const reduceMotion = useReducedMotion();
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border bg-surface shadow-sm sm:h-24 sm:w-24">
        {reduceMotion ? (
          <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-semibold text-foreground sm:text-5xl">
            {display}
          </span>
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={display}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center font-display text-3xl font-semibold text-foreground sm:text-5xl"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="text-xs uppercase tracking-widest text-muted">{label}</span>
    </div>
  );
}

/**
 * Countdown to opening night. Renders nothing until the first client tick
 * (avoids hydration mismatch) and nothing once the date has passed. State is
 * only ever set from rAF/interval callbacks, never synchronously in effects.
 */
export function Countdown({ target, productionTitle }: CountdownProps) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getRemaining(target));
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 1_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [target]);

  if (!remaining) return null;

  return (
    <section aria-label="Countdown to opening night" className="border-y border-border/60 bg-surface/40 py-14">
      <Container className="flex flex-col items-center gap-8 text-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Opening night
          </p>
          <p className="mt-2 font-display text-2xl sm:text-3xl">
            {productionTitle} · {formatDate(target)}
          </p>
        </div>
        <div className="flex gap-3 sm:gap-5" role="timer" aria-live="off">
          <Digit value={remaining.days} label="Days" />
          <Digit value={remaining.hours} label="Hours" />
          <Digit value={remaining.minutes} label="Minutes" />
          <Digit value={remaining.seconds} label="Seconds" />
        </div>
      </Container>
    </section>
  );
}
