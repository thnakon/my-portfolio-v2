"use client"

import React from "react"
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

export function StickyProjectShowcase({ projects }: StickyProjectShowcaseProps) {
  return (
    <div className="flex flex-col w-full relative">
      {projects.map((project, index) => (
        <div 
          key={index}
          className="sticky top-24 w-full mb-12 last:mb-0"
          style={{ 
            zIndex: index + 1,
            paddingTop: `${index * 32}px` 
          }}
        >
          <div className="relative transform-gpu transition-all duration-500">
             <ProjectCaseStudy 
              index={index}
              {...project}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
