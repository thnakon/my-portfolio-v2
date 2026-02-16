"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const email = "thnakon.d@gmail.com"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy!", err)
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="lg" 
      className="rounded-xl px-6 font-semibold flex items-center gap-2 group transition-all"
      onClick={handleCopy}
    >
      <div className="relative h-4 w-4">
        <Check 
          className={`absolute inset-0 h-4 w-4 text-green-500 transition-all duration-300 ${
            copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`} 
        />
        <Copy 
          className={`absolute inset-0 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-all duration-300 ${
            copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`} 
        />
      </div>
      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
        {email}
      </span>
    </Button>
  )
}
