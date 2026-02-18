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
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center py-12`}>
      {/* Mockup Column */}
      <div className="w-full lg:w-1/2 group">
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border bg-muted/20 shadow-2xl shadow-foreground/5 transition-transform duration-700 group-hover:scale-[1.02]">
          <Image 
            src={image} 
            alt={title} 
            fill 
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-all duration-700 grayscale-[0.2] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/20 via-transparent to-transparent opacity-60" />
        </div>
      </div>

      {/* Content Column */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight uppercase">{title}</h3>
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
                <div key={i} className="flex items-start gap-3 group/item">
                  <div className="h-6 w-6 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/10 transition-colors">
                    <Icon className="h-3.5 w-3.5 text-primary/70" />
                  </div>
                  <span className="text-sm text-foreground/80 leading-snug pt-0.5">{feature.text}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Tech Chips */}
        <div className="space-y-3 pt-6 border-t border-dashed">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">Technologies utilized</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted/50 text-foreground/70 hover:text-foreground text-[10px] items-center border-transparent transition-colors py-1 px-3 rounded-full font-mono uppercase">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-8 flex items-center gap-6">
          <Button size="lg" className="rounded-xl px-8 font-bold uppercase tracking-widest text-[11px] group transition-all">
            Open Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-dashed">
            <ArrowUpRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
