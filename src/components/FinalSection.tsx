"use client"

import { useRef, useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Dither from "@/components/Dither"
import confetti from "canvas-confetti"
import { useIntro } from "@/components/intro-context"

export function FinalSection() {
  const { isDone } = useIntro()
  const finalSectionRef = useRef<HTMLDivElement>(null)
  const [hasConfetti, setHasConfetti] = useState(false)

  useEffect(() => {
    if (!finalSectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasConfetti) {
          setHasConfetti(true)
          const duration = 2500
          const animationEnd = Date.now() + duration
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

          const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

          const interval: any = setInterval(function() {
            const timeLeft = animationEnd - Date.now()
            if (timeLeft <= 0) return clearInterval(interval)
            const particleCount = 50 * (timeLeft / duration)
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
          }, 250)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(finalSectionRef.current)
    return () => observer.disconnect()
  }, [hasConfetti])

  return (
    <section
      ref={finalSectionRef}
      className={`container mx-auto px-8 pb-32 transition-all duration-1000 ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="relative rounded-3xl border border-foreground/[0.06] overflow-hidden min-h-[400px] flex items-center justify-center">
        {/* Dither Background */}
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-40">
          <Dither
            waveColor={[1.0, 1.0, 1.0]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
        </div>
        {/* Radial overlay for text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background/90 via-background/60 to-transparent z-[1] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center py-16 px-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Thanks for visiting!
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              I appreciate you taking the time to explore my work. If you&apos;d like to leave a message, feel free to drop a note in the guestbook.
            </p>
          </div>

          <Button variant="outline" className="rounded-xl text-sm font-semibold gap-2 px-6 py-5 border-foreground/10 hover:bg-foreground/[0.04] backdrop-blur-md bg-background/50">
            <ArrowRight className="h-4 w-4" /> Leave a note
          </Button>

          {/* Site Meta */}
          <div className="flex items-center gap-6 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest pt-4">
            <span>v2.0</span>
            <span className="opacity-30">•</span>
            <span>Next.js + TypeScript</span>
            <span className="opacity-30">•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
