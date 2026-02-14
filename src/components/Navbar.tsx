"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          DEV.AI
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#about" className="hover:text-muted-foreground transition-colors">
              {t("about")}
            </Link>
            <Link href="#projects" className="hover:text-muted-foreground transition-colors">
              {t("projects")}
            </Link>
            <Link href="#contact" className="hover:text-muted-foreground transition-colors">
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
