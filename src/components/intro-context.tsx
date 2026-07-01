"use client"

import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"

import { usePathname } from "next/navigation"

interface IntroContextType {
  isDone: boolean
  setDone: (done: boolean) => void
}

const IntroContext = createContext<IntroContextType>({
  isDone: false,
  setDone: () => {},
})

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [isDone, setIsDone] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Off the home page there is no entrance sequence, so reveal immediately.
    if (pathname !== "/") {
      setIsDone(true)
      return
    }
    // On home for a returning visit (the entrance already played this session,
    // marked pre-paint by the blocking script in layout.tsx), reveal now.
    // On a first visit the <Preloader /> flips this as its curtain lifts, so the
    // content staggers in on the reveal.
    if (document.documentElement.classList.contains("intro-done")) {
      setIsDone(true)
    }
  }, [pathname])

  return (
    <IntroContext.Provider value={{ isDone, setDone: setIsDone }}>
      {children}
    </IntroContext.Provider>
  )
}

export const useIntro = () => useContext(IntroContext)
