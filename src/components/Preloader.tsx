"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CurvedCurtain } from "@/components/CurvedCurtain";
import { useIntro } from "@/components/intro-context";

/** Edit this to change the message that decodes on the entrance screen. */
const MESSAGE = "THANKS FOR WAITING — ALL SET.";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&*!<>?/_";

// The full scramble runs for this long before every character has resolved.
const SCRAMBLE_MS = 1400;
// How long the finished message holds before the curtain lifts.
const HOLD_MS = 550;
// Matches the gentle ease-in-out-sine used by the page-transition <template>.
const EASE: [number, number, number, number] = [0.37, 0, 0.63, 1];

// Decide "first visit this session" ONCE per page load. A module-level guard
// makes this idempotent across React StrictMode's double-invoked effects (dev),
// which would otherwise write sessionStorage on the first pass and then
// mis-read it as a returning visit on the second.
let introResolved = false;
let introShouldPlay = false;
function resolveIntro(): boolean {
  if (introResolved) return introShouldPlay;
  introResolved = true;
  try {
    if (sessionStorage.getItem("intro-played")) {
      introShouldPlay = false;
    } else {
      sessionStorage.setItem("intro-played", "1");
      introShouldPlay = true;
    }
  } catch {
    introShouldPlay = false;
  }
  return introShouldPlay;
}

/**
 * First-visit entrance animation: a dark screen with monospace text that
 * scrambles into a message, then a curved curtain slides up to reveal the site.
 *
 * Only plays once per browser session. The initial render already covers the
 * screen so the page content never flashes before it (returning visitors are
 * additionally hidden pre-paint by CSS: `html.intro-done #intro-curtain`).
 */
export function Preloader() {
  const { setDone } = useIntro();
  const reduce = useReducedMotion();

  // Starts covering so first paint shows the curtain, not the page underneath.
  const [active, setActive] = useState(true);
  const [run, setRun] = useState(false);
  const [lifting, setLifting] = useState(false);
  const [text, setText] = useState("");

  // Decide what to do on mount.
  useEffect(() => {
    if (resolveIntro()) {
      setRun(true); // first visit → play the scramble + reveal
    } else {
      setDone(true); // returning → just show the site
      setActive(false);
    }
  }, [setDone]);

  // Run the scramble, then lift the curtain.
  useEffect(() => {
    if (!run) return;

    if (reduce) {
      setText(MESSAGE);
      const t = setTimeout(() => {
        setDone(true);
        setActive(false);
      }, 700);
      return () => clearTimeout(t);
    }

    const chars = [...MESSAGE];
    const settle = chars.map((c) =>
      c === " " ? 0 : 350 + Math.random() * (SCRAMBLE_MS - 350),
    );
    const start = performance.now();
    let raf = 0;

    // The visual scramble (rAF pauses in background tabs — that's fine, the
    // lift below is driven by a wall-clock timer so the reveal never hangs).
    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= SCRAMBLE_MS) {
        setText(MESSAGE);
        return;
      }
      setText(
        chars
          .map((c, i) => {
            if (c === " ") return " ";
            if (elapsed >= settle[i]) return c;
            return GLYPHS[(Math.random() * GLYPHS.length) | 0];
          })
          .join(""),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Lift on a real timer so it fires regardless of rAF throttling.
    const lift = setTimeout(() => {
      setText(MESSAGE);
      setDone(true); // reveal + let page content stagger in as the curtain lifts
      setLifting(true);
    }, SCRAMBLE_MS + HOLD_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(lift);
    };
  }, [run, reduce, setDone]);

  if (!active) return null;

  return (
    <motion.div
      id="intro-curtain"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      // Keep the same unit (%) on both ends so framer-motion can interpolate;
      // mixing 0 (px) and "-110%" silently fails to animate.
      initial={{ y: "0%" }}
      animate={{ y: lifting ? "-110%" : "0%" }}
      transition={{ duration: 1.15, ease: EASE }}
      onAnimationComplete={() => {
        if (lifting) setActive(false);
      }}
    >
      <CurvedCurtain />
      <span className="relative z-10 select-none px-6 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-200 tabular-nums sm:text-sm">
        {text}
      </span>
    </motion.div>
  );
}
