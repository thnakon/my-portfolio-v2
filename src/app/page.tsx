"use client"

import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowDown, ArrowRight } from "lucide-react";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ContactModal } from "@/components/ContactModal";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useIntro } from "@/components/intro-context";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { TimelineItem } from "@/components/TimelineItem";
import { AboutSection } from "@/components/AboutSection";
import { BentoGrid } from "@/components/BentoGrid";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const projects = [
  {
    title: "AI Toolkit v2.5",
    description: "",
    longDescription: "A high-performance command center for AI engineers. Built with a focus on real-time data visualization and modularity, allowing users to orchestrate complex model training and deployment pipelines with ease.",
    image: "/projects/ai-toolkit.png",
    tags: ["Next.js", "OpenAI", "Tailwind CSS", "TypeScript", "Vercel AI SDK"],
    features: [
      { text: "Modular Agentic Workflows with LangChain", icon: "Bot" },
      { text: "Real-time training performance tracking", icon: "BarChart3" },
      { text: "Seamless Vercel AI SDK integration", icon: "Zap" },
      { text: "Advanced model & dataset orchestration", icon: "Inbox" }
    ],
    isAI: true
  },
  {
    title: "Smart Guestbook",
    description: "Digital guestbook with sentiment analysis and automated moderation using AI.",
    longDescription: "An interactive guestbook that uses natural language processing to understand user sentiment. It automatically filters spam and highlights positive testimonials, providing a seamless experience for visitors.",
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
    description: "A minimal, elegant web experience for a special Valentine's Day surprise.",
    longDescription: "A personalized, animated experience designed to deliver a special message. Focused on silky-smooth animations and a playful yet premium aesthetic, making every interaction feel meaningful.",
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
  core: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
  ai: ["OpenAI", "Claude", "LangChain", "Vercel AI SDK", "Prompt Engineering"],
  tools: ["Cursor", "GitHub"]
};

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Developing innovative tools to\nempower students and businesses";
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Tech Toolkit</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[300px]">
              My current stack of preferred technologies and tools for building modern, AI-integrated software.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border bg-card/30 backdrop-blur-sm shadow-none border-dashed">
              <CardHeader className="pb-3">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">Core Stack</h4>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {techStack.core.map(tech => (
                  <Tooltip key={tech}>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="px-3 py-1 font-mono text-[11px] bg-background hover:bg-muted transition-colors cursor-default">
                        {tech}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-[10px] uppercase tracking-widest font-bold">In-depth expertise</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </CardContent>
            </Card>

            <Card className="border bg-card/30 backdrop-blur-sm shadow-none border-dashed">
              <CardHeader className="pb-3">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">AI & Intelligence</h4>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {techStack.ai.map(tech => (
                  <Tooltip key={tech}>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="px-3 py-1 font-mono text-[11px] cursor-default">
                        {tech}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-[10px] uppercase tracking-widest font-bold">AI Native</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </CardContent>
            </Card>

            <Card className="border bg-card/30 backdrop-blur-sm shadow-none border-dashed sm:col-span-2">
              <CardHeader className="pb-3">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">Preferred Tools</h4>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {techStack.tools.map(tech => (
                  <Badge key={tech} variant="outline" className="px-3 py-1 font-mono text-[11px] bg-muted/50 border-foreground/5 cursor-default">
                    {tech}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1800ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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
