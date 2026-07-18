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
 * staggered entrance. All motion disabled under prefers-reduced-motion.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  const MotionOrDiv = reduceMotion ? "div" : motion.div;
  const motionProps = (i: number) =>
    reduceMotion
      ? {}
      : { variants: entrance, custom: i, initial: "hidden", animate: "visible" };

  return (
    <section className="film-grain relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Sweeping spotlight */}
      <div
        aria-hidden
        className={
          reduceMotion
            ? "spotlight absolute inset-0"
            : "spotlight absolute inset-0 animate-[spotlight-sweep_14s_ease-in-out_infinite_alternate]"
        }
        style={{ transformOrigin: "50% 0%" }}
      />
      <div aria-hidden className="vignette absolute inset-0" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-32 text-center">
        <MotionOrDiv {...motionProps(0)}>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-accent">
            {siteConfig.name}
          </p>
        </MotionOrDiv>

        <MotionOrDiv {...motionProps(1)}>
          <h1 className="text-5xl sm:text-6xl md:text-[4.5rem]">
            Youth-led.{" "}
            <span className="text-brand-gradient">Community-built.</span>{" "}
            Stage-ready.
          </h1>
        </MotionOrDiv>

        <MotionOrDiv {...motionProps(2)}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            {siteConfig.description}
          </p>
        </MotionOrDiv>

        <MotionOrDiv {...motionProps(3)}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/productions">See Our Next Show</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </MotionOrDiv>
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
