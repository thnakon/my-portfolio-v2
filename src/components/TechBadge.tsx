"use client"

interface TechBadgeProps {
  name: string
  className?: string
}

export function TechBadge({ name, className = "" }: TechBadgeProps) {
  return (
    <div className={`px-4 py-2 rounded-xl border bg-card/50 backdrop-blur-sm text-[13px] font-mono font-medium text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground hover:scale-[1.02] cursor-default flex items-center justify-center ${className}`}>
      {name}
    </div>
  )
}
