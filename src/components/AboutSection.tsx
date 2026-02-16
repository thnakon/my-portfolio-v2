"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Code2, BrainCircuit, User } from "lucide-react"

export function AboutSection() {
  return (
    <div className="flex flex-col md:flex-row gap-16 items-start">
      {/* Left side: Hero-like Intro */}
      <div className="md:w-1/3 space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight uppercase">About Me</h2>
          <div className="h-1 w-12 bg-foreground" />
        </div>
        <p className="text-muted-foreground text-md leading-relaxed font-medium">
          Hello, I&apos;m Thanakon Dungkumwattanasiri, an AI-Augmented Software Developer. I don&apos;t see AI merely as a tool for writing code; I integrate it into the entire process of thinking, designing, and building systems from start to finish.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          I specialize in applying LLMs and AI Agents to real-world workflows, elevating software to be more intelligent—capable of thinking, analyzing, and performing more efficiently than ever through technologies like Laravel and Next.js, built with an AI-first mindset.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          I believe the future of software development lies in integrating AI as the core of the system to create technology that grows sustainably with businesses.
        </p>
      </div>

      {/* Right side: Interactive Content */}
      <div className="md:w-2/3 w-full">
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 rounded-xl p-1 mb-8">
            <TabsTrigger value="skills" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Code2 className="h-3.5 w-3.5 mr-2" />
              Skillset
            </TabsTrigger>
            <TabsTrigger value="philosophy" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BrainCircuit className="h-3.5 w-3.5 mr-2" />
              Philosophy
            </TabsTrigger>
            <TabsTrigger value="identity" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <User className="h-3.5 w-3.5 mr-2" />
              Identity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/70">Frontend Craft</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Expertise in Next.js, React, and GSAP/Framer Motion for creating fluid, motion-driven interfaces.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/70">AI Integration</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Implementing LLMs, vector databases (RAG), and agentic workflows to build intelligent software solutions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="philosophy" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8 space-y-4">
                <blockquote className="border-l-2 pl-6 py-2 italic text-muted-foreground text-base leading-relaxed">
                  &ldquo;Software should be invisible yet indispensable. My goal is to leverage AI to handle the complexity while keeping the human experience simple and delightful.&rdquo;
                </blockquote>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I believe in iterative development, rapid prototyping with AI, and a relentless focus on performance and minimalist aesthetics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="identity" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold uppercase tracking-wide">
                      What drives my curiosity?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      The rapid evolution of Large Language Models and their potential to transform how we interact with technology. I enjoy exploring the limits of what automated agents can do.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b-0">
                    <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold uppercase tracking-wide">
                      Outside of coding?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      I&apos;m an avid learner of design trends, architectural patterns, and occasional coffee enthusiast. I believe a balanced life fuels creativity.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
