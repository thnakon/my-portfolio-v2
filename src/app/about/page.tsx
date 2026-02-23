"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { AboutSection } from "@/components/AboutSection"
import { FinalSection } from "@/components/FinalSection"
import { TimelineItem } from "@/components/TimelineItem"
import { useIntro } from "@/components/intro-context"
import Link from "next/link"
import { Laptop, Keyboard, Mouse, Monitor, ArrowRight, Music } from "lucide-react"
import { experiences } from "@/data/experiences"

export default function AboutPage() {
  const { isDone, setDone } = useIntro()

  // Timeline Scroll Logic
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Map progress to Y position (from top dot to bottom end)
  const dotY = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    // Trigger animations immediately for stand-alone pages
    setDone(true)
  }, [setDone])

  return (
    <div className="pt-32 pb-32">
      {/* About Section */}
      <section className="container mx-auto px-8 mb-32">
        <AboutSection />
      </section>

      {/* Experience Section */}
      <section 
        id="experience" 
        className={`container mx-auto px-8 pb-32 transition-all duration-1000 delay-[1200ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Experience</h2>
            <p className="text-muted-foreground text-sm font-medium">A timeline of my professional journey.</p>
          </div>
        </div>

        <div className="relative">
          {/* Global Vertical Line for the whole section */}
          <div className="absolute left-[3px] md:left-[224px] top-5 bottom-0 w-[1px] bg-border/40" />
          
          {/* Animated Scrolling Profile Image */}
          <motion.div 
            style={{ top: dotY }}
            className="absolute left-[-11px] md:left-[210px] h-7 w-7 rounded-full border-2 border-background overflow-hidden shadow-lg z-20 mt-1.5"
          >
            <Image 
              src="/profile-v3.jpg" 
              alt="Thanakon" 
              width={28} 
              height={28} 
              className="object-cover h-full w-full scale-125"
            />
          </motion.div>

          <div ref={timelineRef} className="space-y-4">
            {experiences.map((exp, index) => (
              <TimelineItem 
                key={index}
                {...exp}
                hideDot={true}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Bento Grid — Uses / Write to me / Last Played */}
      <section id="contact" className={`container mx-auto px-8 mt-32 pb-32 transition-all duration-1000 delay-[2000ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">

          {/* Uses */}
          <Link href="/uses" className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none transition-opacity group-hover:opacity-20" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-muted-foreground/60">Daily Setup</p>
                <h3 className="text-lg font-bold tracking-tight">Uses</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Laptop, name: 'MacBook Air M2', detail: '13-inch' },
                  { icon: Keyboard, name: 'Lofree Flow', detail: 'Low Profile' },
                  { icon: Mouse, name: 'Logitech G Pro', detail: 'Wireless' },
                  { icon: Monitor, name: 'ASUS ProArt', detail: 'Color Accurate' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-2.5 group/item">
                    <div className="h-8 w-8 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover/item:bg-foreground/[0.08] transition-colors">
                      <item.icon className="h-3.5 w-3.5 text-foreground/50" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-foreground/80 truncate leading-tight">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground/50 font-medium">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Arrow */}
            <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </Link>

          {/* Write to me */}
          <Link href="/write-to-me" className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-5">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-muted-foreground/60">Guestbook</p>
                <h3 className="text-lg font-bold tracking-tight">Write a note</h3>
              </div>
              {/* Visual Note Sheets */}
              <div className="relative h-28 w-full mt-4">
                <div className="absolute inset-0 bg-foreground/[0.03] border border-foreground/[0.05] rounded-xl rotate-[-4deg] translate-y-2 scale-95" />
                <div className="absolute inset-0 bg-card/40 backdrop-blur-sm border border-foreground/[0.08] rounded-xl rotate-[2deg] translate-y-1 scale-[0.98]" />
                <div className="absolute inset-0 bg-card/60 backdrop-blur-md border border-foreground/[0.1] rounded-xl flex flex-col p-5 gap-2 transition-transform duration-500 group-hover:rotate-[-1deg] group-hover:-translate-y-1">
                  <div className="h-1.5 w-1/2 bg-foreground/20 rounded-full mb-2" />
                  <div className="space-y-3">
                    <div className="h-[1px] w-full bg-foreground/[0.08]" />
                    <div className="h-[1px] w-full bg-foreground/[0.08]" />
                    <div className="h-[1px] w-[80%] bg-foreground/[0.08]" />
                  </div>
                  <div className="mt-auto self-end">
                    <div className="h-1.5 w-10 bg-foreground/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </Link>

          {/* Last Played */}
          <div className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-muted-foreground/60">Apple Music</p>
                <h3 className="text-lg font-bold tracking-tight">Last Played</h3>
              </div>
              <div className="flex items-center gap-4">
                {/* Album art */}
                <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-foreground/[0.08] shadow-lg shrink-0 bg-gradient-to-br from-rose-500/20 via-purple-500/20 to-blue-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Music className="h-8 w-8 text-foreground/20" />
                  </div>
                </div>
                {/* Song info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="text-sm font-bold truncate leading-tight">Die With A Smile</p>
                  <p className="text-xs text-muted-foreground/60 truncate">Lady Gaga, Bruno Mars</p>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-end gap-[2px] h-3">
                      <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '8px', animationDelay: '0s' }} />
                      <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '12px', animationDelay: '0.15s' }} />
                      <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '6px', animationDelay: '0.3s' }} />
                      <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '10px', animationDelay: '0.45s' }} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/40">Playing now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
            </div>
          </div>

        </div>
      </section>

      <FinalSection />
    </div>
  )
}
