"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowRight, CheckCircle2, Bot, Zap, BarChart3, Heart, ShieldCheck, MousePointer2, Activity, Smartphone, Inbox, FoldVertical, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const iconMap: Record<string, any> = {
  Zap,
  Bot,
  BarChart3,
  Heart,
  ShieldCheck,
  MousePointer2,
  Activity,
  Smartphone,
  Inbox,
  FoldVertical
}

interface Feature {
  text: string
  icon: string
}

interface ProjectCaseStudyProps {
  title: string
  description: string
  image: string
  hoverImage?: string
  tags: string[]
  features: Feature[]
  githubUrl?: string
  isAI?: boolean
  index: number
}

export function ProjectCaseStudy({ 
  title, 
  description, 
  image, 
  hoverImage,
  tags, 
  features, 
  githubUrl,
  isAI, 
  index 
}: ProjectCaseStudyProps) {
  const isEven = index % 2 === 0

  return (
    <div className="relative group/folder w-full" id={`project-card-${index}`}>
      <style suppressHydrationWarning>{`
        @media (min-width: 768px) {
          #project-card-${index} {
            position: sticky;
            top: calc(6rem + ${index * 2.5}rem);
          }
        }
      `}</style>
      {/* Folder Tab */}
      <div 
        className={`absolute -top-7 left-8 h-10 w-32 bg-card/60 backdrop-blur-xl border border-b-0 rounded-t-2xl z-0 transition-transform duration-500 group-hover/folder:-translate-y-1 flex items-center justify-center`}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          Project 0{index + 1}
        </span>
      </div>

      {/* Main Folder Shell */}
      <div className="relative z-10 bg-card/70 backdrop-blur-2xl border rounded-3xl overflow-hidden shadow-2xl shadow-foreground/5 transition-all duration-700 hover:bg-card/80">
        {/* Decorative Paper Layers Behind content */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent pointer-events-none" />
        
        <div className={`p-8 lg:p-12 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center`}>
          {/* Mockup Column */}
          <div className="w-full lg:w-[60%] group/mockup">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border bg-muted/20 shadow-xl transition-all duration-700 group-hover/mockup:scale-[1.01] group-hover/mockup:rotate-[0.5deg]">
              {/* Primary Image */}
              <Image 
                src={image} 
                alt={title} 
                fill 
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={`object-cover transition-all duration-700 grayscale-[0.2] ${
                  hoverImage 
                    ? 'group-hover/mockup:opacity-0 group-hover/mockup:scale-105' 
                    : 'group-hover/mockup:grayscale-0'
                }`}
              />
              {/* Hover Image (cross-fades in) */}
              {hoverImage && (
                <Image 
                  src={hoverImage} 
                  alt={`${title} – alternate view`}
                  fill 
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-700 opacity-0 scale-105 group-hover/mockup:opacity-100 group-hover/mockup:scale-100"
                />
              )}
              <div className="absolute -inset-x-2 -inset-y-6 bg-gradient-to-tr from-background/20 via-transparent to-transparent opacity-60" />
              {/* Hover indicator pill */}
              {hoverImage && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-background/70 backdrop-blur-sm px-2.5 py-1 rounded-full opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/60">Alt View</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-[40%] space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight uppercase leading-none">{title}</h3>
              </div>
              
              {description && (
                <p className="text-muted-foreground/70 text-sm lg:text-base leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {/* Feature Bullets */}
            {features.length > 0 && (
              <div className="flex flex-col gap-4 pt-4">
                {features.map((feature, i) => {
                  const Icon = iconMap[feature.icon] || CheckCircle2
                  return (
                    <div key={i} className="flex items-start gap-4 group/item">
                      <div className="h-7 w-7 rounded-xl bg-foreground/[0.03] border border-foreground/[0.05] flex items-center justify-center shrink-0 group-hover/item:bg-foreground/[0.07] transition-all duration-300">
                        <Icon className="h-3.5 w-3.5 text-foreground/60" />
                      </div>
                      <span className="text-sm text-muted-foreground/90 leading-snug pt-1 group-hover/item:text-foreground transition-colors">{feature.text}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Tech Chips */}
            <div className="space-y-3 pt-6 border-t border-dashed border-foreground/10">
              <p className="text-[10px] tracking-[0.2em] font-bold text-muted-foreground/40">Technical Stack</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const slug: Record<string, string> = {
                    "Next.js": "nextdotjs",
                    "React": "react",
                    "Tailwind CSS": "tailwindcss",
                    "Tailwind": "tailwindcss",
                    "TypeScript": "typescript",
                    "OpenAI": "openai",
                    "Vercel AI SDK": "vercel",
                    "AppScript": "google",
                    "Supabase": "supabase",
                    "GSAP": "greensock",
                    "Framer Motion": "framer",
                    "Node.js": "nodedotjs",
                    "Laravel": "laravel",
                    "Laravel 11": "laravel",
                    "Vue.js 3": "vuedotjs",
                    "MySQL": "mysql",
                    "Docker": "docker",
                    "GitHub": "github",
                    "Figma": "figma",
                    "PHP": "php",
                    "Python": "python",
                  };
                  const iconSlug = slug[tag];
                  return (
                    <Badge key={tag} variant="secondary" className="bg-foreground/[0.03] text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06] text-[11px] items-center gap-1.5 border-transparent transition-all py-1.5 px-3 rounded-xl font-medium">
                      {iconSlug && (
                        <img
                          src={`https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${iconSlug}.svg`}
                          alt={tag}
                          className="h-3 w-3 shrink-0 opacity-50 dark:invert"
                          style={{ filter: 'brightness(0)' }}
                        />
                      )}
                      {tag}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <Button size="lg" className="rounded-xl px-8 font-bold uppercase tracking-widest text-[11px] group transition-all hover:scale-[1.02] active:scale-[0.98]">
                View Full Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              {githubUrl && (
                <Link href={githubUrl} target="_blank">
                  <Button variant="ghost" className="h-12 px-6 rounded-xl border border-dashed border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] flex items-center gap-2.5 group/code transition-all">
                    <Github className="h-4 w-4 opacity-40 group-hover/code:opacity-100 group-hover/code:scale-110 transition-all" />
                    <span className="text-[11px] font-bold uppercase tracking-widest opacity-40 group-hover/code:opacity-100 transition-all">View Code</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Stacked Papers (Aesthetic behind) */}
      <div className={`absolute inset-0 -z-10 translate-x-2 translate-y-2 rounded-3xl border bg-background/50 border-foreground/[0.05] transition-transform duration-700 group-hover/folder:translate-x-4 group-hover/folder:translate-y-4`} />
      <div className={`absolute inset-0 -z-20 translate-x-4 translate-y-4 rounded-3xl border bg-background/30 border-foreground/[0.02] transition-transform duration-700 group-hover/folder:translate-x-8 group-hover/folder:translate-y-8`} />
    </div>
  )
}
