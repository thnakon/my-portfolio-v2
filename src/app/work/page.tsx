"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Filter, Code2, Rocket, Globe, Github, Laptop, Keyboard, Mouse, Monitor, Music } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy"
import { FinalSection } from "@/components/FinalSection"
import { projects } from "@/data/projects"
import { useIntro } from "@/components/intro-context"
export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "web">("all")
  const [mounted, setMounted] = useState(false)
  const { isDone } = useIntro()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true
    if (activeFilter === "ai") return project.isAI
    if (activeFilter === "web") return !project.isAI
    return true
  })

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-foreground/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-foreground/[0.02] rounded-full blur-[120px]" />
      </div>

      <main className="container mx-auto px-8 pb-32 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">Work</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            A curated collection of my recent projects, featuring enterprise solutions, academic tools, and AI-driven experiments.
          </p>
        </motion.div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-foreground/[0.06] pb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground/40" />
            <div className="flex gap-1">
              {[
                { id: "all", label: "All Work" },
                { id: "ai", label: "AI Augmented" },
                { id: "web", label: "Web Apps" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeFilter === filter.id
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">
              Total Projects: {filteredProjects.length}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCaseStudy index={index} {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Bento Grid — Uses / Write to me / Last Played */}
        <section id="contact" className={`mt-32 transition-all duration-1000 delay-[500ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">

            {/* Uses */}
            <Link href="/uses" className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none transition-opacity group-hover:opacity-20" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/60">Daily Setup</p>
                  <h3 className="text-lg font-bold tracking-tight">Uses</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Laptop, name: 'MacBook Air M2', detail: '13-inch' },
                    { icon: Keyboard, name: 'Lofree Flow', detail: 'Low Profile' },
                    { icon: Mouse, name: 'Logitech G Pro', detail: 'Wireless' },
                    { icon: Monitor, name: 'ASUS ProArt', detail: 'Color Accurate' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-2.5 group/item">
                      <div className="h-8 w-8 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover/item:bg-foreground/[0.08] transition-colors">
                        <item.icon className="h-3.5 w-3.5 text-foreground/50" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-foreground/80 truncate leading-tight">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground/50 font-medium">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Arrow */}
              <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </Link>

            {/* Write to me */}
            <div className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-5">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/60">Guestbook</p>
                  <h3 className="text-lg font-bold tracking-tight">Write a note</h3>
                </div>
                {/* Visual Note Sheets */}
                <div className="relative h-28 w-full mt-4">
                  <div className="absolute inset-0 bg-foreground/[0.03] border border-foreground/[0.05] rounded-xl rotate-[-4deg] translate-y-2 scale-95" />
                  <div className="absolute inset-0 bg-card/40 backdrop-blur-sm border border-foreground/[0.08] rounded-xl rotate-[2deg] translate-y-1 scale-[0.98]" />
                  <div className="absolute inset-0 bg-card/60 backdrop-blur-md border border-foreground/[0.1] rounded-xl flex flex-col p-5 gap-2 transition-transform duration-500 group-hover:rotate-[-1deg] group-hover:-translate-y-1">
                    <div className="h-1.5 w-1/2 bg-foreground/20 rounded-full mb-2" />
                    <div className="space-y-3">
                      <div className="h-[1px] w-full bg-foreground/[0.08]" />
                      <div className="h-[1px] w-full bg-foreground/[0.08]" />
                      <div className="h-[1px] w-[80%] bg-foreground/[0.08]" />
                    </div>
                    <div className="mt-auto self-end">
                      <div className="h-1.5 w-10 bg-foreground/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Last Played */}
            <div className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/60">Apple Music</p>
                  <h3 className="text-lg font-bold tracking-tight">Last Played</h3>
                </div>
                <div className="flex items-center gap-4">
                  {/* Album art */}
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-foreground/[0.08] shadow-lg shrink-0 bg-gradient-to-br from-rose-500/20 via-purple-500/20 to-blue-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Music className="h-8 w-8 text-foreground/20" />
                    </div>
                  </div>
                  {/* Song info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-sm font-bold truncate leading-tight">Die With A Smile</p>
                    <p className="text-xs text-muted-foreground/60 truncate">Lady Gaga, Bruno Mars</p>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-end gap-[2px] h-3">
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '8px', animationDelay: '0s' }} />
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '12px', animationDelay: '0.15s' }} />
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '6px', animationDelay: '0.3s' }} />
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '10px', animationDelay: '0.45s' }} />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground/40">Playing now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

          </div>
        </section>

        <div className="mt-32">
          <FinalSection />
        </div>
      </main>
    </div>
  )
}
