"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  isAI?: boolean
  className?: string
}

export function ProjectCard({ title, description, image, tags, isAI, className = "" }: ProjectCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-2xl hover:shadow-foreground/5 ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
        
        {/* badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {isAI && (
            <span className="px-2.5 py-1 rounded-full bg-foreground text-background text-[10px] font-bold uppercase tracking-wider">
              AI Driven
            </span>
          )}
          {tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground text-[10px] font-medium border border-foreground/10">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg tracking-tight group-hover:text-foreground/80 transition-colors uppercase">{title}</h3>
          <div className="h-8 w-8 rounded-full border flex items-center justify-center transition-all group-hover:bg-foreground group-hover:text-background translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <p className="text-[14px] text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  )
}
