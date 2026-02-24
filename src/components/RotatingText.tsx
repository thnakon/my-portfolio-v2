"use client";

import React from "react";
import { motion } from "framer-motion";

interface RotatingTextProps {
  text: string;
  radius?: number;
  fontSize?: string;
  letterSpacing?: string;
  className?: string;
}

export const RotatingText = ({
  text,
  radius = 60,
  fontSize = "14px",
  letterSpacing = "0.2em",
  className = "",
}: RotatingTextProps) => {
  const characters = text.split("");
  const duration = 10; // seconds per rotation

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      {characters.map((char, i) => {
        const angle = (i * 360) / characters.length;
        return (
          <span
            key={i}
            className="absolute top-0 flex items-center justify-center font-black uppercase tracking-widest text-foreground"
            style={{
              fontSize,
              letterSpacing,
              transform: `rotate(${angle}deg)`,
              transformOrigin: `0 ${radius}px`,
            }}
          >
            {char}
          </span>
        );
      })}
    </motion.div>
  );
};
