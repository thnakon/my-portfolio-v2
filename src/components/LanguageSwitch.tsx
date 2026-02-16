"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "th" : "en")}
      className="h-9 px-3 rounded-full border border-border bg-background hover:bg-accent transition-all duration-300 font-bold text-[10px] tracking-widest flex items-center justify-center"
      aria-label="Switch language"
    >
      {language.toUpperCase()}
    </button>
  );
}
