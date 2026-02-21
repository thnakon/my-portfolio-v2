"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Laptop, 
  Keyboard, 
  Mouse, 
  Monitor, 
  Zap, 
  Code2, 
  Terminal, 
  Database, 
  Globe, 
  Box, 
  Github, 
  Figma, 
  Lock, 
  MessageSquare, 
  FileText, 
  Smartphone, 
  Music, 
  Cloud, 
  Coffee,
  Search,
  Hash,
  GitGraph,
  Sparkles,
  Command,
  ArrowRight
} from "lucide-react"
import { useIntro } from "@/components/intro-context"
import { FinalSection } from "@/components/FinalSection"
import { useState } from "react"
import Image from "next/image"

const categories = [
  {
    title: "Hardware",
    description: "The tools I touch every day.",
    items: [
      { name: "MacBook Air M2", detail: "M2 Chip • 8-Core CPU • 10-core GPU", icon: Laptop },
      { name: "Lofree Flow", detail: "Low Profile", icon: Keyboard },
      { name: "Logitech G Pro", detail: "Wireless", icon: Mouse },
      { name: "ASUS ProArt", detail: "Color Accurate", icon: Monitor },
    ]
  },
  {
    title: "Development & Engineering",
    description: "Where the magic happens.",
    items: [
      { name: "VS Code", detail: "Main IDE", icon: Code2 },
      { name: "Warp", detail: "Terminal", icon: Terminal },
      { name: "TablePlus", detail: "DB Manager", icon: Database },
      { name: "Postman", detail: "API Testing", icon: Globe },
      { name: "Docker", detail: "Containers", icon: Box },
      { name: "Github", detail: "Source Control", icon: Github },
      { name: "GitLab", detail: "Source Control", icon: GitGraph },
      { name: "Sourcetree", detail: "Git Client", icon: GitGraph },
    ]
  },
  {
    title: "AI Ecosystem",
    description: "My intelligent co-thinkers.",
    items: [
      { name: "Antigravity", detail: "AI Assistant", icon: Sparkles },
      { name: "ChatGPT", detail: "GPT-4", icon: MessageSquare },
      { name: "Gemini", detail: "Google AI", icon: Cloud },
      { name: "Claude", detail: "Anthropic", icon: Zap },
    ]
  },
  {
    title: "Design & Productivity",
    description: "Keeping things organized.",
    items: [
      { name: "Figma", detail: "UI Design", icon: Figma },
      { name: "1Password", detail: "Auth", icon: Lock },
      { name: "Notion", detail: "Workflow", icon: FileText },
      { name: "Raycast", detail: "Launcher", icon: Command },
      { name: "Notes", detail: "Knowledge", icon: FileText },
    ]
  },
  {
    title: "Social & Mobile",
    description: "Staying connected.",
    items: [
      { name: "Line", detail: "Chat", icon: MessageSquare },
      { name: "Discord", detail: "Community", icon: Hash },
      { name: "Xcode", detail: "iOS Dev", icon: Smartphone },
    ]
  },
  {
    title: "Music & Focus",
    description: "Fueling the flow state.",
    items: [
      { name: "Apple Music", detail: "Music & Focus", icon: Music },
    ]
  }
]

const leftCategories = [
  categories[0], // Hardware
  categories[1], // Development & Engineering
  categories[2], // AI Ecosystem
  categories[4], // Social & Mobile
]

const rightCategories = [
  categories[3], // Design & Productivity
  categories[5], // Music & Focus
]

