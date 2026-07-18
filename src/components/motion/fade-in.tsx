"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children?: ReactNode;
  className?: string;
  /** Delay in seconds before the element animates in view. */
  delay?: number;
  /** Vertical rise distance in px (SPEC: 8px default). */
  rise?: number;
}

/**
 * Scroll-triggered fade + rise.
 *
 * Always renders motion.div — under reduced motion we pass `initial={false}`
 * so content starts fully visible with no animation. (Branching to a plain
 * div here caused an SSR/hydration bug: server HTML carries opacity:0 from
 * the motion branch, and a plain client div never clears it.)
 */
export function FadeIn({
  delay = 0,
  rise = 8,
  className,
  children,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  // Under reduced motion, skip the in-view choreography entirely: mount
  // directly at the visible state (same element, different props only).
  if (reduceMotion) {
    return (
      <motion.div
        className={className}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: rise }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
