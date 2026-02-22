"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Feature {
  text: string
  icon: string
}

interface ProjectCaseStudyProps {
  slug: string
  title: string
  description: string
  image: string
  hoverImage?: string
  stackImages?: string[]
  tags: string[]
  features: Feature[]
  githubUrl?: string
  isAI?: boolean
  index: number
}

export function ProjectCaseStudy({ 
  slug,
  title, 
  description, 
  image, 
  hoverImage,
  stackImages,
  tags, 
  features, 
  githubUrl,
  isAI, 
  index 
}: ProjectCaseStudyProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const displayStack = stackImages && stackImages.length > 0 
    ? [image, ...stackImages] 
    : hoverImage 
      ? [image, hoverImage] 
      : [image, image]; // Fallback to same image if only one

  return (
    <div 
      className="relative w-full pt-0 pb-4 h-full" 
      id={`project-card-${index}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Container: The "Folder" */}
      <div className="relative group/folder w-full h-[400px] flex items-end">
        
        {/* FOLDER BACK FLAP */}
        <div className="absolute inset-x-0 bottom-0 h-[85%] bg-card/40 backdrop-blur-xl border border-foreground/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }} />
          
          {/* Folder Tab */}
          <div className="absolute top-0 left-6 h-8 w-24 bg-card/60 border-x border-t border-foreground/10 rounded-t-xl -translate-y-full flex items-center justify-center">
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              PRJ-0{index + 1}
            </span>
          </div>
        </div>

        {/* THE "CONTENTS" (PROJECT PHOTOS Fanning Out) */}
        <div className="absolute inset-x-4 bottom-0 h-full z-10 pointer-events-none">
          <AnimatePresence>
            <div className="relative w-full h-full flex items-center justify-center p-4">
              
              {/* PHOTO 2 (Right/Back) */}
              <motion.div 
                className="absolute w-[85%] aspect-[4/3] rounded-xl overflow-hidden border border-foreground/10 shadow-lg pointer-events-auto bg-muted"
                initial={false}
                animate={{ 
                  y: isHovered ? -110 : 0,
                  x: isHovered ? 30 : 0,
                  rotate: isHovered ? 8 : 0,
                  scale: isHovered ? 1 : 0.95,
                  zIndex: isHovered ? 12 : 10
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Image 
                  src={displayStack[1] || displayStack[0]} 
                  alt={`${title} 2`}
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </motion.div>

              {/* PHOTO 1 (Left/Front) */}
              <motion.div 
                className="absolute w-[85%] aspect-[4/3] rounded-xl overflow-hidden border border-foreground/10 shadow-2xl pointer-events-auto bg-muted"
                initial={false}
                animate={{ 
                  y: isHovered ? -120 : 0,
                  x: isHovered ? -30 : 0,
                  rotate: isHovered ? -6 : 0,
                  scale: isHovered ? 1.02 : 1,
                  zIndex: isHovered ? 15 : 11
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Image 
                  src={displayStack[0]} 
                  alt={`${title} 1`}
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Stacked Papers Background Effect (Behind Photos) */}
              <div className="absolute inset-x-4 bottom-16 h-[70%] bg-background border border-foreground/5 rounded-xl shadow-md -rotate-2 opacity-50 -z-0" />
            </div>
          </AnimatePresence>
        </div>

        {/* FOLDER FRONT FLAP */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] z-20 bg-card/80 backdrop-blur-2xl border-t border-foreground/10 rounded-b-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.1)] flex items-center">
          <div className="w-full h-full p-5 flex flex-col justify-between relative overflow-hidden">
            {/* Background Number */}
            <span className="absolute -right-2 -bottom-4 text-7xl font-black text-foreground/[0.03] select-none pointer-events-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-foreground/20">#{String(index + 1).padStart(2, '0')}</span>
                  <Badge variant="outline" className="rounded-full px-2 py-0 border-foreground/10 text-[8px] uppercase font-bold tracking-widest text-muted-foreground/60">
                    {isAI ? "AI Powered" : "Web Development"}
                  </Badge>
                </div>
                {githubUrl && (
                  <Link href={githubUrl} target="_blank" className="text-muted-foreground/40 hover:text-foreground transition-colors">
                    <Github className="h-3 w-3" />
                  </Link>
                )}
              </div>
              <h3 className="text-lg font-bold tracking-tight uppercase line-clamp-1">{title}</h3>
              
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.slice(0, 4).map((tag) => {
                  const slugMap: Record<string, string> = {
                    "Next.js": "nextdotjs",
                    "React": "react",
                    "Tailwind CSS": "tailwindcss",
                    "Tailwind": "tailwindcss",
                    "TypeScript": "typescript",
                    "OpenAI": "openai",
                    "Supabase": "supabase",
                    "Laravel": "laravel",
                    "Vue.js 3": "vuedotjs",
                    "MySQL": "mysql",
                    "PHP": "php",
                    "Node.js": "nodedotjs",
                  };
                  const iconSlug = slugMap[tag];
                  return (
                    <div key={tag} className="flex items-center gap-1 bg-foreground/[0.03] border border-foreground/[0.05] px-2 py-0.5 rounded-md">
                      {iconSlug && (
                        <img 
                          src={`https://cdn.simpleicons.org/${iconSlug}`} 
                          alt={tag} 
                          className="h-2.5 w-2.5 opacity-60 dark:invert"
                        />
                      )}
                      <span className="text-[9px] font-medium text-muted-foreground/70">{tag}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 relative z-10">
              <Link href={`/work/${slug}`} className="w-full">
                <Button size="sm" className="w-full rounded-xl font-bold uppercase tracking-widest text-[9px] h-9 group shadow-xl">
                  View Case <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* BACKGROUND DECORATIVE PAPERS */}
        <div className="absolute inset-x-2 bottom-0 h-[82%] -z-10 translate-y-2 rounded-2xl border bg-card/20 border-foreground/5 transition-transform duration-700 group-hover/folder:translate-y-4" />
      </div>
    </div>
  )
}
