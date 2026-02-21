"use client"

import { useEffect } from "react"
import { AboutSection } from "@/components/AboutSection"
import { FinalSection } from "@/components/FinalSection"
import { useIntro } from "@/components/intro-context"

export default function AboutPage() {
  const { isDone, setDone } = useIntro()

  useEffect(() => {
    // Trigger animations immediately for stand-alone pages
    setDone(true)
  }, [setDone])

  return (
    <div className={`pt-32 pb-32 transition-all duration-1000 ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <section className="container mx-auto px-8 mb-32">
        <AboutSection />
      </section>
      <FinalSection />
    </div>
  )
}
