"use client"

import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowDown, ArrowRight, Mail, Music, Monitor, Headphones, Keyboard, Coffee, Star, Sparkles, MapPin } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ContactModal } from "@/components/ContactModal";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { useIntro } from "@/components/intro-context";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { TimelineItem } from "@/components/TimelineItem";
import { AboutSection } from "@/components/AboutSection";
import { BentoGrid } from "@/components/BentoGrid";
import { FinalSection } from "@/components/FinalSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { experiences } from "@/data/experiences";

const projects = [
  {
    title: "Oboun ERP",
    description: "A comprehensive Enterprise Resource Planning system designed for SMEs. Streamlining operations across sales, inventory, and finance through high-performance automation.",
    image: "/projects/oboun-preview.png",
    hoverImage: "/projects/oboun-pos.png",
    tags: ["Laravel 11", "Vue.js 3", "MySQL", "Tailwind", "Docker"],
    githubUrl: "https://github.com/thnakon/ERP_PMS",
    features: [
      { text: "Developed with Laravel 12 and Vue.js 3, ensuring long-term maintainability", icon: "Zap" },
      { text: "Implemented complex logic for real-time multi-warehouse inventory sync", icon: "Inbox" },
      { text: "Designed automated financial reporting with precise tax and ledger management", icon: "BarChart3" },
      { text: "Optimized MySQL database with advanced indexing for high-scale performance", icon: "ShieldCheck" }
    ],
    isAI: false
  },
  {
    title: "Babybib",
    description: "Babybib is an advanced, automated bibliography generation system designed to streamline the academic citation process. Built around the APA 7th Edition standard, it empowers students and researchers to create accurate references.",
    image: "/projects/babybib-preview.png",
    stackImages: ["/projects/babybib2.png", "/projects/babybib3.png"],
    githubUrl: "https://github.com/thnakon/Babybib",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP"],
    features: [
      { text: "Architected a robust engine for automated APA 7th Edition citation standards.", icon: "Zap" },
      { text: "Supports diverse sources including journals, books, and digital media.", icon: "Inbox" },
      { text: "Built with a responsive UI that prioritizes user productivity and rapid work.", icon: "Smartphone" },
      { text: "Features real-time bibliography previews and instant validation logic.", icon: "BarChart3" }
    ],
    isAI: false
  },
  {
    title: "ScribeHub",
    description: "ScribeHub is a premium, all-in-one platform for modern researchers. It seamlessly integrates reference management, collaborative tools, and advanced AI intelligence to streamline the entire research lifecycle.",
    image: "/projects/ScribeHub1.png",
    hoverImage: "/projects/ScribeHub2.png",
    githubUrl: "https://github.com/thnakon/scribehub",
    tags: ["React", "Next.js", "Supabase", "TypeScript", "Tailwind"],
    features: [
      { text: "Leveraged OpenAI's GPT-4 to create an intelligent research paper assistant.", icon: "Zap" },
      { text: "Engineered a collaborative environment with real-time updates for research teams.", icon: "Inbox" },
      { text: "Integrated a reference management system with automatic metadata extraction.", icon: "ShieldCheck" },
      { text: "Developed an interactive knowledge graph for visual data discovery.", icon: "BarChart3" }
    ],
    isAI: true
  },
];


