"use client";

import { MotionConfig, motion } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Soft blur-and-rise entrance. `step` staggers blocks on first load. */
export function Reveal({
  children,
  step = 0,
  className,
}: {
  children: React.ReactNode;
  step?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: Math.min(step, 6) * 0.07 }}
    >
      {children}
    </motion.div>
  );
}
