"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { ContactModal } from "@/components/ContactModal";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface GridScrambleProps {
  word: string;
}

export default function GridScramble({ word }: GridScrambleProps) {
  const rows = 4;
  const cols = word.length + 2;
  const centerRow = 1; // 0-indexed, so 2nd row
  const startCol = 1;

  const [grid, setGrid] = useState<string[][]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const randomChar = () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)];

  // Initial populate
  useEffect(() => {
    const initialGrid = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push(randomChar());
      }
      initialGrid.push(row);
    }
    setGrid(initialGrid);
  }, [rows, cols]);

  // Scramble interval
  useEffect(() => {
    if (!isHovering) return;

    const interval = setInterval(() => {
      setGrid((prev) => {
        const newGrid = [...prev];
        for (let r = 0; r < rows; r++) {
          newGrid[r] = [...prev[r]];
          for (let c = 0; c < cols; c++) {
            // Skip the actual word letters so they remain legible
            if (r === centerRow && c >= startCol && c < startCol + word.length) {
              continue;
            }
            // Scramble background letters randomly
            if (Math.random() > 0.3) {
              newGrid[r][c] = randomChar();
            }
          }
        }
        return newGrid;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isHovering, word, rows, cols, centerRow, startCol]);

  if (grid.length === 0) return null;

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 sm:gap-5 cursor-default select-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {grid.map((row, r) => (
        <div key={r} className="flex gap-3 sm:gap-5">
          {row.map((char, c) => {
            const isWord =
              r === centerRow && c >= startCol && c < startCol + word.length;
            const displayChar = isWord ? word[c - startCol].toUpperCase() : char;

            return (
              <span
                key={c}
                className={`font-serif text-2xl sm:text-4xl w-6 sm:w-8 text-center transition-colors duration-200 ${
                  isWord
                    ? "text-black font-bold"
                    : isHovering
                    ? "text-neutral-400 font-light"
                    : "text-neutral-200 font-light"
                }`}
              >
                {displayChar}
              </span>
            );
          })}
        </div>
      ))}
      
      <ContactModal>
        <button
          type="button"
          className={`group mt-4 sm:mt-6 flex items-center gap-2 font-sans text-lg sm:text-xl font-light tracking-wide transition-all duration-500 pointer-events-auto ${
            isHovering ? "text-black" : "text-neutral-400"
          } hover:!text-black`}
        >
          <span className="relative overflow-hidden pb-0.5">
            Get in touch
            {/* Animated underline sliding in from the left */}
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
          </span>

          {/* Animated arrow container */}
          <div className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
            <ArrowUpRight
              className="absolute w-5 h-5 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:translate-x-full group-hover:-translate-y-full"
              strokeWidth={1.5}
            />
            <ArrowUpRight
              className="absolute w-5 h-5 transition-transform duration-500 ease-[0.76,0,0.24,1] -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"
              strokeWidth={1.5}
            />
          </div>
        </button>
      </ContactModal>
    </div>
  );
}
