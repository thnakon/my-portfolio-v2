"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asMotion?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asMotion = true, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-primary text-primary-foreground shadow hover:opacity-90",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      outline: "border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-6 text-sm",
      lg: "h-12 px-8 text-base",
    };

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

    if (asMotion) {
      return (
        <motion.button
          ref={ref as any}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={combinedClassName}
          {...(props as any)}
        />
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
