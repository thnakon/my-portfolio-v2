"use client"

import Image from "next/image"
import { ArrowUpRight, ArrowRight, Info } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

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
    <Card className={`group overflow-hidden border bg-card/50 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-foreground/5 flex flex-col ${className}`}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <Image 
              src={image} 
              alt={title} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/80 opacity-60" />
          
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {isAI && (
              <Badge variant="default" className="bg-foreground text-background font-bold text-[10px] uppercase tracking-wider h-5">
                AI Driven
              </Badge>
            )}
            <div className="flex gap-1.5">
              {tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground text-[10px] items-center border-foreground/10 h-5">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background/20 backdrop-blur hover:bg-background/40">
                  <Info className="h-4 w-4 text-white" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Built with {tags.join(", ")}. Focused on performance and high-end user experience.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col gap-2">
        <h3 className="font-bold text-lg tracking-tight group-hover:text-foreground/80 transition-colors uppercase">{title}</h3>
        <p className="text-[14px] text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex items-center justify-between">
        <Button variant="link" className="p-0 h-auto text-foreground font-bold uppercase tracking-widest text-[11px] group-hover:gap-3 transition-all">
          Learn More <ArrowRight className="h-3.5 w-3.5" />
        </Button>
        <div className="h-8 w-8 rounded-full border flex items-center justify-center transition-all group-hover:bg-foreground group-hover:text-background translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
