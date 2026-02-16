"use client";

import { Section } from "@/components/Section";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  const { t } = useLanguage();

  return (
    <Section id="hero" className="relative overflow-hidden pt-32 pb-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 backdrop-blur-sm text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Available for new projects
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl leading-[0.9]">
          {t("hero_title")}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 font-medium leading-relaxed">
          {t("hero_subtitle")}
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button size="lg" asChild>
            <Link href="#projects" className="gap-2">
              <i className="lni lni-layers"></i>
              {t("view_projects")}
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#contact" className="gap-2">
              <i className="lni lni-bubble"></i>
              {t("contact_me")}
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
