"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Code2, BrainCircuit, User, Linkedin, Github, Instagram, ArrowRight } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
      {/* 1. Main Intro - High Visual Weight */}
      <Card className="md:col-span-8 border bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden p-8 flex flex-col justify-between group hover:border-foreground/20 transition-all duration-500">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
              About Me <Sparkles className="h-5 w-5 text-muted-foreground/50" />
            </h2>
            <div className="h-1 w-12 bg-foreground" />
          </div>
          <div className="space-y-4 max-w-2xl">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Hello, I&apos;m Thanakon. A software developer redefining system architecture through the lens of AI. I don&apos;t just use AI to write code; I embrace it as a &apos;co-thinker and co-builder&apos; at every stage of the process.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              I specialize in integrating LLMs and AI Agents into real-world workflows, elevating software with the ability to think and analyze beyond traditional limits.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <a 
            href="#experience" 
            className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Review Experience
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Card>

      {/* 2. Image Block */}
      <Card className="md:col-span-4 border bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden group p-0 min-h-[300px] relative">
        <Image 
          src="/profile-v3.jpg" 
          alt="Thanakon" 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60" />
      </Card>

      {/* 3. Skillset - Mid weight */}
      <Card className="md:col-span-12 lg:col-span-7 border bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden p-0 h-fit">
        <Tabs defaultValue="skills" className="w-full">
          <div className="px-8 pt-8">
            <TabsList className="bg-muted/50 rounded-xl p-1 mb-6">
              <TabsTrigger value="skills" className="rounded-lg text-[11px] uppercase tracking-wider font-bold">
                <Code2 className="h-3 w-3 mr-2" />
                Skillset
              </TabsTrigger>
              <TabsTrigger value="philosophy" className="rounded-lg text-[11px] uppercase tracking-wider font-bold">
                <BrainCircuit className="h-3 w-3 mr-2" />
                Philosophy
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="skills" className="m-0 focus-visible:outline-none px-8 pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/70">Frontend Craft</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Expertise in Next.js, React, and motion-driven interfaces.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/70">AI Integration</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  LLMs, RAG, and agentic workflows for intelligent solutions.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="philosophy" className="m-0 focus-visible:outline-none px-8 pb-8">
            <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 pl-4 border-muted-foreground/20">
              &ldquo;Software should be invisible yet indispensable. My goal is to leverage AI to handle complexity while keeping experience simple.&rdquo;
            </p>
          </TabsContent>
        </Tabs>
      </Card>

      {/* 4. Identity & FAQ */}
      <Card className="md:col-span-8 lg:col-span-3 border bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden p-6 flex flex-col justify-center">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-foreground/70 mb-2">
            <User className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Identity</span>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="hover:no-underline py-2 text-xs font-bold text-left">
                Curiosity?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-xs leading-relaxed">
                The evolution of LLMs and potential to transform digital interaction.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b-0">
              <AccordionTrigger className="hover:no-underline py-2 text-xs font-bold text-left">
                Outside Coding?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-xs leading-relaxed">
                Design trends, architectural patterns, and a coffee enthusiast.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>

      {/* 5. Social Presence - Smallest block */}
      <Card className="md:col-span-4 lg:col-span-2 border bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden p-6 flex flex-col items-center justify-center gap-4 group">
        <a href="https://linkedin.com/in/thanakon-d" target="_blank" className="h-12 w-12 rounded-2xl border bg-background shadow-sm flex items-center justify-center transition-all hover:bg-muted group/link">
          <Linkedin className="h-5 w-5 text-muted-foreground group-hover/link:text-foreground transition-colors" />
        </a>
        <a href="https://github.com/thnakon" target="_blank" className="h-12 w-12 rounded-2xl border bg-background shadow-sm flex items-center justify-center transition-all hover:bg-muted group/link">
          <Github className="h-5 w-5 text-muted-foreground group-hover/link:text-foreground transition-colors" />
        </a>
        <a href="https://instagram.com/thnakon" target="_blank" className="h-12 w-12 rounded-2xl border bg-background shadow-sm flex items-center justify-center transition-all hover:bg-muted group/link">
          <Instagram className="h-5 w-5 text-muted-foreground group-hover/link:text-foreground transition-colors" />
        </a>
      </Card>
    </div>
  )
}
