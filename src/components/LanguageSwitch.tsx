"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "th" : "en")}
      className="px-3 py-1 rounded-full border border-border hover:bg-accent transition-colors font-medium text-sm w-12"
      aria-label="Switch language"
    >
      {language.toUpperCase()}
    </button>
  );
}
