"use client"

import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowDown, ArrowRight, Sparkles, Zap, ShieldCheck, Rocket } from "lucide-react";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ContactModal } from "@/components/ContactModal";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useIntro } from "@/components/intro-context";
import { ProjectCard } from "@/components/ProjectCard";
import { TechBadge } from "@/components/TechBadge";
import { WorkflowStep } from "@/components/WorkflowStep";
import { TimelineItem } from "@/components/TimelineItem";

const projects = [
  {
    title: "AI Toolkit v2.5",
    description: "A comprehensive dashboard for managing LLM models, datasets, and compute resources with a premium glassmorphic interface.",
    image: "/projects/ai-toolkit.png",
    tags: ["Next.js", "OpenAI", "Tailwind"],
    isAI: true,
    className: "md:col-span-2 md:row-span-2"
  },
  {
    title: "Smart Guestbook",
    description: "Digital guestbook with sentiment analysis and automated moderation using AI.",
    image: "/projects/guestbook.png",
    tags: ["Next.js", "AppScript", "AI"],
    isAI: true,
    className: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Valentine's Surprise",
    description: "A minimal, elegant web experience for a special Valentine's Day surprise.",
    image: "/projects/valentines.png",
    tags: ["React", "Framer Motion"],
    isAI: false,
    className: "md:col-span-1 md:row-span-1"
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
  core: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
  ai: ["OpenAI", "Claude", "LangChain", "Vercel AI SDK", "Prompt Engineering"],
  tools: ["Cursor", "GitHub", "Vercel", "Docker", "Framer Motion"]
};

const workflow = [
  {
    number: "01",
    title: "Intelligence",
    description: "Deep research and architectural planning using advanced LLMs.",
    icon: Sparkles
  },
  {
    number: "02",
    title: "Speed",
    description: "Rapid component generation and AI-assisted iterative coding.",
    icon: Zap
  },
  {
    number: "03",
    title: "Refine",
    description: "Automated testing and design polishing for premium feel.",
    icon: ShieldCheck
  },
  {
    number: "04",
    title: "Deploy",
    description: "Continuous delivery and automated performance monitoring.",
    icon: Rocket
  }
];

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
    <div className="flex flex-col relative overflow-hidden">
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

      {/* Selected Work Section */}
      <section className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1200ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Selected Work</h2>
            <p className="text-muted-foreground text-sm font-medium">A collection of featured projects and experiments.</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 rounded-full font-semibold overflow-hidden group">
            View All Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              {...project}
            />
          ))}
        </div>
      </section>

      {/* Tech Toolkit Section */}
      <section className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1400ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-4">Tech Toolkit</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[300px]">
              My current stack of preferred technologies and tools for building modern, AI-integrated software.
            </p>
          </div>
          <div className="md:w-2/3 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">Core Stack</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.core.map(tech => <TechBadge key={tech} name={tech} />)}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">AI & Intelligence</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.ai.map(tech => <TechBadge key={tech} name={tech} />)}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">Preferred Tools</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.tools.map(tech => <TechBadge key={tech} name={tech} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Workflow Section */}
      <section className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1600ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="text-center mb-16 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 mb-4 block">Process</span>
          <h2 className="text-3xl font-bold tracking-tight uppercase mb-4">AI Driven Workflow</h2>
          <p className="text-muted-foreground text-sm max-w-[500px] mx-auto">
            How I leverage artificial intelligence to build faster, smarter, and more reliable web applications.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative z-10 px-4 md:px-0">
          {workflow.map((step, index) => (
            <WorkflowStep 
              key={step.number}
              {...step}
              isLast={index === workflow.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1800ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-4">Experience</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[300px]">
              A timeline of my professional journey and the companies I&apos;ve helped build for.
            </p>
          </div>
          <div className="md:w-2/3">
            <div className="max-w-[800px]">
              {experiences.map((exp, index) => (
                <TimelineItem 
                  key={index}
                  {...exp}
                  isLast={index === experiences.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
