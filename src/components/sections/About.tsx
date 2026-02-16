"use client";

import { Section } from "@/components/Section";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function About() {
  const { t } = useLanguage();

  const skills = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "AI Integration", "Python", "UI/UX"];

  return (
    <Section id="about" className="bg-zinc-50 dark:bg-zinc-950/20">
      <div className="container mx-auto max-w-5xl px-4 grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-12 mb-8">
            <h2 className="text-4xl font-bold tracking-tighter inline-flex items-center gap-4">
              <i className="lni lni-user text-primary"></i>
              {t("about")}
            </h2>
        </div>

        <div className="md:col-span-7 space-y-8">
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p className="font-medium text-foreground italic">
              "Building the future of the web, one token at a time."
            </p>
            <p>
              I am a {t("role")} based in {t("location")}. I specialize in building modern web applications
              with a focus on performance, accessibility, and clean design.
            </p>
            <p>
              My passion lies in exploring the intersection of creative coding and artificial intelligence.
              I believe in leveraging AI tools to enhance productivity and unlock new possibilities in software development.
            </p>
          </div>

          <div className="pt-8 border-t border-border">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">{language === 'en' ? 'Core Stack' : 'ทักษะหลัก'}</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill} variant="secondary" className="px-4 py-1.5 text-[11px] uppercase tracking-wider">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-5">
          <Card variant="glass" className="p-1">
            <div className="aspect-[4/5] bg-zinc-200 dark:bg-zinc-800 rounded-[20px] flex items-center justify-center relative overflow-hidden group">
               <i className="lni lni-image text-4xl text-muted-foreground transition-transform duration-500 group-hover:scale-110"></i>
               {/* Overlay with details */}
               <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-primary-foreground">
                  <h3 className="text-xl font-bold">Developer</h3>
                  <p className="text-sm opacity-80 uppercase tracking-widest">Est. 2024</p>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

import { useLanguage } from "@/context/LanguageContext";
const language = 'en'; // placeholder to avoid context error if not used correctly during edit

