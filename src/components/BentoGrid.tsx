"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, ArrowUpRight, MapPin, Folder, FileText, Plane } from "lucide-react"
import { ContactModal } from "@/components/ContactModal"
import { CopyEmailButton } from "@/components/CopyEmailButton"
import Image from "next/image"

import { Orb } from "@/components/ui/orb"

const techRow1 = [
  "Next.js", "React", "Tailwind CSS", "CSS", "Figma", "GSAP", "Framer Motion", "HTML", "PHP"
]

const techRow2 = [
  "Laravel", "Node.js", "MySQL", "Supabase", "Bun", "ChatGPT", "Gemini", "Claude", "OpenClaw", "LLMs", "RAG", "Agentic Workflows", "Docker", "Git", "GitLab", "SourceTree"
]

const projectFolders = [
  { name: "Singha", image: "/projects/singha-preview.png", color: "text-amber-500" },
  { name: "Klin Dental", image: "/projects/klin-dental-preview.png", color: "text-blue-500" },
  { name: "Babybib", image: "/projects/babybib-preview.png", color: "text-purple-500" },
  { name: "Oboun", image: "/projects/oboun-preview.png", color: "text-emerald-500" },
  { name: "Portfolio v1", image: "/projects/portfolio-v1-preview.png", color: "text-slate-500" },
]

const techIcons: Record<string, string> = {
  "Next.js": "nextdotjs",
  "React": "react",
  "Tailwind CSS": "tailwindcss",
  "CSS": "css3",
  "Figma": "figma",
  "GSAP": "gsap",
  "Framer Motion": "framer",
  "HTML": "html5",
  "PHP": "php",
  "Laravel": "laravel",
  "Node.js": "nodedotjs",
  "MySQL": "mysql",
  "Supabase": "supabase",
  "Bun": "bun",
  "ChatGPT": "openai",
  "Gemini": "googlegemini",
  "Claude": "claude",
  "Docker": "docker",
  "Git": "git",
  "GitLab": "gitlab",
  "SourceTree": "sourcetree"
}

