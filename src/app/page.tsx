"use client"

import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowDown, ArrowRight } from "lucide-react";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ContactModal } from "@/components/ContactModal";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useIntro } from "@/components/intro-context";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Building things for the web";
  const { isDone, setDone } = useIntro();

  useEffect(() => {
    let currentText = "";
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setText(currentText);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
        }, 500);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [setDone]);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col relative overflow-hidden">
      {/* Background Layer */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isDone ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-glow" />
      </div>

      <main className="flex-1 flex flex-col items-center pt-20 lg:pt-32 relative z-10">
        <section className="container mx-auto px-4 pb-16 text-center relative z-10">
          {/* Badge */}
          <div className={`flex justify-center mb-8 transition-all duration-1000 delay-300 ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-center gap-2.5 px-0 py-0 text-[12px] font-medium transition-colors cursor-pointer group">
              <span className="px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground border border-muted-foreground/20 font-bold text-[10px] uppercase tracking-wider">
                Upcoming
              </span>
              <span className="text-foreground/90 font-medium animate-shimmer-text">A new project is launching soon!</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/70 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          
          {/* Animated H1 */}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6 min-h-[1.2em] flex items-center justify-center">
            {text}
            {!isDone && (
              <span className="inline-block w-[3px] h-[0.8em] bg-foreground ml-1 animate-pulse" />
            )}
          </h1>
          
          {/* Subtitle & Image */}
          <div className={`mx-auto max-w-[800px] text-muted-foreground text-base md:text-lg mb-10 leading-relaxed flex items-center justify-center flex-wrap gap-x-3 transition-all duration-1000 delay-500 ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span>Hello I&apos;m Thanakon</span>
            <div className="relative group cursor-pointer inline-flex items-center justify-center align-middle mx-1">
              <span className="absolute bottom-0 -right-1 text-2xl opacity-0 group-hover:opacity-100 animate-wave pointer-events-none transition-opacity duration-300 z-30">
                👋
              </span>
              <span className="inline-flex items-center justify-center h-14 w-14 rounded-full overflow-hidden border-2 border-background shadow-xl flex-shrink-0 relative z-20 transition-transform duration-300 group-hover:scale-105">
                <Image 
                  src="/profile-v3.jpg" 
                  alt="Thanakon" 
                  width={56} 
                  height={56} 
                  className="object-cover h-full w-full scale-125"
                />
              </span>
            </div>
            <span>AI Driven Developer</span>
          </div>
          
          {/* Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <ContactModal>
              <Button size="lg" className="rounded-xl px-8 font-semibold transition-all hover:scale-[1.02] flex items-center gap-2">
                Let&apos;s Connect <ArrowRight className="h-4 w-4" />
              </Button>
            </ContactModal>
            <CopyEmailButton />
          </div>
        </section>
      </main>

      {/* Scroll Down Indicator */}
      <div className={`absolute bottom-10 inset-x-0 pointer-events-none hidden md:block transition-all duration-1000 delay-1000 ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="max-w-[1600px] mx-auto px-8">
          <div 
            className="flex items-center gap-2 cursor-pointer group pointer-events-auto w-fit"
            style={{ marginLeft: '64px' }}
          >
            <span className="text-[13px] font-medium text-muted-foreground/60 group-hover:text-foreground transition-colors">
              Scroll down
            </span>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-y-0.5 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}
