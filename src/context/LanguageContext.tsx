"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "th";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    about: "About",
    projects: "Projects",
    contact: "Contact",
    hero_title: "Developer with AI",
    hero_subtitle: "Crafting digital experiences with a minimal touch.",
    view_projects: "View Projects",
    contact_me: "Contact Me",
    role: "Full Stack Developer",
    location: "Bangkok, Thailand",
  },
  th: {
    about: "เกี่ยวกับ",
    projects: "ผลงาน",
    contact: "ติดต่อ",
    hero_title: "นักพัฒนาพร้อม AI",
    hero_subtitle: "สร้างสรรค์ประสบการณ์ดิจิทัลด้วยสัมผัสที่เรียบง่าย",
    view_projects: "ดูผลงาน",
    contact_me: "ติดต่อฉัน",
    role: "นักพัฒนา Full Stack",
    location: "กรุงเทพฯ, ไทย",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
