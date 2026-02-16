"use client"

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
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-foreground z-10 relative" />
          <div className="absolute inset-0 h-3 w-3 rounded-full bg-foreground/40 animate-ping" />
        </div>
        {!isLast && (
          <div className="flex-1 w-[1px] bg-border my-2 border-dashed border-l-[1px]" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 space-y-2 flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
          <div className="space-y-1">
            <h3 className="font-bold text-lg uppercase tracking-tight group-hover:text-foreground/80 transition-colors">
              {title}
            </h3>
            <p className="text-foreground/70 font-semibold text-sm">
              {company}
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded uppercase tracking-wider h-fit w-fit">
            {date}
          </span>
        </div>
        <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[600px]">
          {description}
        </p>
      </div>
    </div>
  )
}
