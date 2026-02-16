"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Navbar() {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 pt-6",
      scrolled ? "pt-4" : "pt-6"
    )}>
      <div className={cn(
        "container mx-auto max-w-5xl h-14 flex items-center justify-between px-6 rounded-full border transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm h-12" 
          : "bg-transparent border-transparent"
      )}>
        <Link href="/" className="text-lg font-bold tracking-tighter hover:opacity-70 transition-opacity flex items-center gap-2">
          <i className="lni lni-pulse font-bold"></i>
          DEV.AI
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-tight">
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              {t("about")}
            </Link>
            <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              {t("projects")}
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-border/50">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
