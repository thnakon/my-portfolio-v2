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
  stackImages?: string[]
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
  stackImages,
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
            <div className="relative pt-12 px-4 pb-0 lg:pt-16 lg:px-8 lg:pb-0 rounded-[2.2rem] lg:rounded-[2.5rem] bg-foreground/[0.02] border border-foreground/[0.05] overflow-hidden transition-all duration-700 group-hover/mockup:bg-foreground/[0.04]">
              {/* Animated glow background inside frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground/[0.02] via-transparent to-foreground/[0.02] opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-700" />
              
              {/* Top Text Content inside Frame */}
              <div className="relative mb-6 lg:mb-10 flex flex-col lg:flex-row lg:items-end gap-2 lg:gap-4 pr-12">
                <h4 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground transition-all duration-700 group-hover/mockup:translate-x-1">
                  {title}
                </h4>
                <div className="hidden lg:block h-4 w-[1px] bg-foreground/10 mb-1.5" />
                <p className="text-[10px] lg:text-xs font-medium text-muted-foreground/50 line-clamp-2 max-w-[280px] lg:mb-1">
                  {description}
                </p>
                <div className="absolute top-0 right-0 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center grayscale opacity-20 group-hover/mockup:opacity-100 group-hover/mockup:grayscale-0 transition-all duration-700">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              {/* Stacked Perspective Mockup */}
              <div className="relative aspect-[16/10] w-full">
                {/* Visual Stack Logic (Handles 2 or 3 images) */}
                {(() => {
                  const displayStack = stackImages && stackImages.length > 0 
                    ? [image, ...stackImages] 
                    : hoverImage 
                      ? [image, hoverImage] 
                      : [image];
                  
                  return displayStack.map((imgSrc, i) => {
                    const isLast = i === displayStack.length - 1;
                    const isFirst = i === 0;
                    
                    // Style logic for each card in the stack
                    return (
                      <div 
                        key={i}
                        className={`absolute inset-0 transition-all duration-700 ease-out overflow-hidden rounded-xl lg:rounded-2xl border border-foreground/10 bg-muted/20
                          ${isFirst 
                            ? 'z-20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover/mockup:-translate-x-1/2 group-hover/mockup:-rotate-6 group-hover/mockup:scale-75 group-hover/mockup:opacity-30 group-hover/mockup:z-10' 
                            : ''
                          }
                          ${!isFirst && i === 1
                            ? 'z-10 translate-x-12 translate-y-8 rotate-3 scale-95 opacity-40 group-hover/mockup:translate-x-0 group-hover/mockup:translate-y-0 group-hover/mockup:rotate-0 group-hover/mockup:scale-100 group-hover/mockup:opacity-100 group-hover/mockup:z-30 shadow-2xl' 
                            : ''
                          }
                          ${i === 2
                            ? 'z-0 translate-x-24 translate-y-16 rotate-6 scale-90 opacity-20 group-hover/mockup:translate-x-8 group-hover/mockup:translate-y-6 group-hover/mockup:rotate-3 group-hover/mockup:scale-95 group-hover/mockup:opacity-60 group-hover/mockup:z-20 shadow-xl' 
                            : ''
                          }
                        `}
                      >
                        <Image 
                          src={imgSrc} 
                          alt={`${title} view ${i + 1}`}
                          fill 
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                        {isFirst && <div className="absolute -inset-x-2 -inset-y-6 bg-gradient-to-tr from-background/20 via-transparent to-transparent opacity-60 pointer-events-none" />}
                      </div>
                    );
                  });
                })()}

                {/* Hover indicator pill */}
                { (hoverImage || (stackImages && stackImages.length > 0)) && (
                  <div className="absolute -bottom-6 right-8 z-40 flex items-center gap-1.5 bg-background/70 backdrop-blur-sm px-2.5 py-1 rounded-full opacity-0 group-hover/mockup:opacity-100 transition-all duration-500 delay-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/60">Hover to Stack View</span>
                  </div>
                )}
              </div>
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
                    "HTML5": "html5",
                    "CSS3": "css3",
                    "JavaScript": "javascript",
                  };
                  const iconSlug = slug[tag];
                  return (
                    <Badge key={tag} variant="secondary" className="bg-foreground/[0.03] text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06] text-[11px] items-center gap-1.5 border-transparent transition-all py-1.5 px-3 rounded-xl font-medium">
                      {iconSlug && (
                        <img
                          src={`https://cdn.simpleicons.org/${iconSlug}`}
                          alt={tag}
                          className="h-3 w-3 shrink-0 opacity-70 group-hover:opacity-100 dark:brightness-0 dark:invert transition-all"
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
