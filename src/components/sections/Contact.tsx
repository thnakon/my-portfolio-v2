"use client";

import { Section } from "@/components/Section";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const { t, language } = useLanguage();

  return (
    <Section id="contact" className="text-center relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
      
      <div className="container mx-auto max-w-2xl px-4 relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border bg-background mb-8">
           <i className="lni lni-envelope text-2xl"></i>
        </div>
        
        <h2 className="text-5xl font-bold tracking-tighter mb-6">{t("contact")}</h2>
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          {language === 'en' 
            ? "Interested in working together? Currently available for freelance projects and open to new opportunities."
            : "สนใจที่จะร่วมงานด้วยกันไหม? ขณะนี้ฉันกำลังรับงาน Freelance และพร้อมสำหรับโอกาสใหม่ๆ"}
        </p>
        
        <Button size="lg" className="h-16 px-12 text-lg gap-4" asChild>
          <a href="mailto:contact@example.com">
            {t("contact_me")}
            <i className="lni lni-arrow-right"></i>
          </a>
        </Button>

        <div className="mt-16 flex justify-center gap-8 pt-8 border-t border-border/50">
           <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2">Location</p>
              <p className="text-sm font-medium">Bangkok, Thailand</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2">Social</p>
              <div className="flex gap-4">
                 <a href="#" className="hover:text-primary transition-colors"><i className="lni lni-twitter-original"></i></a>
                 <a href="#" className="hover:text-primary transition-colors"><i className="lni lni-github-original"></i></a>
              </div>
           </div>
        </div>
      </div>
    </Section>
  );
}
