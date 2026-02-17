"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, ArrowUpRight, MapPin } from "lucide-react"
import { ContactModal } from "@/components/ContactModal"
import { CopyEmailButton } from "@/components/CopyEmailButton"
import Image from "next/image"

const techRows = {
  row1: ["Next.js", "React", "Tailwind CSS", "CSS", "Figma", "GSAP", "Framer Motion", "HTML", "PHP"],
  row2: ["Laravel", "Node.js", "MySQL", "MS SQL Server", "Supabase", "Bun", "PostgreSQL", "Prisma"],
  row3: ["ChatGPT", "Gemini", "Claude", "OpenClaw", "Docker", "Git", "GitLab", "SourceTree", "Singha Internship", "Oboun ERP", "ScribeHub", "Mai lon", "Rublom Resort"]
}

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">

      {/* Cell 1: About Me — wide (col-span-2) */}
      <Card className="md:col-span-2 border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="p-8 h-full flex flex-col justify-between">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
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

      {/* Cell 2: Work — tall (row-span-2) */}
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
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
              Featured Work
            </p>
            <h3 className="font-bold text-lg tracking-tight">AI Toolkit v2.5</h3>
            <a href="#selected-work" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              View all projects <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Cell 3: Let's Work Together */}
      <Card className="border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="p-8 h-full flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
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

      {/* Cell 4: Based in Thailand */}
      <Card className="border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="p-8 h-full flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
                Location
              </p>
            </div>
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

      {/* Cell 5: Tech Stack Marquee — wide (col-span-2) */}
      <Card className="md:col-span-2 border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden">
        <CardContent className="p-6 h-full flex flex-col">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 mb-6">
            Tech Stack & Experience
          </p>
          
          <div className="space-y-4 flex-1 flex flex-col justify-center overflow-hidden">
            {/* Row 1 */}
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee gap-3 whitespace-nowrap">
                {[...techRows.row1, ...techRows.row1].map((tech, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1 font-mono text-[11px] bg-background border-muted transition-colors cursor-default shrink-0">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee gap-3 whitespace-nowrap" style={{ animationDirection: 'reverse', animationDuration: '30s' }}>
                {[...techRows.row2, ...techRows.row2].map((tech, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1 font-mono text-[11px] transition-colors cursor-default shrink-0">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Row 3 */}
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee gap-3 whitespace-nowrap" style={{ animationDuration: '35s' }}>
                {[...techRows.row3, ...techRows.row3].map((tech, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1 font-mono text-[11px] bg-muted/30 border-muted transition-colors cursor-default shrink-0">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cell 6: Modular Intelligence */}
      <Card className="border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="p-8 h-full flex flex-col justify-between">
          <div className="space-y-3">
            <Sparkles className="h-6 w-6" />
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
