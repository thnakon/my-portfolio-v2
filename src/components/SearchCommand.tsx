"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  CornerDownLeft,
  FileText,
  Layout,
  Layers,
  Settings,
  ShieldAlert,
  Terminal,
  Github,
  Twitter,
  Linkedin,
  Search,
  BookOpen,
  Briefcase,
  User,
  Zap,
  Link as LinkIcon,
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
import { projects } from "@/data/projects"
import { blogs } from "@/data/blogs"

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

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

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative inline-flex h-9 w-full items-center justify-start rounded-xl border border-foreground/[0.08] bg-background/50 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-all hover:bg-muted hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring lg:w-64 group"
      >
        <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground/50 transition-colors group-hover:text-foreground/70" />
        <span className="hidden lg:inline-flex text-muted-foreground/40 text-[12px] font-medium tracking-tight">Search everything...</span>
        <span className="inline-flex lg:hidden text-muted-foreground/40 text-[12px] font-medium tracking-tight">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded-[6px] border bg-muted/50 px-1.5 font-mono text-[10px] font-bold opacity-100 sm:flex text-muted-foreground/60">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search projects, blogs, pages..." />
        <CommandList className="max-h-[450px]">
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Quick Access">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Layout className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/work"))}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Work</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>
              <User className="mr-2 h-4 w-4" />
              <span>About</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/blog"))}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Blog</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/write-to-me"))}>
              <Zap className="mr-2 h-4 w-4" />
              <span>Guestbook</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Projects">
            {projects.map((project) => (
              <CommandItem 
                key={project.slug}
                onSelect={() => runCommand(() => router.push(`/work/${project.slug}`))}
              >
                <Layers className="mr-2 h-4 w-4" />
                <span>{project.title}</span>
                <span className="ml-2 text-[10px] text-muted-foreground/40 uppercase tracking-widest font-bold">Project</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Blog Posts">
            {blogs.map((post) => (
              <CommandItem 
                key={post.slug}
                onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>{post.title}</span>
                <span className="ml-2 text-[10px] text-muted-foreground/40 uppercase tracking-widest font-bold">Blog</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Others">
            <CommandItem onSelect={() => runCommand(() => router.push("/ai-attitudes"))}>
              <Zap className="mr-2 h-4 w-4" />
              <span>AI Attitudes 2026</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/uses"))}>
              <Terminal className="mr-2 h-4 w-4" />
              <span>Uses / Gear</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/links"))}>
              <LinkIcon className="mr-2 h-4 w-4" />
              <span>Links / Socials Page</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Socials">
            <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/thnakon", "_blank"))}>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open("https://linkedin.com", "_blank"))}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open("https://twitter.com", "_blank"))}>
              <Twitter className="mr-2 h-4 w-4" />
              <span>Twitter / X</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <div className="flex items-center justify-between border-t p-3 bg-muted/20">
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground/60 font-medium uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <kbd className="rounded border bg-muted px-1.5 font-mono">↑↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="rounded border bg-muted px-1.5 font-mono">Enter</kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="rounded border bg-muted px-1.5 font-mono">Esc</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}
