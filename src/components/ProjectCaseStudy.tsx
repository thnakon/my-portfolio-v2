"use client"

import Image from "next/image"
import { ArrowUpRight, ArrowRight, CheckCircle2, Bot, Zap, BarChart3, Heart, ShieldCheck, MousePointer2, Activity, Smartphone, Inbox, FoldVertical } from "lucide-react"
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
  longDescription: string
  image: string
  tags: string[]
  features: Feature[]
  isAI?: boolean
  index: number
}

export function ProjectCaseStudy({ 
  title, 
  description, 
  longDescription, 
  image, 
  tags, 
  features, 
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
        className={`absolute -top-7 ${isEven ? 'left-8' : 'right-8'} h-10 w-32 bg-card/60 backdrop-blur-xl border border-b-0 rounded-t-2xl z-0 transition-transform duration-500 group-hover/folder:-translate-y-1 flex items-center justify-center`}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          Project 0{index + 1}
        </span>
      </div>

      {/* Main Folder Shell */}
      <div className="relative z-10 bg-card/70 backdrop-blur-2xl border rounded-3xl overflow-hidden shadow-2xl shadow-foreground/5 transition-all duration-700 hover:bg-card/80">
        {/* Decorative Paper Layers Behind content */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent pointer-events-none" />
        
        <div className={`p-8 lg:p-12 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
          {/* Mockup Column */}
          <div className="w-full lg:w-1/2 group/mockup">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border bg-muted/20 shadow-xl transition-all duration-700 group-hover/mockup:scale-[1.01] group-hover/mockup:rotate-[0.5deg]">
              <Image 
                src={image} 
                alt={title} 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-700 grayscale-[0.2] group-hover/mockup:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/20 via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight uppercase leading-none">{title}</h3>
              </div>
              
              {description && (
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed font-medium">
                  {description}
                </p>
              )}

              <p className="text-muted-foreground/70 text-sm leading-relaxed">
                {longDescription}
              </p>
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
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40">Technical Stack</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-foreground/[0.03] text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05] text-[10px] items-center border-transparent transition-all py-1 px-3 rounded-xl font-mono uppercase">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-8 flex items-center gap-6">
              <Button size="lg" className="rounded-xl px-8 font-bold uppercase tracking-widest text-[11px] group transition-all hover:scale-[1.02] active:scale-[0.98]">
                View Full Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl border border-dashed border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02]">
                <ArrowUpRight className="h-5 w-5 opacity-40 group-hover:opacity-100" />
              </Button>
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
