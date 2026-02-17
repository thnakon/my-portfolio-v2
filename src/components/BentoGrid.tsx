"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, ArrowUpRight, MapPin } from "lucide-react"
import { ContactModal } from "@/components/ContactModal"
import { CopyEmailButton } from "@/components/CopyEmailButton"
import Image from "next/image"

const techRow1 = [
  "Next.js", "React", "Tailwind CSS", "CSS", "Figma", "GSAP", "Framer Motion", "HTML", "PHP"
]

const techRow2 = [
  "Laravel", "Node.js", "MySQL", "Supabase", "Bun", "ChatGPT", "Gemini", "Claude", "OpenClaw", "LLMs", "RAG", "Agentic Workflows", "Docker", "Git", "GitLab", "SourceTree"
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
        <CardContent className="p-8 h-full flex flex-col justify-between">
          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground/60">
              About Me
            </p>
            <h3 className="text-xl font-bold tracking-tight leading-snug max-w-md">
              AI-Augmented Developer redefining how software is built — from concept to deployment.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              I integrate AI as a co-thinker and co-builder at every stage, creating intelligent systems through Laravel & Next.js.
            </p>
          </div>
          <div className="flex justify-end">
            <a href="#about" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors w-fit">
              Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="md:row-span-2 border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="relative flex-1 overflow-hidden">
            <Image 
              src="/projects/ai-toolkit.png" 
              alt="AI Toolkit" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
          <div className="p-6 space-y-2">
            <p className="text-xs font-bold text-muted-foreground/60">
              Featured Work
            </p>
            <h3 className="font-bold text-lg tracking-tight">AI Toolkit v2.5</h3>
            <a href="#selected-work" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              View all projects <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="p-8 h-full flex flex-col justify-between">
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

      <Card className="border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="p-8 h-full flex flex-col justify-between">
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
      </Card>

      {/* Cell 5: Tech Stack Marquee — 2 Rows */}
      <Card className="md:col-span-2 border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden">
        <CardContent className="p-8 h-full flex flex-col justify-between">
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
      <Card className="border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="p-8 h-full flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-lg font-bold tracking-tight">
              Modular Intelligence
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every system I build is designed to be AI-native — modular, adaptive, and ready to evolve.
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