const techStack = {
  core: [
    { name: "Next.js", icon: "nextdotjs" },
    { name: "React", icon: "react" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Node.js", icon: "nodedotjs" },
  ],
  ai: [
    { name: "OpenAI", icon: "openai" },
    { name: "Claude", icon: "claude" },
    { name: "LangChain", icon: "langchain" },
    { name: "Vercel AI SDK", icon: "vercel" },
    { name: "Prompt Engineering", icon: "openai" },
  ],
  tools: [
    { name: "Cursor", icon: "cursor" },
    { name: "GitHub", icon: "github" },
  ]
};

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Developing innovative tools to\nempower students and businesses";
  const { isDone, setDone } = useIntro();

  const finalSectionRef = useRef<HTMLDivElement>(null);

  // Timeline Scroll Logic
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map progress to Y position (from top dot to bottom end)
  const dotY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    // Disable browser's built-in scroll restoration (it's unreliable with animated layouts)
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }

    let restoreTimer: NodeJS.Timeout;

    // --- Section Memory: restore scroll position ---
    const savedSection = sessionStorage.getItem('portfolio-active-section');
    if (savedSection) {
      // Wait for animations to finish, then scroll to saved section
      restoreTimer = setTimeout(() => {
        const el = document.getElementById(savedSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 1200); // wait for fade-in animations
    }

    // --- Section Memory: track current section on scroll ---
    const sectionIds = ['hero', 'bento', 'about', 'selected-work', 'tech-toolkit', 'experience', 'ai-workflow', 'contact'];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            sessionStorage.setItem('portfolio-active-section', entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all sections after a brief delay (after DOM renders)
    const observeTimer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      });
    }, 500);

    // Show the rest of the page almost immediately for better UX
    const timer = setTimeout(() => {
      setDone(true);
    }, 100);

    let currentText = "";
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setText(currentText);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    return () => {
      clearTimeout(timer);
      clearTimeout(observeTimer);
      if (restoreTimer) clearTimeout(restoreTimer);
      clearInterval(typingInterval);
      sectionObserver.disconnect();
    };
  }, [setDone, fullText]);

  return (
    <div className="flex flex-col relative overflow-x-clip">
      {/* Hero Section */}
      <div id="hero" className="flex min-h-[calc(100vh-3.5rem)] flex-col relative overflow-hidden">
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
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6 min-h-[1.2em] flex items-center justify-center whitespace-pre-line">
              {text}
              {!isDone && (
                <span className="inline-block w-[3px] h-[0.8em] bg-foreground ml-1 animate-pulse" />
              )}
            </h1>
            
            {/* Subtitle & Image */}
            <div className={`mx-auto max-w-[800px] text-muted-foreground text-base md:text-lg mb-10 leading-relaxed flex items-center justify-center flex-wrap gap-x-3 transition-all duration-1000 delay-500 ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span>Hello, I&apos;m Thanakon.</span>
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
              <span>AI-driven developer building intelligent web solutions.</span>
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

      {/* Bento Grid Section */}
      <section id="bento" className={`container mx-auto px-8 pb-20 transition-all duration-1000 delay-[1000ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <BentoGrid />
      </section>

      {/* About Section */}
      <section id="about" className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1200ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <AboutSection />
      </section>

      {/* Selected Work Section */}
      <section id="selected-work" className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1400ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Selected Work</h2>
            <p className="text-muted-foreground text-sm font-medium">A collection of featured projects and experiments.</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 rounded-full font-semibold overflow-hidden group">
            View All Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="space-y-16 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectCaseStudy 
              key={index}
              index={index}
              {...project}
            />
          ))}
        </div>
      </section>

      {/* Tech Toolkit Section */}
      <section id="tech-toolkit" className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1600ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Tech Toolkit</h2>
            <p className="text-muted-foreground text-sm font-medium">My current stack of preferred technologies and tools.</p>
          </div>
        </div>

        {(() => {
          const techRow1 = [
            "Next.js", "React", "Tailwind CSS", "CSS", "Figma", "GSAP", "Framer Motion", "HTML", "PHP"
          ];
          const techRow2 = [
            "Laravel", "Node.js", "MySQL", "Supabase", "Bun", "ChatGPT", "Gemini", "Claude", "OpenClaw", "LLMs", "RAG", "Agentic Workflows", "Docker", "Git", "GitLab", "SourceTree"
          ];
          const techIcons: Record<string, string> = {
            "Next.js": "nextdotjs", "React": "react", "Tailwind CSS": "tailwindcss", "CSS": "css3",
            "Figma": "figma", "GSAP": "greensock", "Framer Motion": "framer", "HTML": "html5", "PHP": "php",
            "Laravel": "laravel", "Node.js": "nodedotjs", "MySQL": "mysql", "Supabase": "supabase",
            "Bun": "bun", "ChatGPT": "openai", "Gemini": "googlegemini", "Claude": "claude",
            "OpenClaw": "openaigym", "LLMs": "openai", "RAG": "databricks", "Agentic Workflows": "langchain",
            "Docker": "docker", "Git": "git", "GitLab": "gitlab", "SourceTree": "sourcetree"
          };
          const getIconUrl = (tech: string) => {
            const slug = techIcons[tech];
            if (!slug) return null;
            return `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${slug}.svg`;
          };

          return (
            <div className="relative overflow-hidden">
              <div className="flex flex-col gap-5">
                {/* Row 1 */}
                <div className="flex animate-marquee gap-3 whitespace-nowrap">
                  {[...techRow1, ...techRow1].map((tech, i) => (
                    <Badge key={i} variant="outline" className="px-4 py-2.5 font-mono text-[11px] bg-background border-muted-foreground/20 cursor-default shrink-0 flex items-center gap-2 rounded-xl">
                      {getIconUrl(tech) && (
                        <img 
                          src={getIconUrl(tech)!} 
                          alt={tech} 
                          className="w-4 h-4 dark:invert" 
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      )}
                      {tech}
                    </Badge>
                  ))}
                </div>
                {/* Row 2 */}
                <div className="flex animate-marquee-reverse gap-3 whitespace-nowrap">
                  {[...techRow2, ...techRow2].map((tech, i) => (
                    <Badge key={i} variant="outline" className="px-4 py-2.5 font-mono text-[11px] bg-background border-muted-foreground/20 cursor-default shrink-0 flex items-center gap-2 rounded-xl">
                      {getIconUrl(tech) && (
                        <img 
                          src={getIconUrl(tech)!} 
                          alt={tech} 
                          className="w-4 h-4 dark:invert" 
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      )}
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* Edge Gradients */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            </div>
          );
        })()}
      </section>

      {/* Experience Section */}
      <section id="experience" className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1800ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Experience</h2>
            <p className="text-muted-foreground text-sm font-medium">A timeline of my professional journey.</p>
          </div>
        </div>

        <div className="relative">
          {/* Global Vertical Line for the whole section */}
          <div className="absolute left-[3px] md:left-[224px] top-5 bottom-0 w-[1px] bg-border/40" />
          
          {/* Animated Scrolling Profile Image */}
          <motion.div 
            style={{ top: dotY }}
            className="absolute left-[-11px] md:left-[210px] h-7 w-7 rounded-full border-2 border-background overflow-hidden shadow-lg z-20 mt-1.5"
          >
            <Image 
              src="/profile-v3.jpg" 
              alt="Thanakon" 
              width={28} 
              height={28} 
              className="object-cover h-full w-full scale-125"
            />
          </motion.div>

          <div ref={timelineRef} className="space-y-4">
            {experiences.map((exp, index) => (
              <TimelineItem 
                key={index}
                {...exp}
                hideDot={true}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Bento Grid — Uses / Write to me / Last Played */}
      {/* Bottom Bento Grid — Uses / Write to me / Last Played */}
      <section id="contact" className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[2000ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">

          {/* Uses */}
          <div className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-muted-foreground/60">Daily Setup</p>
                <h3 className="text-lg font-bold tracking-tight">Uses</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Monitor, name: 'MacBook Pro 16"', detail: 'M3 Pro' },
                  { icon: Keyboard, name: 'Keychron K2', detail: 'Mechanical' },
                  { icon: Headphones, name: 'AirPods Pro', detail: '2nd Gen' },
                  { icon: Coffee, name: 'Cursor IDE', detail: 'AI-First' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-2.5 group/item">
                    <div className="h-8 w-8 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover/item:bg-foreground/[0.08] transition-colors">
                      <item.icon className="h-3.5 w-3.5 text-foreground/50" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-foreground/80 truncate leading-tight">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground/50 font-medium">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Arrow */}
            <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </div>

          {/* Write to me */}
          <div className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-5">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-muted-foreground/60">Guestbook</p>
                <h3 className="text-lg font-bold tracking-tight">Write a note</h3>
              </div>
              {/* Visual Note Sheets */}
              <div className="relative h-28 w-full mt-4">
                <div className="absolute inset-0 bg-foreground/[0.03] border border-foreground/[0.05] rounded-xl rotate-[-4deg] translate-y-2 scale-95" />
                <div className="absolute inset-0 bg-card/40 backdrop-blur-sm border border-foreground/[0.08] rounded-xl rotate-[2deg] translate-y-1 scale-[0.98]" />
                <div className="absolute inset-0 bg-card/60 backdrop-blur-md border border-foreground/[0.1] rounded-xl flex flex-col p-5 gap-2 transition-transform duration-500 group-hover:rotate-[-1deg] group-hover:-translate-y-1">
                  <div className="h-1.5 w-1/2 bg-foreground/20 rounded-full mb-2" />
                  <div className="space-y-3">
                    <div className="h-[1px] w-full bg-foreground/[0.08]" />
                    <div className="h-[1px] w-full bg-foreground/[0.08]" />
                    <div className="h-[1px] w-[80%] bg-foreground/[0.08]" />
                  </div>
                  <div className="mt-auto self-end">
                    <div className="h-1.5 w-10 bg-foreground/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </div>

          {/* Last Played */}
          <div className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-muted-foreground/60">Apple Music</p>
                <h3 className="text-lg font-bold tracking-tight">Last Played</h3>
              </div>
              <div className="flex items-center gap-4">
                {/* Album art */}
                <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-foreground/[0.08] shadow-lg shrink-0 bg-gradient-to-br from-rose-500/20 via-purple-500/20 to-blue-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Music className="h-8 w-8 text-foreground/20" />
                  </div>
                </div>
                {/* Song info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="text-sm font-bold truncate leading-tight">Die With A Smile</p>
                  <p className="text-xs text-muted-foreground/60 truncate">Lady Gaga, Bruno Mars</p>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-end gap-[2px] h-3">
                      <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '8px', animationDelay: '0s' }} />
                      <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '12px', animationDelay: '0.15s' }} />
                      <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '6px', animationDelay: '0.3s' }} />
                      <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '10px', animationDelay: '0.45s' }} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/40">Playing now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </div>

        </div>
      </section>
      <FinalSection />
    </div>
  );
}
