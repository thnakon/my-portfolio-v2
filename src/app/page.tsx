"use client"

import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowDown, ArrowRight, Mail, Music, Monitor, Headphones, Keyboard, Coffee, Star, Sparkles } from "lucide-react";
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
import Dither from "@/components/Dither";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const projects = [
  {
    title: "Oboun ERP",
    description: "A comprehensive Enterprise Resource Planning system designed for SMEs. Streamlining operations across sales, inventory, and finance through high-performance automation.",
    image: "/projects/oboun-preview.png",
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
    title: "Smart Guestbook",
    description: "An interactive guestbook that uses natural language processing to understand user sentiment. It automatically filters spam and highlights positive testimonials, providing a seamless experience for visitors.",
    image: "/projects/guestbook.png",
    tags: ["Next.js", "AppScript", "OpenAI", "Supabase", "GSAP"],
    features: [
      { text: "AI-driven sentiment analysis", icon: "Heart" },
      { text: "Automated spam and toxic content filtering", icon: "ShieldCheck" },
      { text: "Interactive GSAP-powered animations", icon: "MousePointer2" }
    ],
    isAI: true
  },
  {
    title: "Valentine's Surprise",
    description: "A personalized, animated experience designed to deliver a special message. Focused on silky-smooth animations and a playful yet premium aesthetic, making every interaction feel meaningful.",
    image: "/projects/valentines.png",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    features: [
      { text: "Physics-based heart animations", icon: "Activity" },
      { text: "Responsive paper-fold transitions", icon: "FoldVertical" },
      { text: "Optimized performance on mobile devices", icon: "Smartphone" }
    ],
    isAI: false
  }
];

const experiences = [
  {
    date: "2024 - Present",
    title: "AI Solutions Architect",
    company: "TechNexus Innovations",
    description: "Leading the integration of LLMs into production environments, focusing on RAG architectures and automated agentic workflows."
  },
  {
    date: "2022 - 2024",
    title: "Senior Full-Stack Developer",
    company: "CloudScale Systems",
    description: "Developed and maintained highly scalable web applications. Managed a team of 5 developers and improved CI/CD pipeline efficiency by 40%."
  },
  {
    date: "2020 - 2022",
    title: "Frontend Developer",
    company: "PixelPerfect Studio",
    description: "Crafted high-end user interfaces for international clients. Specialized in React and animation libraries for immersive web experiences."
  }
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

  // Final section state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasConfetti, setHasConfetti] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const finalSectionRef = useRef<HTMLDivElement>(null);

  // Confetti on scroll to bottom
  useEffect(() => {
    if (!finalSectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasConfetti) {
          setHasConfetti(true);
          const duration = 2500;
          const end = Date.now() + duration;
          const frame = () => {
            confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
            confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });
            if (Date.now() < end) requestAnimationFrame(frame);
          };
          frame();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(finalSectionRef.current);
    return () => observer.disconnect();
  }, [hasConfetti]);

  const handleRate = useCallback((star: number) => {
    setRating(star);
    setShowThanks(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  }, []);

  useEffect(() => {
    // Show the rest of the page almost immediately for better UX
    const timer = setTimeout(() => {
      setDone(true);
    }, 100);

    let currentText = "";
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setText(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40); // Slightly faster typing

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [setDone]);

  return (
    <div className="flex flex-col relative overflow-x-clip">
      {/* Hero Section */}
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
      <section className={`container mx-auto px-8 pb-20 transition-all duration-1000 delay-[1000ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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
      <section className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1600ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <TimelineItem 
              key={index}
              {...exp}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Bottom Bento Grid — Uses / Write to me / Last Played */}
      {/* Bottom Bento Grid — Uses / Write to me / Last Played */}
      <section className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[2000ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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
      {/* Final Section — Thanks for scrolling */}
      <section
        ref={finalSectionRef}
        className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[2200ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <div className="relative rounded-3xl border border-foreground/[0.06] overflow-hidden min-h-[400px] flex items-center justify-center">
          {/* Dither Background */}
          <div className="absolute inset-0 z-0 opacity-30 dark:opacity-40">
            <Dither
              waveColor={[1.0, 1.0, 1.0]}
              disableAnimation={false}
              enableMouseInteraction
              mouseRadius={0.3}
              colorNum={4}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.05}
            />
          </div>
          {/* Radial overlay for text readability */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background/90 via-background/60 to-transparent z-[1] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center py-16 px-8 space-y-8">
            {/* Message */}
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Thanks for visiting!
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                I appreciate you taking the time to explore my work. If you&apos;d like to leave a message, feel free to drop a note in the guestbook.
              </p>
            </div>

            {/* Guestbook Button */}
            <Button variant="outline" className="rounded-xl text-sm font-semibold gap-2 px-6 py-5 border-foreground/10 hover:bg-foreground/[0.04] backdrop-blur-md bg-background/50">
              <ArrowRight className="h-4 w-4" /> Leave a note
            </Button>

            {/* Site Meta */}
            <div className="flex items-center gap-6 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest pt-4">
              <span>v2.0</span>
              <span className="opacity-30">•</span>
              <span>Next.js + TypeScript</span>
              <span className="opacity-30">•</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
