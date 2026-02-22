"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronRight, ArrowDown, ArrowRight, Mail, Music, Monitor, Headphones, 
  Keyboard, Coffee, Star, Sparkles, MapPin, Laptop, Mouse, Github,
  Plus, ExternalLink
} from "lucide-react";
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
import { projects } from "@/data/projects";
import { blogs } from "@/data/blogs";

const getIconSlug = (tag: string) => {
  const map: Record<string, string> = {
    "Next.js": "nextdotjs",
    "React": "react",
    "Tailwind": "tailwindcss",
    "Tailwind CSS": "tailwindcss",
    "TypeScript": "typescript",
    "MySQL": "mysql",
    "PHP": "php",
    "Laravel": "laravel",
    "Laravel 11": "laravel",
    "Laravel 12": "laravel",
    "Vue.js 3": "vuedotjs",
    "Vu3.js": "vuedotjs",
    "Supabase": "supabase",
    "Docker": "docker",
    "GSAP": "greensock",
    "Framer Motion": "framer",
    "Node.js": "nodedotjs",
    "PostgreSQL": "postgresql",
    "OpenAI": "openai",
    "HTML5": "html5",
    "CSS3": "css3",
    "JavaScript": "javascript",
    "Figma": "figma",
    "Vercel": "vercel",
    "Claude": "claude",
    "Gemini": "googlegemini"
  };
  return map[tag] || tag.toLowerCase().replace(/\s+/g, "");
};



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
          <Link href="/work">
            <Button variant="ghost" size="sm" className="gap-2 rounded-full font-semibold overflow-hidden group">
              View All Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-0 relative">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="sticky top-24 md:top-32 w-full"
              style={{ 
                zIndex: index + 1 
              }}
            >
              <div className="bg-background py-20 lg:py-32 border-t border-foreground/[0.03]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  
                  {/* Left Side: Mockup Card (5 cols) */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-7 relative group"
                  >
                    <div className="relative aspect-[16/10] bg-white dark:bg-black rounded-[3rem] p-8 lg:p-12 overflow-hidden shadow-2xl border border-foreground/[0.03] dark:border-white/5">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                      
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h4 className="text-foreground text-xl lg:text-2xl font-medium leading-tight max-w-[80%]">
                            {project.overview.split('.')[0]}.
                          </h4>
                          <ArrowRight className="h-8 w-8 text-foreground/20" />
                        </div>
                        
                        {/* Stacked Images/Screenshots */}
                        <div className="relative mt-8 h-full">
                          {/* Main screenshot */}
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[85%] aspect-[16/10] bg-zinc-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform rotate-0 duration-700">
                            <Image 
                              src={project.image} 
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {/* Secondary screenshot overlay (if exists) */}
                          {project.stackImages?.[0] && (
                            <div className="absolute -bottom-8 -left-4 w-[60%] aspect-[16/10] bg-zinc-800 rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform rotate-0 duration-700 z-20">
                              <Image 
                                src={project.stackImages[0]} 
                                alt={`${project.title} secondary`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Side: Info (5 cols) */}
                  <div className="lg:col-span-5 space-y-10 pt-4">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-[2px] w-8 bg-foreground/20" />
                        <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">{project.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 group/feature">
                          <Sparkles className="h-4 w-4 text-foreground/30 mt-1 shrink-0 transition-transform group-hover/feature:rotate-12" />
                          <p className="text-muted-foreground/90 font-medium leading-snug">{feature.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges & Actions */}
                    <div className="space-y-8">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <div key={tag} className="flex items-center gap-2 bg-card border border-foreground/[0.08] px-3.5 py-1.5 rounded-xl shadow-sm hover:border-foreground/20 transition-colors">
                            <img 
                              src={`https://cdn.simpleicons.org/${getIconSlug(tag)}`} 
                              className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity dark:invert"
                              alt={tag}
                              onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                            <span className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest">{tag}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Link href={`/work/${project.slug}`} className="flex-1 sm:flex-none">
                          <Button size="lg" className="w-full rounded-2xl px-12 h-14 font-black uppercase tracking-widest text-[11px] gap-3 bg-foreground text-background hover:scale-[1.02] transition-transform">
                            Full Case Study <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        {project.githubUrl && (
                          <Link href={project.githubUrl} target="_blank" className="h-14 w-14 rounded-2xl border border-foreground/10 flex items-center justify-center hover:bg-foreground/[0.03] transition-all hover:scale-105 group">
                            <Github className="h-5 w-5 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Recent Journal Section */}
      <section id="blog" className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1500ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Recent Journal</h2>
            <p className="text-muted-foreground text-sm font-medium">Thoughts on design, engineering, and the future of AI.</p>
          </div>
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-2 rounded-full font-semibold overflow-hidden group">
              Explore Blog <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="space-y-4">
                <div className="aspect-[16/9] bg-foreground/[0.03] border border-foreground/[0.05] rounded-3xl overflow-hidden relative transition-all duration-500 group-hover:border-foreground/10 group-hover:shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                     <span className="text-4xl font-black uppercase text-foreground">{post.category}</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/[0.05] text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 px-1">
                  <h3 className="text-lg font-bold group-hover:text-foreground/70 transition-colors leading-tight">{post.title}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="opacity-30">•</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
            </Link>
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
          <Link href="/uses" className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none transition-opacity group-hover:opacity-20" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-muted-foreground/60">Daily Setup</p>
                <h3 className="text-lg font-bold tracking-tight">Uses</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Laptop, name: 'MacBook Air M2', detail: '13-inch' },
                  { icon: Keyboard, name: 'Lofree Flow', detail: 'Low Profile' },
                  { icon: Mouse, name: 'Logitech G Pro', detail: 'Wireless' },
                  { icon: Monitor, name: 'ASUS ProArt', detail: 'Color Accurate' },
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
          </Link>

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
