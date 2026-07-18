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

/** Container that staggers its StaggerItem children into view on scroll. */
export function StaggerChildren({
  children,
  className,
  interval = 0.08,
  delay = 0,
}: StaggerChildrenProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
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

/** One staggered child. No-ops (renders a plain div) under reduced motion. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={child}>
      {children}
    </motion.div>
  );
}
