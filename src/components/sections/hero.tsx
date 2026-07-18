"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const entrance = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/**
 * Full-viewport cinematic hero: spotlight sweep, film grain, vignette,
 * staggered entrance. Always renders motion elements — reduced motion is
 * handled with `initial={false}` (content starts visible, no animation)
 * to avoid SSR/hydration opacity bugs, and the spotlight sweep is stopped
 * via the motion-reduce CSS variant.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  const motionProps = (i: number) => ({
    variants: entrance,
    custom: i,
    initial: reduceMotion ? (false as const) : ("hidden" as const),
    animate: "visible" as const,
  });

  return (
    <section className="film-grain relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Sweeping spotlight; sweep disabled under reduced motion via CSS */}
      <div
        aria-hidden
        className="spotlight absolute inset-0 animate-[spotlight-sweep_14s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
        style={{ transformOrigin: "50% 0%" }}
      />
      {/* Angled volumetric beams, as if from a lighting rig above */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[85vh] w-44 -translate-x-[135%] rotate-[18deg] bg-gradient-to-b from-primary/20 via-primary/6 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[85vh] w-36 translate-x-[45%] -rotate-[15deg] bg-gradient-to-b from-accent/15 via-accent/5 to-transparent blur-3xl"
      />
      {/* Stage-floor glow at the bottom edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(59,155,255,0.12),transparent_70%)]"
      />
      <div aria-hidden className="vignette absolute inset-0" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-32 text-center">
        <motion.div {...motionProps(0)}>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-accent">
            {siteConfig.name}
          </p>
        </motion.div>

        <motion.div {...motionProps(1)}>
          <h1 className="text-5xl sm:text-6xl md:text-[4.5rem]">
            Youth-led.{" "}
            <span className="text-brand-gradient">Community-built.</span>{" "}
            Stage-ready.
          </h1>
        </motion.div>

        <motion.div {...motionProps(2)}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            {siteConfig.description}
          </p>
        </motion.div>

        <motion.div {...motionProps(3)}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/productions">See Our Next Show</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Keyframes for the slow spotlight sweep */}
      <style>{`
        @keyframes spotlight-sweep {
          from { transform: translateX(-6%) scaleX(1); }
          to { transform: translateX(6%) scaleX(1.08); }
        }
      `}</style>
    </section>
  );
}
