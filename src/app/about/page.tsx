"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useIntro } from "@/components/intro-context";
import { useEffect } from "react";
import { useLanguage } from "@/components/language-context";

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0 ml-1"
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}

export default function AboutPage() {
  const { setDone } = useIntro();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    setDone(true);
  }, [setDone]);

  return (
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden bg-white text-black flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-black selection:text-white">
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

      {/* Main 2-Column Grid */}
      <div className="max-w-6xl w-full z-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-center">
        {/* Left Column: Portrait Image */}
        <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto rounded-3xl overflow-hidden shadow-xl border border-neutral-100 group">
          <Image
            src="/profile-v3.jpg"
            alt="Thanakon"
            fill
            sizes="(max-width: 1024px) 100vw, 280px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>

        {/* Right Column: About Content */}
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-[10px] font-normal text-neutral-400 tracking-[0.2em] uppercase mb-3">
              ABOUT
            </p>
            
            <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-black tracking-tight leading-tight max-w-3xl">
              Full-stack developer <br />
              building intelligent <br />
              web systems.
            </h1>
          </div>

          <p className="text-[13px] sm:text-[14px] text-neutral-600 max-w-2xl leading-relaxed">
            I design and implement digital experiences that naturally connect systems architecture, automated workflows, and frontend experiences. I specialize in leveraging AI agents and modern web frameworks (Next.js, Laravel) to build next-generation applications.
          </p>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-4">
            <div className="border-t border-neutral-200 pt-3">
              <p className="text-[10px] font-normal text-neutral-400 tracking-wider uppercase">
                NAME
              </p>
              <p className="text-[11px] font-bold text-neutral-900 uppercase mt-1 tracking-wide">
                THANAKON DUANGKUMWATTANASIRI (WARM)
              </p>
            </div>
            <div className="border-t border-neutral-200 pt-3">
              <p className="text-[10px] font-normal text-neutral-400 tracking-wider uppercase">
                ROLE
              </p>
              <p className="text-[11px] font-bold text-neutral-900 uppercase mt-1 tracking-wide">
                FULL-STACK DEVELOPER
              </p>
            </div>
            <div className="border-t border-neutral-200 pt-3">
              <p className="text-[10px] font-normal text-neutral-400 tracking-wider uppercase">
                CONTACT
              </p>
              <div className="flex flex-col space-y-1.5 mt-1.5 items-start">
                <a
                  href="mailto:thnakon.d@gmail.com"
                  className="text-[11px] font-bold text-neutral-900 uppercase hover:opacity-60 hover:-translate-x-1.5 transition-all duration-300 tracking-wide inline-flex items-center"
                >
                  thnakon.d@gmail.com <ArrowIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/thanankon-duangkumwattanasiri-1709823a8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-neutral-900 uppercase hover:opacity-60 hover:-translate-x-1.5 transition-all duration-300 tracking-wide inline-flex items-center"
                >
                  LinkedIn <ArrowIcon />
                </a>
                <a
                  href="https://github.com/thnakon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-neutral-900 uppercase hover:opacity-60 hover:-translate-x-1.5 transition-all duration-300 tracking-wide inline-flex items-center"
                >
                  GitHub <ArrowIcon />
                </a>
                <a
                  href="https://x.com/Obounwarm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-neutral-900 uppercase hover:opacity-60 hover:-translate-x-1.5 transition-all duration-300 tracking-wide inline-flex items-center"
                >
                  Twitter / X <ArrowIcon />
                </a>
                <a
                  href="https://www.instagram.com/itzwarm_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-neutral-900 uppercase hover:opacity-60 hover:-translate-x-1.5 transition-all duration-300 tracking-wide inline-flex items-center"
                >
                  Instagram <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
