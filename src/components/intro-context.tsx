"use client"

import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"

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

  return (
    <IntroContext.Provider value={{ isDone, setDone: setIsDone }}>
      {children}
    </IntroContext.Provider>
  )
}

export const useIntro = () => useContext(IntroContext)
