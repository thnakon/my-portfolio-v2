"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline";
}

export function Card({ className, variant = "default", children, ...props }: CardProps) {
  const variants = {
    default: "bg-card text-card-foreground border border-border shadow-sm",
    glass: "bg-background/50 backdrop-blur-md border border-border/50 shadow-lg",
    outline: "border-2 border-border bg-transparent",
  };

  return (
    <div
      className={cn(
        "rounded-[24px] overflow-hidden transition-all duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 flex flex-col space-y-1.5", className)} {...props}>{children}</div>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0 flex items-center", className)} {...props}>{children}</div>;
}
