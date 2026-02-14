"use client";

import { Section } from "@/components/Section";
import { useLanguage } from "@/context/LanguageContext";
import { Mail } from "lucide-react";

export function Contact() {
  const { t } = useLanguage();

  return (
    <Section id="contact" className="text-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl font-bold tracking-tight mb-6">{t("contact")}</h2>
        <p className="text-lg text-muted-foreground mb-12">
          Interested in working together? Currently available for freelance projects and open to new opportunities.
        </p>
        
        <a
          href="mailto:contact@example.com"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-[28px] bg-foreground text-background font-medium hover:opacity-90 transition-opacity text-lg"
        >
          <Mail className="w-5 h-5" />
          {t("contact_me")}
        </a>
      </div>
    </Section>
  );
}
