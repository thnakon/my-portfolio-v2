"use client";

import React from "react";
import Image from "next/image";
import { useIntro } from "@/components/intro-context";
import { useLanguage } from "@/components/language-context";
import GridScramble from "@/components/GridScramble";

export default function Home() {
  // `isDone` flips true when the entrance Preloader lifts its curtain (or
  // immediately on a returning visit), so the content staggers in on reveal.
  const { isDone } = useIntro();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white text-black flex flex-col justify-between p-4 sm:p-8 selection:bg-black selection:text-white">
      {/* Top Center: Logo */}
      <div
        className={`absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ${
          isDone ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <Image src="/logo.png" alt="Logo" width={36} height={36} priority />
      </div>

      {/* Top Left: Title & Name */}
      <div
        className={`z-20 transition-all duration-1000 ${
          isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-[10px] sm:text-[11px] font-bold text-neutral-400 tracking-[0.15em] mb-1 uppercase">
          {t("home.role")}
        </p>
        <h1 className="text-2xl sm:text-[34px] font-bold tracking-tight leading-none uppercase text-black">
          {t("home.name.first")}
        </h1>
        <h2 className="text-2xl sm:text-[34px] font-bold tracking-tight leading-none uppercase text-black mt-1">
          {t("home.name.last")}
        </h2>
      </div>

      {/* Center: Grid Scramble Name */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-1000 delay-300 ${
          isDone ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <GridScramble word="warm" />
      </div>
      {/* Bottom Section: Info Footer & Language Switcher */}
      <div
        className={`z-20 flex flex-col sm:flex-row justify-between items-end gap-8 w-full transition-all duration-1000 delay-500 ${
          isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Bottom Left: Info Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 w-full max-w-3xl">
          <div className="border-t border-neutral-200 pt-3">
            <p className="text-[10px] font-normal text-neutral-400 tracking-wider uppercase">
              {t("home.base.label")}
            </p>
            <p className="text-[11px] font-bold text-neutral-900 uppercase mt-1 tracking-wide">
              {t("home.base.value")}
            </p>
          </div>
          <div className="border-t border-neutral-200 pt-3">
            <p className="text-[10px] font-normal text-neutral-400 tracking-wider uppercase">
              {t("home.focus.label")}
            </p>
            <p className="text-[11px] font-bold text-neutral-900 uppercase mt-1 tracking-wide leading-relaxed">
              {t("home.focus.value.1")} <br className="hidden sm:block" />
              {t("home.focus.value.2")} <br className="hidden sm:block" />
              {t("home.focus.value.3")}
            </p>
          </div>
          <div className="border-t border-neutral-200 pt-3">
            <p className="text-[10px] font-normal text-neutral-400 tracking-wider uppercase">
              {t("home.index.label")}
            </p>
            <p className="text-[11px] font-bold text-neutral-900 uppercase mt-1 tracking-wide">
              {t("home.index.value")}
            </p>
          </div>
        </div>

        {/* Bottom Right: Language Switcher */}
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase pointer-events-auto z-30 shrink-0 mb-1">
          <button
            onClick={() => setLanguage("en")}
            className={`cursor-pointer transition-all duration-200 ${
              language === "en"
                ? "text-black dark:text-white font-bold"
                : "text-neutral-400 dark:text-neutral-500 font-normal hover:text-black dark:hover:text-white"
            }`}
          >
            EN
          </button>
          <span className="text-neutral-300 dark:text-neutral-800">/</span>
          <button
            onClick={() => setLanguage("th")}
            className={`cursor-pointer transition-all duration-200 ${
              language === "th"
                ? "text-black dark:text-white font-bold"
                : "text-neutral-400 dark:text-neutral-500 font-normal hover:text-black dark:hover:text-white"
            }`}
          >
            TH
          </button>
        </div>
      </div>
    </div>
  );
}
