"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface TimelineItemProps {
  date: string
  title: string
  company: string
  description: string
  isLast?: boolean
}

export function TimelineItem({ date, title, company, description, isLast }: TimelineItemProps) {
  return (
    <div className="relative flex gap-8 md:gap-12 group">
      {/* Timeline Indicator */}
      <div className="flex flex-col items-center">
        <div className="relative py-1">
          <div className="h-2.5 w-2.5 rounded-full bg-foreground z-10 relative" />
          <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-foreground/30 animate-ping mt-1" />
        </div>
        {!isLast && (
          <Separator orientation="vertical" className="flex-1 w-[1px] bg-border/40 my-2" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 space-y-4 flex-1">
        <Card className="border bg-card/30 backdrop-blur-sm shadow-none group-hover:bg-card/50 transition-colors border-dashed overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="space-y-1">
                <h3 className="font-bold text-lg uppercase tracking-tight group-hover:text-foreground transition-colors">
                  {title}
                </h3>
                <p className="text-muted-foreground font-semibold text-sm">
                  {company}
                </p>
              </div>
              <Badge variant="outline" className="font-mono font-bold text-[10px] uppercase tracking-wider py-1 px-2.5 h-fit w-fit whitespace-nowrap bg-background">
                {date}
              </Badge>
            </div>
            <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[600px]">
              {description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
