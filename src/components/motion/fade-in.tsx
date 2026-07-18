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
 * Scroll-triggered fade + rise. Renders children immediately (no motion)
 * when the user prefers reduced motion.
 */
export function FadeIn({
  delay = 0,
  rise = 8,
  className,
  children,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
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
