"use client"

import { useIntro } from "./intro-context"

export function SidebarLabel() {
  const { isDone } = useIntro()

  return (
    <div className={`fixed inset-0 pointer-events-none z-40 hidden xl:block transition-all duration-1000 delay-500 ${isDone ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
      <div className="max-w-[1600px] mx-auto h-full px-8 relative">
        <div className="absolute left-8 top-0 bottom-0 flex flex-col items-center justify-between py-24 w-8">
          {/* Top Text */}
          <div className="flex items-center gap-4 origin-center">
            <span 
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/40 whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Developer with AI.
            </span>
          </div>

          {/* Middle Line */}
          <div className="flex-1 w-[1px] bg-border/40 my-12" />

          {/* Bottom Text */}
          <div className="flex items-center gap-4 origin-center">
            <span 
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/40 whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              2026
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
