"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, ArrowUpRight, MapPin } from "lucide-react"
import { ContactModal } from "@/components/ContactModal"
import { CopyEmailButton } from "@/components/CopyEmailButton"
import Image from "next/image"

const allTechs = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js",
  "Laravel", "OpenAI", "Claude", "LangChain", "Vercel AI SDK", "Prisma",
  "Docker", "Git", "Figma", "Supabase"
]

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">

      {/* Cell 1: About Me & Tech Stack — wide (col-span-2) */}
      <Card className="md:col-span-2 md:row-span-2 border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-card/50 transition-colors">
        <CardContent className="p-8 h-full flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
              Technical Profile & Experience
            </p>
            <h3 className="text-xl font-bold tracking-tight leading-snug">
              AI-Augmented Developer specializing in intelligent, scalable web ecosystems.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            {/* Column 1: Frontend & Design */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/80 border-b border-foreground/5 pb-1">Frontend Development</h4>
                <div className="text-[12px] space-y-2 text-muted-foreground leading-snug">
                  <p><span className="text-foreground/70 font-semibold block">Frameworks:</span> Next.js, React</p>
                  <p><span className="text-foreground/70 font-semibold block">Styling & UI:</span> Tailwind CSS, CSS, Figma</p>
                  <p><span className="text-foreground/70 font-semibold block">Animation:</span> GSAP, Framer Motion</p>
                  <p><span className="text-foreground/70 font-semibold block">Languages:</span> HTML, PHP</p>
                </div>
              </div>
            </div>

            {/* Column 2: Backend & AI */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/80 border-b border-foreground/5 pb-1">Backend & Systems</h4>
                <div className="text-[12px] space-y-2 text-muted-foreground leading-snug">
                  <p><span className="text-foreground/70 font-semibold block">Core:</span> Laravel, Node.js, Bun</p>
                  <p><span className="text-foreground/70 font-semibold block">Databases:</span> MySQL, SQL Server, Supabase</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/80 border-b border-foreground/5 pb-1">AI Intelligence</h4>
                <div className="text-[12px] space-y-2 text-muted-foreground leading-snug">
                  <p><span className="text-foreground/70 font-semibold block">Models:</span> GPT-4, Gemini, Claude</p>
                  <p><span className="text-foreground/70 font-semibold block">Workflows:</span> RAG, AI Agents</p>
                </div>
              </div>
            </div>

            {/* Column 3: Tools & Projects */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/80 border-b border-foreground/5 pb-1">Professional Tools</h4>
                <div className="text-[12px] space-y-2 text-muted-foreground leading-snug">
                  <p><span className="text-foreground/70 font-semibold block">DevOps:</span> Docker, Git, GitLab</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/80 border-b border-foreground/5 pb-1">Key Background</h4>
                <div className="text-[12px] space-y-1 text-muted-foreground leading-snug">
                  <p>• Intern at Singha Corp</p>
                  <p>• Oboun ERP | ScribeHub</p>
                  <p>• Mai lon | Rublom Resort</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 mt-auto">
            <a href="#about" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group/link">
              Full Profile <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
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
        <CardContent className="p-8 h-full flex flex-col justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 mb-4">
            Tech Stack
          </p>
          <div className="relative overflow-hidden flex-1 flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card/80 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card/80 to-transparent z-10" />
            <div className="flex animate-marquee gap-3 whitespace-nowrap">
              {[...allTechs, ...allTechs].map((tech, i) => (
                <Badge key={i} variant="outline" className="px-4 py-2 font-mono text-[12px] bg-background hover:bg-muted transition-colors cursor-default shrink-0">
                  {tech}
                </Badge>
              ))}
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
