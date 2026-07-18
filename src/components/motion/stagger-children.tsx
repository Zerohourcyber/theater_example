"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  interval?: number;
  /** Initial delay before the first child. */
  delay?: number;
}

const parent = {
  hidden: {},
  visible: (custom: { interval: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.interval,
      delayChildren: custom.delay,
    },
  }),
};

const child = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Container that staggers its StaggerItem children into view on scroll.
 *
 * Always renders motion elements — under reduced motion `initial={false}`
 * makes the whole tree start at its visible state with no animation.
 * (Branching to plain divs caused an SSR/hydration bug that left server-
 * rendered opacity:0 styles in place.)
 */
export function StaggerChildren({
  children,
  className,
  interval = 0.08,
  delay = 0,
}: StaggerChildrenProps) {
  const reduceMotion = useReducedMotion();

  // Under reduced motion, skip the in-view choreography: mount the whole
  // tree directly at its visible state (same elements, different props).
  if (reduceMotion) {
    return (
      <motion.div
        className={className}
        variants={parent}
        custom={{ interval: 0, delay: 0 }}
        initial={false}
        animate="visible"
        transition={{ duration: 0 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={parent}
      custom={{ interval, delay }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

/** One staggered child; inherits reduced-motion handling from its parent. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={child}>
      {children}
    </motion.div>
  );
}
