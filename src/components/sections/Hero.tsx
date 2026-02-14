"use client";

import { Section } from "@/components/Section";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const { t } = useLanguage();

  return (
    <Section id="hero" className="items-start">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
          {t("hero_title")}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-light">
          {t("hero_subtitle")}
        </p>
        
        <div className="flex gap-4">
          <Link
            href="#projects"
            className="px-8 py-3 rounded-[28px] bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            {t("view_projects")}
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 rounded-[28px] border border-border font-medium hover:bg-accent transition-colors"
          >
            {t("contact_me")}
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </Section>
  );
}
