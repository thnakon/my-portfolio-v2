"use client"

import { Badge } from "@/components/ui/badge"

interface TimelineItemProps {
  date: string
  title: string
  company: string
  description: string
  isLast?: boolean
}

export function TimelineItem({ date, title, company, description, isLast }: TimelineItemProps) {
  return (
    <div className="group relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
      {/* Left: Date column */}
      <div className="flex md:flex-col md:items-end md:pt-5 gap-3 md:gap-2">
        <Badge
          variant="outline"
          className="font-mono font-bold text-[10px] uppercase tracking-wider py-1 px-2.5 h-fit w-fit whitespace-nowrap bg-background"
        >
          {date}
        </Badge>
      </div>

      {/* Right: Card */}
      <div className={`relative pl-6 md:pl-8 ${!isLast ? 'pb-10' : ''}`}>
        {/* Vertical connector line */}
        {!isLast && (
          <div className="absolute left-0 top-5 bottom-0 w-[1px] bg-border/40" />
        )}
        {/* Dot */}
        <div className="absolute left-[-4px] top-5 h-2.5 w-2.5 rounded-full bg-foreground ring-4 ring-background z-10" />

        {/* Content Card */}
        <div className="relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 transition-all duration-300 group-hover:bg-card/60 group-hover:border-foreground/[0.12] group-hover:shadow-md group-hover:shadow-foreground/[0.03]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
          <div className="relative space-y-2">
            <h3 className="font-bold text-base uppercase tracking-tight leading-snug">
              {title}
            </h3>
            <p className="text-muted-foreground font-semibold text-sm">{company}</p>
            <p className="text-muted-foreground/80 text-[13px] leading-relaxed pt-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
