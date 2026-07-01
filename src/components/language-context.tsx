"use client"

import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "th"

const translations = {
  en: {
    // Navigation
    "nav.home": "HOME",
    "nav.projects": "PROJECTS",
    "nav.experience": "EXPERIENCE",
    "nav.about": "ABOUT",
    "nav.contact": "CONTACT",

    // Home Page
    "home.role": "FULL-STACK DEVELOPER",
    "home.name.first": "THANAKON",
    "home.name.last": "DUANGKUMWATTANASIRI",
    "home.graphic_placeholder": "3D Graphic Placeholder",
    "home.base.label": "BASE",
    "home.base.value": "CHIANG MAI, THAILAND",
    "home.focus.label": "FOCUS",
    "home.focus.value.1": "FULL-STACK ARCHITECTURE /",
    "home.focus.value.2": "AI ENGINEERING /",
    "home.focus.value.3": "INTERACTIVE DESIGN",
    "home.index.label": "INDEX",
    "home.index.value": "PORTFOLIO 2026",
  },
  th: {
    // Navigation
    "nav.home": "หน้าแรก",
    "nav.projects": "ผลงาน",
    "nav.experience": "ประสบการณ์",
    "nav.about": "เกี่ยวกับ",
    "nav.contact": "ติดต่อ",

    // Home Page
    "home.role": "นักพัฒนาฟูลสแตก",
    "home.name.first": "ธนากร",
    "home.name.last": "ดวงคำวัฒนศิริ",
    "home.graphic_placeholder": "พื้นที่แสดงผลกราฟิก 3D",
    "home.base.label": "ที่ตั้ง",
    "home.base.value": "เชียงใหม่, ประเทศไทย",
    "home.focus.label": "ความเชี่ยวชาญ",
    "home.focus.value.1": "สถาปัตยกรรมฟูลสแตก /",
    "home.focus.value.2": "วิศวกรรมปัญญาประดิษฐ์ /",
    "home.focus.value.3": "การออกแบบเชิงโต้ตอบ",
    "home.index.label": "ดัชนี",
    "home.index.value": "แฟ้มสะสมงาน 2026",
  },
} as const

type TranslationKey = keyof typeof translations.en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load saved preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferred-language") as Language
      if (saved === "en" || saved === "th") {
        setLanguageState(saved)
        document.documentElement.lang = saved
      }
    } catch {
      // Ignore errors if localStorage is blocked
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("preferred-language", lang)
      document.documentElement.lang = lang
    } catch {
      // Ignore errors
    }
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations["en"][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
