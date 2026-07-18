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
    transition: { duration: 0.5, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

interface HeroProps {
  /** One-line ticker for the marquee strip, e.g. next show + dates + venue. */
  ticker?: string | null;
}

/**
 * Full-viewport editorial hero: oversized left-aligned display type,
 * asymmetric copy/CTA row, and a marquee ticker with the next show.
 * Motion is prop-switched (`initial={false}`) under reduced motion to
 * avoid SSR/hydration opacity bugs; the marquee and spotlight sweep are
 * stopped via the motion-reduce CSS variant.
 */
export function Hero({ ticker }: HeroProps) {
  const reduceMotion = useReducedMotion();

  const motionProps = (i: number) => ({
    variants: entrance,
    custom: i,
    initial: reduceMotion ? (false as const) : ("hidden" as const),
    animate: "visible" as const,
  });

  return (
    <section className="film-grain relative flex min-h-svh flex-col overflow-hidden">
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
      <div aria-hidden className="vignette absolute inset-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-14 pt-32 sm:px-6 lg:px-8">
        <motion.div {...motionProps(0)}>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.35em] text-accent sm:text-sm">
            Est. 2025 — in residence at {siteConfig.collegePartner}
          </p>
        </motion.div>

        <h1 className="max-w-none text-left leading-[0.95]">
          <motion.span
            {...motionProps(1)}
            className="block text-[clamp(3rem,9vw,8rem)]"
          >
            Youth-led.
          </motion.span>
          <motion.span
            {...motionProps(2)}
            className="text-brand-gradient block pb-2 pr-4 text-[clamp(3rem,9vw,8rem)] italic"
          >
            Community-built.
          </motion.span>
          <motion.span
            {...motionProps(3)}
            className="block text-[clamp(3rem,9vw,8rem)]"
          >
            Stage-ready<span className="text-primary">.</span>
          </motion.span>
        </h1>

        <motion.div {...motionProps(4)}>
          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-left text-base leading-relaxed text-muted sm:text-lg">
              {siteConfig.description}
            </p>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/productions">See Our Next Show</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/get-involved">Get Involved</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee ticker with the next show */}
      {ticker ? (
        <div className="relative z-10 border-t border-border/60 bg-background/50 py-3 backdrop-blur-sm">
          <div className="flex overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex min-w-full shrink-0 animate-[hero-marquee_26s_linear_infinite] items-center motion-reduce:animate-none"
              >
                {[0, 1, 2].map((rep) => (
                  <span
                    key={rep}
                    className="flex items-center gap-6 pr-6 text-xs font-medium uppercase tracking-[0.25em] text-muted"
                  >
                    <span aria-hidden className="text-accent">
                      ✦
                    </span>
                    {ticker}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Keyframes for the slow spotlight sweep and the ticker */}
      <style>{`
        @keyframes spotlight-sweep {
          from { transform: translateX(-6%) scaleX(1); }
          to { transform: translateX(6%) scaleX(1.08); }
        }
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
