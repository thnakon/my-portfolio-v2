"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { experiences } from "@/data/experiences";
import { TimelineItem } from "@/components/TimelineItem";
import { useIntro } from "@/components/intro-context";
import { useEffect } from "react";
import { useLanguage } from "@/components/language-context";

export default function ExperiencePage() {
  const { setDone } = useIntro();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    setDone(true);
  }, [setDone]);

  return (
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden bg-white text-black flex flex-col items-center justify-center p-4 sm:p-8 pt-24 sm:pt-8 selection:bg-black selection:text-white">
      {/* Top Left: Back Button & Language Switcher */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50 flex items-center gap-4 sm:gap-6">
        <Link
          href="/"
          className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform duration-200 cursor-pointer shadow-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase">
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

      {/* Main Content */}
      <div className="max-w-6xl w-full z-10 space-y-10">
        <div className="space-y-1">
          <p className="text-[10px] font-normal text-neutral-400 tracking-[0.2em] uppercase">
            JOURNEY
          </p>
          <h1 className="text-[40px] sm:text-[48px] font-bold text-black tracking-tight leading-tight">
            Experience.
          </h1>
        </div>

        {/* 3-Column Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-6">
          {experiences.map((exp, index) => (
            <div key={index} className="border-t border-neutral-200 pt-4 flex flex-col justify-between min-h-[340px]">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-normal text-neutral-400 tracking-wider">
                    {exp.date}
                  </p>
                  <h3 className="text-[15px] font-bold text-neutral-900 uppercase leading-snug">
                    {exp.title}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    {exp.company} • {exp.location}
                  </p>
                </div>
                
                <p className="text-[12px] text-neutral-600 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-1.5 pt-1">
                  {exp.highlights.slice(0, 3).map((hl, i) => (
                    <li key={i} className="text-[11px] text-neutral-500 leading-snug flex items-start gap-1.5">
                      <span className="text-[10px] text-neutral-300 mt-0.5">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags at the bottom */}
              <div className="flex flex-wrap gap-1.5 pt-4">
                {exp.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="text-[9px] font-medium bg-neutral-50 text-neutral-500 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
