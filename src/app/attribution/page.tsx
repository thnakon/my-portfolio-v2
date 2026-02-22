"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { useIntro } from "@/components/intro-context"
import { FinalSection } from "@/components/FinalSection"
import { 
  Code2, 
  Palette, 
  Heart, 
  Terminal, 
  Globe, 
  Cpu, 
  Layers, 
  ArrowUpRight,
  ExternalLink,
  Github
} from "lucide-react"
import Link from "next/link"

const techStack = [
  { name: "Next.js 15", category: "Framework", icon: Globe, color: "text-blue-500", link: "https://nextjs.org" },
  { name: "React 19", category: "Library", icon: Cpu, color: "text-cyan-400", link: "https://reactjs.org" },
  { name: "Tailwind CSS 4", category: "Styling", icon: Palette, color: "text-sky-400", link: "https://tailwindcss.com" },
  { name: "Framer Motion", category: "Animation", icon: Layers, color: "text-purple-500", link: "https://framer.com/motion" },
  { name: "TypeScript", category: "Language", icon: Code2, color: "text-blue-600", link: "https://typescriptlang.org" },
  { name: "Lucide React", category: "Icons", icon: Heart, color: "text-pink-500", link: "https://lucide.dev" },
]

const inspirations = [
  {
    title: "ElevenLabs / SevenLabs",
    author: "Design Aesthetic",
    description: "The primary influence for the minimal, high-contrast, and developer-centric UI.",
    link: "https://elevenlabs.io"
  },
  {
    title: "Family.co",
    author: "Interaction Design",
    description: "Influenced the smooth transitions, card layouts, and premium feel of the interactions.",
    link: "https://family.co"
  }
]

const contributors = [
  { name: "Antigravity", role: "AI Coding Assistant", icon: Sparkles, detail: "Powered by Gemini 2.0 Flash" }
]

// Import Sparkles icon manually or use a standard lucide one
import { Sparkles } from "lucide-react"

export default function AttributionPage() {
  const { setDone, isDone } = useIntro()

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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
            <Terminal className="h-3 w-3" />
            Project DNA
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">Attribution</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            A journey of pixels, code, and design. This portfolio is built on the shoulders of giants and powered by the latest web technologies.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32"
        >
          {/* Tech Stack Section */}
          <div className="md:col-span-12 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight uppercase flex items-center gap-2">
                Tech Stack
                <div className="h-[1px] w-12 bg-border ml-2" />
              </h2>
              <p className="text-sm text-muted-foreground">The foundation of every interaction.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((tech) => (
                <Link 
                  key={tech.name} 
                  href={tech.link}
                  target="_blank"
                  className="group relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col gap-4 transition-all duration-300 hover:bg-card/60 hover:border-foreground/[0.12] hover:shadow-xl hover:shadow-foreground/[0.02] overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center group-hover:bg-foreground/[0.08] transition-colors ${tech.color}`}>
                      <tech.icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-md font-bold text-foreground/90">{tech.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{tech.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight uppercase flex items-center gap-2">
                Inspiration
                <div className="h-[1px] w-12 bg-border ml-2" />
              </h2>
              <p className="text-sm text-muted-foreground">Mentors of design and user experience.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {inspirations.map((item) => (
                <Link 
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  className="group relative rounded-2xl border border-foreground/[0.06] bg-card/10 backdrop-blur-sm p-6 transition-all duration-300 hover:border-foreground/[0.12] hover:bg-card/20"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <span className="text-[10px] bg-foreground/[0.05] border border-foreground/10 px-2 py-0.5 rounded text-muted-foreground font-bold uppercase tracking-wider">
                          {item.author}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                        {item.description}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* AI Assistance Section */}
          <div className="md:col-span-4 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight uppercase flex items-center gap-2">
                Co-Pilot
                <div className="h-[1px] w-12 bg-border ml-2" />
              </h2>
              <p className="text-sm text-muted-foreground">Built with artificial intelligence.</p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.02] p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold">Antigravity</h3>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Digital Architect</p>
                </div>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                This entire codebase and design system were iteratively developed through sophisticated pair-programming with the Antigravity AI agent.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Closing Quote/Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center space-y-6 pb-32"
        >
          <div className="h-px w-24 bg-border" />
          <p className="text-sm text-muted-foreground font-medium italic max-w-lg">
            "Design is not just what it looks like and feels like. Design is how it works."
          </p>
          <Link 
            href="https://github.com/thnakon/my-portfolio-v2"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-bold text-sm transition-transform hover:scale-105 active:scale-95"
          >
            <Github className="h-4 w-4" />
            Check the Source
          </Link>
        </motion.div>
      </div>

      {/* Final Section */}
      <div className={`transition-all duration-1000 delay-500 ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <FinalSection />
      </div>
    </div>
  )
}
