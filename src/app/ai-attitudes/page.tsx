"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Brain, Zap, Shield, Cpu, Bot, Rocket, MessageSquare, Code2, Workflow } from "lucide-react"
import { FinalSection } from "@/components/FinalSection"
import { useIntro } from "@/components/intro-context"

export default function AttitudesAIPage() {
  const [mounted, setMounted] = useState(false)
  const { isDone } = useIntro()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const attitudes = [
    {
      title: "AI as a Co-Pilot, not a Pilot",
      description: "In 2026, I view AI as the ultimate collaborator. It handles the heavy lifting of boilerplate and research, while I focus on architectural decisions and creative direction.",
      icon: Rocket,
      size: "col-span-1 md:col-span-2",
      bg: "bg-foreground/[0.03]",
    },
    {
      title: "Agentic Architecture",
      description: "Shifting from prompt-engineering to orchestrating fleets of agents that can plan and execute complex tasks autonomously.",
      icon: Bot,
      size: "col-span-1",
      bg: "bg-foreground/[0.05]",
    },
    {
      title: "The Human Edge",
      description: "As AI commoditizes syntax, human taste, intuition, and problem-solving become the highest-valued assets in engineering.",
      icon: Brain,
      size: "col-span-1",
      bg: "bg-foreground/[0.02]",
    },
    {
      title: "Ethical Integration",
      description: "Maintaining a clear boundary between human-original thought and AI-generated content, ensuring transparency and trust in every project.",
      icon: Shield,
      size: "col-span-1 md:col-span-2",
      bg: "bg-foreground/[0.04]",
    },
    {
      title: "Continuous Evolution",
      description: "My stack is no longer static. It evolves as rapidly as the models, requiring a mindset of perpetual learning and adaptation.",
      icon: Cpu,
      size: "col-span-1",
      bg: "bg-foreground/[0.03]",
    },
    {
      title: "Workflow Automation",
      description: "Automating the mundane to amplify the meaningful. AI is the engine that drives my productivity beyond traditional limits.",
      icon: Workflow,
      size: "col-span-1 md:col-span-2",
      bg: "bg-foreground/[0.06]",
    }
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-foreground/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-foreground/[0.02] rounded-full blur-[120px]" />
      </div>

      <main className="container mx-auto px-8 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-[0.9]">
            Attitudes AI
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            My philosophy and approach towards integrating Artificial Intelligence into the core of software engineering and creative work.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-32">
          {attitudes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative rounded-3xl border border-foreground/[0.06] ${item.bg} p-8 flex flex-col justify-between overflow-hidden hover:border-foreground/[0.12] transition-colors`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-background border border-foreground/[0.05] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="h-6 w-6 text-foreground/70" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <div className="relative z-10 mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 group-hover:text-foreground/40 transition-colors">
                <span>0{index + 1}</span>
                <div className="h-[1px] w-8 bg-current opacity-20" />
              </div>
              
              {/* Subtle light effect on hover */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-foreground/[0.02] blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Closing Thought */}
        <section className="mb-32">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-[3rem] bg-foreground/[0.02] border border-foreground/[0.05] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-foreground/[0.03] blur-[100px] rounded-full" />
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">Building the Future</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                In 2026, AI is no longer a tool we use, but an environment we inhabit. The goal isn&apos;t just to work faster, but to build more meaningful, high-quality experiences that were previously impossible.
              </p>
            </div>
          </div>
        </section>

        <FinalSection />
      </main>
    </div>
  )
}
