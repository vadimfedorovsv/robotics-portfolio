"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useInView, useReducedMotion } from "motion/react";
import { RollingNumber } from "@/components/ui/rolling-number";
import type { Stat } from "@/lib/data";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  // Reduced-motion users get a plain fade (MotionConfig below drops the transform).
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Counts a stat up from zero (Cult UI RollingNumber) once it is on screen. */
export function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  // Always render 0 first so server HTML and the first client render match.
  const [value, setValue] = useState(0);
  // Server HTML never knows the user's motion preference, so branch on it only after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (inView || reduce) setValue(stat.value);
  }, [inView, reduce, stat.value]);

  return (
    <div ref={ref} className="min-w-0">
      <dd className="font-mono text-2xl font-medium tracking-tight text-heading tabular-nums sm:text-3xl">
        {stat.prefix}
        {/* Reduced-motion users see the final number with no counting animation. */}
        {mounted && reduce ? stat.value : <RollingNumber value={value} />}
        <span className="text-primary">{stat.suffix}</span>
      </dd>
      <dt className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</dt>
    </div>
  );
}

/** Soft emerald glow that follows the cursor on pointer devices. */
export function Spotlight() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  if (!pos) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgb(52 211 153 / 0.06), transparent 80%)`,
      }}
    />
  );
}

/** Tracks which section is in view so the sidebar nav can highlight it. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const onChange = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    };
    let obs: IntersectionObserver | null = null;
    // Watch a band from 30% to 40% of the viewport height. Margins are in px because
    // percentage rootMargins are not reliably resolved against the viewport height.
    const build = () => {
      obs?.disconnect();
      const h = window.innerHeight;
      obs = new IntersectionObserver(onChange, {
        rootMargin: `-${Math.round(h * 0.3)}px 0px -${Math.round(h * 0.6)}px 0px`,
      });
      els.forEach((el) => obs!.observe(el));
    };
    build();
    window.addEventListener("resize", build);
    return () => {
      window.removeEventListener("resize", build);
      obs?.disconnect();
    };
  }, [ids]);
  return active;
}
