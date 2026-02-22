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
  ArrowRight,
  ExternalLink
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
      { name: "MacBook Air M2", detail: "13.6-inch", icon: Laptop },
      { name: "Lofree Flow", detail: "Low Profile", icon: Keyboard },
      { name: "Logitech G Pro", detail: "Wireless", icon: Mouse },
      { name: "ASUS ProArt", detail: "Color Accurate", icon: Monitor },
    ]
  },
  {
    title: "Development & Engineering",
    description: "Where the magic happens.",
    items: [
      { name: "VS Code", detail: "Main IDE", icon: Code2, logo: "visualstudiocode" },
      { name: "Warp", detail: "Terminal", icon: Terminal, logo: "warp" },
      { name: "TablePlus", detail: "DB Manager", icon: Database, logo: "tableplus" },
      { name: "Postman", detail: "API Testing", icon: Globe, logo: "postman" },
      { name: "Docker", detail: "Containers", icon: Box, logo: "docker" },
      { name: "Github", detail: "Source Control", icon: Github, logo: "github" },
      { name: "GitLab", detail: "Source Control", icon: GitGraph, logo: "gitlab" },
      { name: "Sourcetree", detail: "Git Client", icon: GitGraph, logo: "sourcetree" },
    ]
  },
  {
    title: "AI Ecosystem",
    description: "My intelligent co-thinkers.",
    items: [
      { name: "Antigravity", detail: "AI Assistant", icon: Sparkles },
      { name: "ChatGPT", detail: "GPT-4", icon: MessageSquare, logo: "openai" },
      { name: "Gemini", detail: "Google AI", icon: Cloud, logo: "googlegemini" },
      { name: "Claude", detail: "Anthropic", icon: Zap, logo: "anthropic" },
    ]
  },
  {
    title: "Design & Productivity",
    description: "Keeping things organized.",
    items: [
      { name: "Figma", detail: "UI Design", icon: Figma, logo: "figma" },
      { name: "1Password", detail: "Auth", icon: Lock, logo: "1password" },
      { name: "Notion", detail: "Workflow", icon: FileText, logo: "notion" },
      { name: "Raycast", detail: "Launcher", icon: Command, logo: "raycast" },
      { name: "Notes", detail: "Knowledge", icon: FileText, logo: "apple" },
    ]
  },
  {
    title: "Social & Mobile",
    description: "Staying connected.",
    items: [
      { name: "Line", detail: "Chat", icon: MessageSquare, logo: "line" },
      { name: "Discord", detail: "Community", icon: Hash, logo: "discord" },
      { name: "Xcode", detail: "iOS Dev", icon: Smartphone, logo: "xcode" },
    ]
  },
  {
    title: "Music & Focus",
    description: "Fueling the flow state.",
    items: [
      { name: "Apple Music", detail: "Music & Focus", icon: Music, logo: "applemusic" },
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

const hardwareDetails = {
  "MacBook Air M2": {
    title: "MacBook Air M2",
    subtitle: "13.6-inch",
    description: "My primary powerhouse for development and design.",
    image: "/projects/macbook-air-m2.png",
    link: "https://www.apple.com/macbook-air-m2/",
    specs: [
      { label: "Color", value: "Midnight" },
      { label: "Display", value: "Liquid Retina" },
      { label: "Memory", value: "16 GB RAM" },
      { label: "Storage", value: "245 GB SSD" },
    ]
  },
  "Lofree Flow": {
    title: "Lofree Flow",
    subtitle: "Low Profile",
    description: "The smoothest low-profile mechanical keyboard experience.",
    image: "/projects/lofree-flow.png",
    link: "https://www.lofree.co/products/lofree-flow-artistic-mechanical-keyboard",
    specs: [
      { label: "Switch", value: "Phantom (Tactile)" },
      { label: "Material", value: "Aluminum" },
      { label: "Mount", value: "Gasket Mount" },
      { label: "Keycaps", value: "PBT Dye-sub" },
    ]
  },
  "Logitech G Pro": {
    title: "Logitech G Pro",
    subtitle: "Wireless",
    description: "Iconic shape with pro-grade performance and accuracy.",
    image: "/projects/gpro-wireless.png",
    link: "https://www.logitechg.com/en-us/products/gaming-mice/pro-wireless-mouse.910-005270.html",
    specs: [
      { label: "Sensor", value: "HERO 25K" },
      { label: "Weight", value: "80 grams" },
      { label: "DPI", value: "100 - 25,600" },
      { label: "Battery", value: "Up to 60 hours" },
    ]
  },
  "ASUS ProArt": {
    title: "ASUS ProArt",
    subtitle: "Color Accurate",
    description: "Professional-grade monitor designed for creative workflows.",
    image: "/projects/asus-proart.png",
    link: "https://www.asus.com/displays-desktops/monitors/proart/filter?Series=ProArt",
    specs: [
      { label: "Resolution", value: "4K UHD" },
      { label: "Panel", value: "IPS" },
      { label: "Color Space", value: "100% sRGB" },
      { label: "Delta E", value: "< 2 Accuracy" },
    ]
  }
}

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

  const CategoryItem = ({ item }: { item: any }) => (
    <div className="group relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4 transition-all duration-300 hover:bg-card/60 hover:border-foreground/[0.12] hover:shadow-md hover:shadow-foreground/[0.02]">
      <div className="h-10 w-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.08] transition-colors overflow-hidden">
        {item.logo ? (
          <img 
            src={`https://cdn.simpleicons.org/${item.logo}`} 
            alt={item.name} 
            className="h-5 w-5 object-contain transition-all duration-300 group-hover:scale-110 grayscale group-hover:grayscale-0 active:scale-95"
          />
        ) : (
          <item.icon className="h-5 w-5 text-foreground/50 transition-colors group-hover:text-primary" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-bold text-foreground/90 truncate leading-tight transition-colors group-hover:text-foreground">{item.name}</p>
        <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{item.detail}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-8">
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
              {categories[0].items.map((item) => {
                const isHovered = hoveredItem === item.name || (!hoveredItem && item.name === "MacBook Air M2")
                const hasDetail = !!hardwareDetails[item.name as keyof typeof hardwareDetails]
                
                return (
                  <div 
                    key={item.name}
                    onClick={() => hasDetail && setHoveredItem(item.name)}
                    className={`group relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4 transition-all duration-300 hover:bg-card/60 hover:border-foreground/[0.12] hover:shadow-md hover:shadow-foreground/[0.02] w-full cursor-pointer ${isHovered ? "border-foreground/20 bg-card/60 shadow-md shadow-foreground/[0.02]" : ""}`}
                  >
                    <div className="h-10 w-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.08] transition-colors">
                      <item.icon className={`h-5 w-5 transition-colors ${isHovered ? "text-primary" : "text-foreground/50"}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-foreground/90 truncate leading-tight">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{item.detail}</p>
                    </div>
                    
                    {hasDetail && isHovered && (
                      <div className="ml-auto opacity-100 transition-all duration-300">
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
          <motion.div 
            key={hoveredItem}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-3 flex flex-col gap-6"
          >
            {(() => {
              const details = hardwareDetails[hoveredItem as keyof typeof hardwareDetails] || hardwareDetails["MacBook Air M2"]
              
              return (
                <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-8 min-h-[200px]">
                  <div className="shrink-0 md:max-w-[180px] pt-4 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold tracking-tight leading-tight">{details.title}</h3>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest leading-relaxed">{details.subtitle}</p>
                    </div>
                    
                    <div className="pb-2">
                      <a 
                        href={details.link}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors group/link"
                      >
                        Product Info
                        <ExternalLink className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    </div>
                  </div>

                  <div className="relative aspect-video flex-1 overflow-hidden">
                    <Image 
                      src={details.image}
                      alt={details.title}
                      fill 
                      className="object-contain"
                    />
                  </div>

                  <div className="space-y-4 shrink-0 md:max-w-[150px] pt-4 md:text-right">
                    {details.specs.map((spec) => (
                      <div key={spec.label} className="space-y-0.5">
                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{spec.label}</p>
                        <p className="text-[11px] font-bold">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </motion.div>

          {/* Row 2: Development & Design (2:2 Ratio) */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight uppercase">{categories[1].title}</h2>
              <p className="text-sm text-muted-foreground">{categories[1].description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories[1].items.map((item) => (
                <CategoryItem key={item.name} item={item} />
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
                <CategoryItem key={item.name} item={item} />
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
                <CategoryItem key={item.name} item={item} />
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
                <CategoryItem key={item.name} item={item} />
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
                <CategoryItem key={item.name} item={item} />
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
