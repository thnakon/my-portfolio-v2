"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BatteryCharging, BrainCircuit, Code, Send } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const techStack = [
  "Next.js", "React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL",
  "OpenAI", "Anthropic", "LangChain", "Vercel", "Supabase", "Prisma"
]

export function BentoGrid() {
  return (
    <section className="container mx-auto px-4 py-8 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {/* Modular Intelligence - Large Card */}
        <Card className="md:col-span-2 group overflow-hidden relative border-muted/40 bg-card/30 backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-background z-0" />
          <CardHeader className="relative z-10">
            <div className="bg-primary/10 w-fit p-3 rounded-xl mb-4 text-primary">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold">Modular Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
             <p className="text-muted-foreground text-lg mt-2 max-w-md">
               Building systems where AI isn't just an add-on, but the architectural core. Integrating LLMs to create adaptive user experiences.
             </p>
          </CardContent>
          {/* Decorative Pattern */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
        </Card>

        {/* Selected Work - Preview */}
        <Card className="md:col-span-1 group overflow-hidden relative border-muted/40 bg-card/30 backdrop-blur-md cursor-pointer hover:border-primary/50 transition-colors">
          <Link href="#projects" className="absolute inset-0 z-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
          
          {/* Abstract visual for work */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl group-hover:bg-sky-500/30 transition-all duration-500" />

          <CardHeader className="relative z-10 h-full flex flex-col justify-end pb-8">
            <div className="bg-sky-500/10 w-fit p-2 rounded-lg mb-2 text-sky-500">
              <Code className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">Selected Work</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Explore my latest projects and architectural experiments.
            </p>
          </CardHeader>
        </Card>

        {/* Tech Stack - Marquee */}
        <Card className="md:col-span-2 group overflow-hidden relative border-muted/40 bg-card/30 backdrop-blur-md flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
           <CardHeader className="relative z-20 pb-2">
            <div className="flex items-center gap-2 mb-2">
               <div className="bg-emerald-500/10 w-fit p-2 rounded-lg text-emerald-500">
                  <BatteryCharging className="w-5 h-5" />
               </div>
               <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Powering My Build</span>
            </div>
          </CardHeader>
          <div className="relative flex overflow-hidden py-4 z-0">
            <div className="animate-marquee whitespace-nowrap flex gap-4">
              {techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-lg py-2 px-6 border-muted-foreground/20 bg-background/50">
                  {tech}
                </Badge>
              ))}
               {techStack.map((tech) => (
                <Badge key={`${tech}-duplicate`} variant="outline" className="text-lg py-2 px-6 border-muted-foreground/20 bg-background/50">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-4">
               {techStack.map((tech) => (
                <Badge key={`${tech}-2`} variant="outline" className="text-lg py-2 px-6 border-muted-foreground/20 bg-background/50">
                  {tech}
                </Badge>
              ))}
               {techStack.map((tech) => (
                <Badge key={`${tech}-2-duplicate`} variant="outline" className="text-lg py-2 px-6 border-muted-foreground/20 bg-background/50">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Contact - CTA */}
        <Card className="md:col-span-1 group overflow-hidden relative border-muted/40 bg-primary text-primary-foreground backdrop-blur-md flex flex-col justify-between cursor-pointer hover:brightness-110 transition-all">
          <Link href="#contact" className="absolute inset-0 z-20" />
           <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-16 group-hover:translate-x-12 transition-transform duration-700" />
           
          <CardHeader className="relative z-10">
             <div className="bg-white/20 w-fit p-3 rounded-full mb-4">
               <Send className="w-6 h-6" />
             </div>
            <CardTitle className="text-2xl leading-tight">Let&apos;s Work Together</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
             <p className="text-primary-foreground/80 text-sm">
               Have an idea? Let&apos;s build something intelligent.
             </p>
          </CardContent>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 group-hover:rotate-0 transform duration-300">
             <Send className="w-8 h-8" />
          </div>
        </Card>
      </div>
    </section>
  )
}
