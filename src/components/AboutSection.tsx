"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Github, Instagram, ArrowRight, BrainCircuit, Sparkles, MessageSquare } from "lucide-react"
import Image from "next/image"
import { ContactModal } from "./ContactModal"

export function AboutSection() {
  const flowingTech = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Laravel", "PHP", 
    "OpenAI", "Claude", "LangChain", "PostgreSQL", "Node.js", "Python"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* 1. Profile Card (Tall) */}
      <Card className="lg:col-span-3 md:row-span-2 border bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden flex flex-col group border-dashed">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image 
            src="/profile-v3.jpg" 
            alt="Thanakon" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        </div>
        <CardContent className="p-6 mt-auto">
          <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Thanakon D.</h3>
          <div className="flex gap-3">
            <a href="https://linkedin.com/in/thanakon-d" target="_blank" className="h-10 w-10 rounded-xl border bg-background/50 flex items-center justify-center transition-all hover:bg-foreground hover:text-background group/icon">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://github.com/thnakon" target="_blank" className="h-10 w-10 rounded-xl border bg-background/50 flex items-center justify-center transition-all hover:bg-foreground hover:text-background group/icon">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://instagram.com/thnakon" target="_blank" className="h-10 w-10 rounded-xl border bg-background/50 flex items-center justify-center transition-all hover:bg-foreground hover:text-background group/icon">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* 2. Main About Card (Wide) */}
      <Card className="lg:col-span-6 border bg-card/50 backdrop-blur-sm rounded-3xl p-8 flex flex-col justify-center border-dashed relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="h-24 w-24" />
        </div>
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-[10px] font-bold uppercase tracking-widest text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
            About Me
          </div>
          <h2 className="text-3xl font-bold tracking-tight uppercase leading-tight">
            Redefining Architecture <br /> <span className="text-muted-foreground">Through AI.</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[500px]">
            Hello, I&apos;m Thanakon. A software developer who doesn&apos;t just use AI to write code; I embrace it as a &apos;co-thinker and co-builder&apos; at every stage of the process, from architecture to deployment.
          </p>
        </div>
      </Card>

      {/* 3. Tech Stack Flowing Card (Square-ish) */}
      <Card className="lg:col-span-3 border bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden border-dashed flex flex-col">
        <CardHeader className="p-6 pb-2">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">Tech Stack</h4>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col justify-center overflow-hidden">
          <div className="relative flex overflow-hidden group/marquee">
            <div className="flex gap-4 items-center py-6 animate-marquee whitespace-nowrap">
              {flowingTech.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="px-4 py-1.5 font-mono text-[11px] bg-background/50 hover:bg-foreground hover:text-background transition-all cursor-default border-dashed"
                >
                  {tech}
                </Badge>
              ))}
              {/* Duplicate for seamless loop */}
              {flowingTech.map((tech) => (
                <Badge 
                  key={`${tech}-2`} 
                  variant="outline" 
                  className="px-4 py-1.5 font-mono text-[11px] bg-background/50 hover:bg-foreground hover:text-background transition-all cursor-default border-dashed"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            {/* Mask gradients for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-card to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-card to-transparent z-10" />
          </div>
        </CardContent>
      </Card>

      {/* 4. Modular Intelligence Card (Wide) */}
      <Card className="lg:col-span-5 border bg-card/50 backdrop-blur-sm rounded-3xl p-8 border-dashed group hover:bg-card/80 transition-colors">
        <div className="flex items-start justify-between mb-6">
          <div className="h-12 w-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
            <BrainCircuit className="h-6 w-6 text-foreground" />
          </div>
        </div>
        <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Modular Intelligence</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          I specialize in integrating LLMs and AI Agents into real-world workflows, elevating software with the ability to think and analyze beyond traditional limits.
        </p>
      </Card>

      {/* 5. CTA & Experience Card (Medium) */}
      <Card className="lg:col-span-4 border bg-foreground text-background rounded-3xl p-8 flex flex-col justify-between border-none shadow-2xl shadow-foreground/10 group overflow-hidden">
        <div className="absolute top-0 right-0 p-4 translate-x-4 -translate-y-4 opacity-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
          <MessageSquare className="h-32 w-32" />
        </div>
        <div className="space-y-4 relative z-10">
          <h3 className="text-2xl font-bold uppercase tracking-tight leading-none">Let&apos;s Work <br /> Together</h3>
          <p className="text-background/70 text-sm leading-tight">
            I believe the future lies in AI-driven innovation. Let&apos;s build something intelligent.
          </p>
        </div>
        <div className="pt-8 flex items-center justify-between relative z-10">
          <ContactModal>
            <Button variant="outline" className="bg-transparent border-background/20 text-background hover:bg-background hover:text-foreground rounded-xl px-6 font-bold uppercase text-[10px] tracking-widest transition-all">
              Connect
            </Button>
          </ContactModal>
          <a 
            href="#experience" 
            className="group/link flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-background/60 hover:text-background transition-colors"
          >
            Experience
            <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </Card>

    </div>
  )
}
