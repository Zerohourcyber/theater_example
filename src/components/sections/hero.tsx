"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const entrance = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

interface HeroProps {
  /** Short announcement for the hero pill, e.g. the next show. */
  announcement?: { label: string; href: string } | null;
}

/**
 * Light "paper & aurora" hero: dot-grid canvas, pastel aurora glow behind
 * a centered sans headline, announcement pill, pill CTAs. Motion is
 * prop-switched (`initial={false}`) under reduced motion to avoid
 * SSR/hydration opacity bugs.
 */
export function Hero({ announcement }: HeroProps) {
  const reduceMotion = useReducedMotion();

  const motionProps = (i: number) => ({
    variants: entrance,
    custom: i,
    initial: reduceMotion ? (false as const) : ("hidden" as const),
    animate: "visible" as const,
  });

  return (
    <section className="dot-grid relative overflow-hidden border-b border-border">
      {/* Pastel aurora glow behind the headline */}
      <div
        aria-hidden
        className="aurora absolute left-1/2 top-24 h-[420px] w-[min(880px,95vw)] -translate-x-1/2"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pb-24 pt-40 text-center sm:pb-28">
        {announcement ? (
          <motion.div {...motionProps(0)}>
            <Link
              href={announcement.href}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1.5 pl-2 pr-3.5 text-sm text-foreground shadow-sm transition-colors hover:border-foreground/30"
            >
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-accent">
                On stage
              </span>
              {announcement.label}
              <ArrowRight aria-hidden className="size-3.5 text-muted" />
            </Link>
          </motion.div>
        ) : null}

        <motion.div {...motionProps(1)}>
          <h1 className="text-5xl tracking-tight sm:text-6xl md:text-[4.25rem] md:leading-[1.05]">
            Youth-led. Community-built.{" "}
            <span className="text-brand-gradient">Stage-ready.</span>
          </h1>
        </motion.div>

        <motion.div {...motionProps(2)}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {siteConfig.description}
          </p>
        </motion.div>

        <motion.div {...motionProps(3)}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/productions">See Our Next Show</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div {...motionProps(4)}>
          <p className="mt-12 text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Est. 2025 · In residence at {siteConfig.collegePartner}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