export default function UsesPage() {
  const { isDone, setDone } = useIntro()
  const [hoveredItem, setHoveredItem] = useState<string | null>("MacBook Air M2")

  useEffect(() => {
    setDone(true)
  }, [setDone])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-8 max-w-[1200px]">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">Uses</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            A curated list of my daily setup, software preferences, and the AI-driven tools that power my workflow.
          </p>
        </motion.div>

        {/* Categories Grid - Unified for perfect alignment */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-x-16 gap-y-24 items-start mb-32"
        >
          {/* Row 1: Hardware | Preview (1:3 Ratio) */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight uppercase">{categories[0].title}</h2>
              <p className="text-sm text-muted-foreground">{categories[0].description}</p>
            </div>
            <div className="flex flex-col gap-4">
              {categories[0].items.map((item) => (
                <div 
                  key={item.name}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                  className={`group relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4 transition-all duration-300 hover:bg-card/60 hover:border-foreground/[0.12] hover:shadow-md hover:shadow-foreground/[0.02] w-full ${item.name === "MacBook Air M2" ? "border-foreground/20 bg-card/60 shadow-md shadow-foreground/[0.02]" : ""}`}
                >
                  <div className="h-10 w-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.08] transition-colors">
                    <item.icon className="h-5 w-5 text-foreground/50" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground/90 truncate leading-tight">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{item.detail}</p>
                  </div>
                  
                  {item.name === "MacBook Air M2" && (
                    <div className="ml-auto opacity-100 transition-all duration-300">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: hoveredItem === "MacBook Air M2" ? 1 : 0,
              x: hoveredItem === "MacBook Air M2" ? 0 : 20
            }}
            className="md:col-span-3 flex flex-col gap-6"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
              <div className="space-y-1 shrink-0 md:max-w-[180px] pt-4">
                <h3 className="text-2xl font-bold tracking-tight leading-tight">MacBook Air M2</h3>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest leading-relaxed">M2 Chip • 8-Core CPU • 10-core GPU</p>
              </div>

              <div className="relative aspect-video flex-1 overflow-hidden">
                <Image 
                  src="/projects/macbook-air-m2.png" 
                  alt="MacBook Air M2" 
                  fill 
                  className="object-contain"
                />
              </div>

              <div className="space-y-4 shrink-0 md:max-w-[150px] pt-4 md:text-right">
                <div className="space-y-0.5">
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Color</p>
                  <p className="text-[11px] font-bold">Midnight</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Display</p>
                  <p className="text-[11px] font-bold">Liquid Retina</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Memory</p>
                  <p className="text-[11px] font-bold">16 GB RAM</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Storage</p>
                  <p className="text-[11px] font-bold">245 GB SSD</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                My primary powerhouse for development and design. The M2 chip provides exceptional performance for multi-tasking and compiling, all while maintaining perfect silence in a thin, light form factor.
              </p>
            </div>
          </motion.div>

          {/* Row 2: Development & Design (2:2 Ratio) */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight uppercase">{categories[1].title}</h2>
              <p className="text-sm text-muted-foreground">{categories[1].description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories[1].items.map((item) => (
                <div 
                  key={item.name}
                  className="group relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4 transition-all duration-300 hover:bg-card/60 hover:border-foreground/[0.12] hover:shadow-md hover:shadow-foreground/[0.02]"
                >
                  <div className="h-10 w-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.08] transition-colors">
                    <item.icon className="h-5 w-5 text-foreground/50" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground/90 truncate leading-tight">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight uppercase">{categories[3].title}</h2>
              <p className="text-sm text-muted-foreground">{categories[3].description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories[3].items.map((item) => (
                <div 
                  key={item.name}
                  className="group relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4 transition-all duration-300 hover:bg-card/60 hover:border-foreground/[0.12] hover:shadow-md hover:shadow-foreground/[0.02]"
                >
                  <div className="h-10 w-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.08] transition-colors">
                    <item.icon className="h-5 w-5 text-foreground/50" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground/90 truncate leading-tight">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 3: AI Ecosystem | Music (2:2 Ratio) */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight uppercase">{categories[2].title}</h2>
              <p className="text-sm text-muted-foreground">{categories[2].description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories[2].items.map((item) => (
                <div 
                  key={item.name}
                  className="group relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4 transition-all duration-300 hover:bg-card/60 hover:border-foreground/[0.12] hover:shadow-md hover:shadow-foreground/[0.02]"
                >
                  <div className="h-10 w-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.08] transition-colors">
                    <item.icon className="h-5 w-5 text-foreground/50" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground/90 truncate leading-tight">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight uppercase">{categories[5].title}</h2>
              <p className="text-sm text-muted-foreground">{categories[5].description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories[5].items.map((item) => (
                <div 
                  key={item.name}
                  className="group relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4 transition-all duration-300 hover:bg-card/60 hover:border-foreground/[0.12] hover:shadow-md hover:shadow-foreground/[0.02]"
                >
                  <div className="h-10 w-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.08] transition-colors">
                    <item.icon className="h-5 w-5 text-foreground/50" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground/90 truncate leading-tight">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 4: Social & Mobile | Empty */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight uppercase">{categories[4].title}</h2>
              <p className="text-sm text-muted-foreground">{categories[4].description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories[4].items.map((item) => (
                <div 
                  key={item.name}
                  className="group relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4 transition-all duration-300 hover:bg-card/60 hover:border-foreground/[0.12] hover:shadow-md hover:shadow-foreground/[0.02]"
                >
                  <div className="h-10 w-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.08] transition-colors">
                    <item.icon className="h-5 w-5 text-foreground/50" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground/90 truncate leading-tight">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Final Section */}
      <div className={`transition-all duration-1000 delay-500 ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <FinalSection />
      </div>
    </div>
  )
}
