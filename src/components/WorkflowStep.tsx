"use client"

import { LucideIcon } from "lucide-react"

interface WorkflowStepProps {
  number: string
  title: string
  description: string
  icon: LucideIcon
  isLast?: boolean
}

export function WorkflowStep({ number, title, description, icon: Icon, isLast }: WorkflowStepProps) {
  return (
    <div className="relative flex flex-col items-center flex-1 group">
      {/* Connector Line (Desktop) */}
      {!isLast && (
        <div className="absolute top-10 left-[60%] right-[-40%] h-[1px] bg-border hidden md:block" />
      )}
      
      {/* Icon & Number Container */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="h-20 w-20 rounded-2xl border bg-card flex items-center justify-center transition-all group-hover:bg-foreground group-hover:text-background group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-foreground/5 mb-6">
          <Icon className="h-8 w-8" />
        </div>
        <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-foreground text-background text-[11px] font-bold flex items-center justify-center border-2 border-background">
          {number}
        </span>
      </div>

      <div className="text-center max-w-[200px]">
        <h4 className="font-bold text-sm uppercase tracking-wider mb-2">{title}</h4>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Connector Line (Mobile) */}
      {!isLast && (
        <div className="h-12 w-[1px] bg-border my-6 md:hidden" />
      )}
    </div>
  )
}
