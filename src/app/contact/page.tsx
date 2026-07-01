"use client";

import Link from "next/link";
import { ContactModal } from "@/components/ContactModal";
import { ChevronLeft } from "lucide-react";
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
      className="h-4 w-4 shrink-0 ml-1.5"
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}

export default function ContactPage() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white text-black flex flex-col items-center justify-center p-8 selection:bg-black selection:text-white">
      {/* Top Left: Back Button & Language Switcher */}
      <div className="absolute top-8 left-8 z-50 flex items-center gap-6">
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

      {/* Center Content */}
      <div className="flex flex-col items-center text-center max-w-xl w-full z-10">
        <p className="text-[10px] font-normal text-neutral-400 tracking-[0.2em] uppercase mb-4">
          CONTACT
        </p>
        
        <ContactModal>
          <button className="text-[40px] sm:text-[56px] md:text-[64px] font-bold text-black tracking-tight leading-tight mb-8 cursor-pointer hover:opacity-70 transition-opacity text-center outline-none">
            Get in touch.
          </button>
        </ContactModal>

        {/* Thin Divider */}
        <div className="w-full max-w-[320px] border-t border-neutral-200 mb-8" />

        {/* Contact Links */}
        <div className="flex flex-col items-center space-y-4">
          <a
            href="mailto:thnakon.d@gmail.com"
            className="text-[16px] sm:text-[18px] font-bold text-black hover:opacity-60 transition-all duration-300 tracking-tight inline-flex items-center hover:-translate-x-1.5"
          >
            thnakon.d@gmail.com <ArrowIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/thanankon-duangkumwattanasiri-1709823a8/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] sm:text-[18px] font-bold text-black hover:opacity-60 transition-all duration-300 tracking-tight inline-flex items-center hover:-translate-x-1.5"
          >
            LinkedIn <ArrowIcon />
          </a>
          <a
            href="https://github.com/thnakon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] sm:text-[18px] font-bold text-black hover:opacity-60 transition-all duration-300 tracking-tight inline-flex items-center hover:-translate-x-1.5"
          >
            GitHub <ArrowIcon />
          </a>
          <a
            href="https://x.com/Obounwarm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] sm:text-[18px] font-bold text-black hover:opacity-60 transition-all duration-300 tracking-tight inline-flex items-center hover:-translate-x-1.5"
          >
            Twitter / X <ArrowIcon />
          </a>
          <a
            href="https://www.instagram.com/itzwarm_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] sm:text-[18px] font-bold text-black hover:opacity-60 transition-all duration-300 tracking-tight inline-flex items-center hover:-translate-x-1.5"
          >
            Instagram <ArrowIcon />
          </a>

        </div>
      </div>
    </div>
  );
}
