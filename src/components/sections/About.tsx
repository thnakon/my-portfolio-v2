"use client";

import { Section } from "@/components/Section";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" className="bg-muted/30">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-6">{t("about")}</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              I am a {t("role")} based in {t("location")}. I specialize in building modern web applications
              with a focus on performance, accessibility, and clean design.
            </p>
            <p>
              My passion lies in exploring the intersection of creative coding and artificial intelligence.
              I believe in leveraging AI tools to enhance productivity and unlock new possibilities in software development.
            </p>
          </div>
        </div>
        
        <div className="relative aspect-square rounded-[28px] overflow-hidden border-2 border-border bg-background flex items-center justify-center">
             <div className="text-muted-foreground text-center p-8">
                [Profile Image Placeholder]
             </div>
        </div>
      </div>
    </Section>
  );
}