export function BentoGrid() {
  const getIconUrl = (tech: string) => {
    const slug = techIcons[tech];
    if (!slug) return null;
    if (slug.startsWith('/')) return slug;
    return `https://cdn.simpleicons.org/${slug}`;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
      {/* Cell 1: About Me — wide (col-span-2) */}
      <Card className="md:col-span-2 border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="p-0 h-full">
          <div className="grid grid-cols-1 md:grid-cols-5 h-full">
            <div className="md:col-span-3 pt-5 px-8 pb-8 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground/60">
                  About Me
                </p>
                <h3 className="text-xl font-bold tracking-tight leading-snug">
                  I&apos;m Thanakon, an AI-Augmented Developer.
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I don&apos;t just write code; I embrace AI as a co-thinker to build intelligent systems that transform how users interact with technology.
                </p>
              </div>
              <div className="flex justify-start mt-4">
                <a href="#about" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors w-fit">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            <div className="md:col-span-2 relative h-[240px] md:h-full flex items-center justify-center">
              {/* Hanging String */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-muted-foreground/30 z-0" />
              
              {/* Circular Suspended Image */}
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-card shadow-2xl overflow-hidden z-10 group-hover:scale-105 transition-transform duration-500 mt-2">
                <Image 
                  src="/profile-v3.jpg" 
                  alt="Thanakon" 
                  fill 
                  className="object-cover"
                />
              </div>
              
              {/* Subtle light effect behind image */}
              <div className="absolute inset-0 bg-radial-gradient from-foreground/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:row-span-2 border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-all duration-500">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="relative flex-1 flex flex-col bg-muted/5">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]" />
            
            <div className="relative flex-1 flex items-center overflow-hidden">
              <div className="flex animate-marquee gap-6 items-center py-6 px-4">
                {[...projectFolders, ...projectFolders].map((project, i) => (
                  <div key={i} className="group/folder relative shrink-0 cursor-pointer">
                    {/* Folder Card with Image */}
                    <div className="relative w-28 transition-all duration-300 group-hover/folder:scale-110">
                      {/* Folder Tab */}
                      <div className={`absolute -top-2.5 left-2 w-10 h-4 rounded-t-md ${project.color.replace('text-', 'bg-')}/20 border border-b-0 border-foreground/5`} />
                      
                      {/* Folder Body */}
                      <div className={`relative w-full h-20 rounded-lg border border-foreground/10 bg-card/80 backdrop-blur-sm shadow-md overflow-hidden group-hover/folder:shadow-xl transition-shadow`}>
                        {/* Project Preview Image */}
                        <Image 
                          src={project.image} 
                          alt={project.name} 
                          fill 
                          className="object-cover opacity-70 group-hover/folder:opacity-100 transition-opacity duration-300"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {/* Project Name */}
                        <div className="absolute bottom-1.5 left-2 right-2">
                          <span className="text-[10px] font-bold text-white drop-shadow-md truncate block">
                            {project.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          </div>
          
          <div className="pt-4 px-6 pb-6 space-y-2">
            <p className="text-xs font-bold text-muted-foreground/60">
              Featured Work
            </p>
            <h3 className="font-bold text-lg tracking-tight">Project Archives</h3>
            <a href="#selected-work" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              View all project details <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="pt-5 px-8 pb-8 h-full flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground/60">
              Collaborate
            </p>
            <h3 className="text-lg font-bold tracking-tight">
              Let&apos;s work together
            </h3>
            <p className="text-xs text-muted-foreground">
              Open for freelance & full-time opportunities.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <ContactModal>
              <Button size="sm" className="rounded-xl text-xs font-semibold">
                Get in touch
              </Button>
            </ContactModal>
            <CopyEmailButton />
          </div>
        </CardContent>
      </Card>

      <Card className="border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors relative">
        <CardContent className="pt-5 px-8 pb-8 h-full flex flex-col justify-between relative z-10">
          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground/60">
              Location
            </p>
            <h3 className="text-lg font-bold tracking-tight">
              Based in Thailand 🇹🇭
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">GMT+7</span>
            <span className="text-xs text-muted-foreground/60">• Available for remote work</span>
          </div>
        </CardContent>
        {/* Animated Plane */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Plane 
            className="absolute -left-12 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground/20 rotate-45 transition-all duration-[3000ms] ease-in-out group-hover:left-[110%] group-hover:-translate-y-[100px] opacity-0 group-hover:opacity-100" 
          />
        </div>
      </Card>

      {/* Cell 5: Tech Stack Marquee — 2 Rows */}
      <Card className="md:col-span-2 border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden">
        <CardContent className="pt-5 px-8 pb-8 h-full flex flex-col justify-between">
          <p className="text-xs font-bold text-muted-foreground/60 mb-2">
            Tech Stack
          </p>
          <div className="relative overflow-hidden flex-1 flex flex-col justify-center gap-4">
            {/* Row 1 */}
            <div className="flex animate-marquee gap-3 whitespace-nowrap">
              {[...techRow1, ...techRow1].map((tech, i) => (
                <Badge key={i} variant="outline" className="px-4 py-2 font-mono text-[11px] bg-background border-muted-foreground/20 cursor-default shrink-0 flex items-center gap-2">
                  {getIconUrl(tech) && (
                    <img 
                      src={getIconUrl(tech)!} 
                      alt={tech} 
                      className="w-3.5 h-3.5" 
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
                <Badge key={i} variant="outline" className="px-4 py-2 font-mono text-[11px] bg-background border-muted-foreground/20 cursor-default shrink-0 flex items-center gap-2">
                  {getIconUrl(tech) && (
                    <img 
                      src={getIconUrl(tech)!} 
                      alt={tech} 
                      className="w-3.5 h-3.5" 
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  )}
                  {tech}
                </Badge>
              ))}
            </div>
            {/* Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background/30 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background/30 to-transparent z-10 pointer-events-none" />
          </div>
        </CardContent>
      </Card>

      {/* Cell 6: Modular Intelligence */}
      <Card className="border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors relative">
        <CardContent className="p-0 h-full flex flex-col relative z-10">
          <div className="absolute -right-24 -bottom-24 z-0 opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none">
            <Orb agentState="thinking" className="h-[250px] w-[250px]" />
          </div>
          <div className="pt-5 px-8 pb-8 h-full flex flex-col justify-between relative z-10">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                  Agentic IDE
                </p>
                <h3 className="text-lg font-bold tracking-tight">
                  The Future of Work
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Antigravity", logo: "googlegemini", color: "text-blue-500" },
                  { name: "Windsurf", logo: "codeium", color: "text-emerald-500" },
                  { name: "Cursor", logo: "cursor", color: "text-cyan-500" }
                ].map((ide) => (
                  <div key={ide.name} className="flex items-center gap-1.5 bg-background/50 backdrop-blur-md border border-foreground/5 px-2.5 py-1 rounded-lg">
                    <img 
                      src={`https://cdn.simpleicons.org/${ide.logo}`} 
                      alt={ide.name} 
                      className="w-3 h-3 opacity-80"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                        if (fallback) (fallback as HTMLElement).style.display = 'block';
                      }}
                    />
                    <Sparkles className="w-3 h-3 text-foreground/40 hidden fallback-icon" style={{ display: 'none' }} />
                    <span className="text-[10px] font-medium text-foreground/80">{ide.name}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Pioneering the transition to <strong>Agent-First Automation</strong>. Utilizing autonomous AI agents to orchestrate complex development tasks across modular environments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
