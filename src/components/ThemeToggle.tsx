"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background hover:bg-accent transition-all duration-300 relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <i className={cn(
        "lni text-lg transition-all duration-500",
        theme === "dark" ? "lni-sun scale-100 rotate-0" : "lni-sun scale-0 rotate-90 absolute"
      )}></i>
      <i className={cn(
        "lni text-lg transition-all duration-500",
        theme === "dark" ? "lni-night scale-0 -rotate-90 absolute" : "lni-night scale-100 rotate-0"
      )}></i>
    </button>
  );
}
