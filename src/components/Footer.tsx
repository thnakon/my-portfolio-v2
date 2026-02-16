"use client";

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="py-12 border-t border-border mt-20 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} Developer with AI.
          </p>
          <p className="text-xs text-muted-foreground font-light">
            Designed with ElevenLabs aesthetic and Apple-like precision.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <SocialLink href="https://github.com" icon="lni-github-original" label="GitHub" />
          <SocialLink href="https://linkedin.com" icon="lni-linkedin-original" label="LinkedIn" />
          <SocialLink href="mailto:contact@example.com" icon="lni-envelope" label="Email" />
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:-translate-y-1"
      aria-label={label}
    >
      <i className={cn("lni text-lg", icon)}></i>
    </a>
  );
}

import { cn } from "@/lib/utils";
