"use client"

import * as React from "react"
import {
  ArrowRight,
  CornerDownLeft,
  FileText,
  Layout,
  Layers,
  Settings,
  ShieldAlert,
  Terminal,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative inline-flex h-9 w-full items-center justify-start rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 lg:w-64"
      >
        <Terminal className="mr-2 h-4 w-4 text-muted-foreground/50" />
        <span className="hidden lg:inline-flex text-muted-foreground/50">Search documentation...</span>
        <span className="inline-flex lg:hidden text-muted-foreground/50">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>
              <ArrowRight className="mr-2 h-4 w-4" />
              <span>Docs</span>
            </CommandItem>
            <CommandItem>
              <ArrowRight className="mr-2 h-4 w-4" />
              <span>Components</span>
            </CommandItem>
            <CommandItem>
              <ArrowRight className="mr-2 h-4 w-4" />
              <span>Examples</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Get Started">
            <CommandItem>
              <ArrowRight className="mr-2 h-4 w-4" />
              <span>ElevenLabs UI</span>
            </CommandItem>
            <CommandItem>
              <ArrowRight className="mr-2 h-4 w-4" />
              <span>Setup</span>
            </CommandItem>
            <CommandItem>
              <ArrowRight className="mr-2 h-4 w-4" />
              <span>Usage</span>
            </CommandItem>
            <CommandItem>
              <ArrowRight className="mr-2 h-4 w-4" />
              <span>Troubleshooting</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <div className="flex items-center justify-between border-t p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex h-5 items-center justify-center rounded border bg-muted px-1.5 font-mono font-medium">
              <CornerDownLeft className="h-3 w-3" />
            </div>
            <span>Go to Page</span>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}
