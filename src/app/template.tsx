"use client";

import * as React from "react";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { CurvedCurtain } from "@/components/CurvedCurtain";

// Gentle ease-in-out-sine: no sharp snap at either end, so the motion reads
// as a slow, fluid drift rather than a mechanical slide.
const EASE: [number, number, number, number] = [0.37, 0, 0.63, 1];

// Persists across template re-mounts, so we can tell the very first page load
// (handled by the entrance <Preloader />) apart from later navigations.
let hasNavigated = false;

// A soft, transparent black veil fades in first (~1s) so the outgoing page
// dims before the curtain itself starts moving.
const veilVariants = {
  enter: { opacity: 1 },
  idle: { opacity: 0, transition: { duration: 0.7, ease: EASE, delay: 0.35 } },
};

const curtainVariants = {
  // Incoming page starts fully covered...
  enter: { y: "0%" },
  // ...then the curtain slides up and off, revealing the page.
  idle: { y: "-110%", transition: { duration: 1.2, ease: EASE } },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const isFirstLoad = useRef(!hasNavigated);
  React.useEffect(() => {
    hasNavigated = true;
  }, []);

  // Respect reduced-motion: no curtain, just render the page.
  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      // On the first load the entrance Preloader owns the reveal, so skip.
      initial={isFirstLoad.current ? false : "enter"}
      animate="idle"
      className="relative"
    >
      <motion.div
        variants={veilVariants}
        className="pointer-events-none fixed inset-0 z-[89] bg-black/25"
        style={{ willChange: "opacity" }}
      />

      <motion.div
        variants={curtainVariants}
        className="pointer-events-none fixed inset-0 z-[90]"
        style={{ willChange: "transform" }}
      >
        <CurvedCurtain />
      </motion.div>

      {children}
    </motion.div>
  );
}

