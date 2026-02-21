"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { AboutSection } from "@/components/AboutSection"
import { FinalSection } from "@/components/FinalSection"
import { TimelineItem } from "@/components/TimelineItem"
import { useIntro } from "@/components/intro-context"
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

      <FinalSection />
    </div>
  )
}
