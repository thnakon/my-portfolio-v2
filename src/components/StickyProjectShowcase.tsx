"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ProjectCaseStudy } from "./ProjectCaseStudy"

interface Feature {
  text: string
  icon: string
}

interface Project {
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  features: Feature[]
  isAI?: boolean
}

interface StickyProjectShowcaseProps {
  projects: Project[]
}

function StickyCard({ 
  project, 
  index, 
  total,
  progress 
}: { 
  project: Project
  index: number
  total: number
  progress: any
}) {
  // Each card scales down slightly as later cards stack on top
  const scaleFrom = 1
  const scaleTo = 0.92

  // Calculate the scroll range for this card's scale animation
  // Card should start scaling when the NEXT card begins entering
  const startScale = (index + 1) / total
  const endScale = Math.min((index + 2) / total, 1)

  const scale = useTransform(
    progress,
    [startScale, endScale],
    // Last card doesn't scale down
    index === total - 1 ? [scaleFrom, scaleFrom] : [scaleFrom, scaleTo]
  )

  const opacity = useTransform(
    progress,
    [startScale, endScale],
    index === total - 1 ? [1, 1] : [1, 0.6]
  )

  return (
    <div 
      className="sticky top-14 w-full"
      style={{ zIndex: index + 1 }}
    >
      <motion.div 
        style={{ scale, opacity }}
        className="origin-top pb-6"
      >
        <ProjectCaseStudy
          {...project}
          index={index}
        />
      </motion.div>
    </div>
  )
}

export function StickyProjectShowcase({ projects }: StickyProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={containerRef} className="relative">
      {projects.map((project, index) => (
        <StickyCard
          key={index}
          project={project}
          index={index}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  )
}
