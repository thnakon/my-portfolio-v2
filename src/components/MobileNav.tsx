"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Menu,
  User,
  Briefcase,
  FileText,
  Mail,
  Brain,
  Link2,
  Monitor,
  Info,
  ChevronRight,
  Layout,
  Layers,
  Zap,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Search,
  BookOpen,
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
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import { blogs } from "@/data/blogs"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden h-9 w-9"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
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
              <Brain className="mr-2 h-4 w-4" />
              <span>AI Attitudes 2026</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/uses"))}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>Uses / Gear</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/links"))}>
              <LinkIcon className="mr-2 h-4 w-4" />
              <span>Links / Socials Page</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/attribution"))}>
              <Info className="mr-2 h-4 w-4" />
              <span>Attribution</span>
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
            <span className="flex items-center gap-1.5">Search Everywhere</span>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}
