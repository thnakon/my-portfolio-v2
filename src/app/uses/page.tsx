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
  Command
} from "lucide-react"
import { useIntro } from "@/components/intro-context"
import { FinalSection } from "@/components/FinalSection"

const categories = [
  {
    title: "Hardware",
    description: "The tools I touch every day.",
    items: [
      { name: "MacBook Air M2", detail: "13-inch", icon: Laptop },
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

        {/* Categories Grid - Two Explicit Columns */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 items-start mb-32"
        >
          {/* Left Column */}
          <div className="space-y-16">
            {leftCategories.map((category) => (
              <motion.div key={category.title} variants={itemVariants} className="space-y-8">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold tracking-tight uppercase">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>

                <div className={category.title === "Hardware" ? "flex flex-col gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                  {category.items.map((item) => (
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
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {/* Spacer to leave space next to Hardware */}
            <div className="hidden md:block h-[120px] lg:h-[150px]" />
            
            {rightCategories.map((category) => (
              <motion.div key={category.title} variants={itemVariants} className="space-y-8">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold tracking-tight uppercase">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>

                <div className={category.title === "Hardware" ? "flex flex-col gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                  {category.items.map((item) => (
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
            ))}
          </div>
        </motion.div>
      </div>

      {/* Final Section */}
      <div className={`transition-all duration-1000 delay-500 ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <FinalSection />
      </div>
    </div>
  )
}
