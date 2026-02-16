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
  ChevronRight
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

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const onSelect = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search navigation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => onSelect("/about")}>
              <User className="mr-2 h-4 w-4" />
              <span>About</span>
            </CommandItem>
            <CommandItem onSelect={() => onSelect("/work")}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Work</span>
            </CommandItem>
            <CommandItem onSelect={() => onSelect("/blog")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Blog</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="More">
            <CommandItem onSelect={() => onSelect("/contact")}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Write to me</span>
              <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground/50" />
            </CommandItem>
            <CommandItem onSelect={() => onSelect("/ai-attitudes")}>
              <Brain className="mr-2 h-4 w-4" />
              <span>Attitudes AI</span>
              <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground/50" />
            </CommandItem>
            <CommandItem onSelect={() => onSelect("/links")}>
              <Link2 className="mr-2 h-4 w-4" />
              <span>Links</span>
              <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground/50" />
            </CommandItem>
            <CommandItem onSelect={() => onSelect("/uses")}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>Uses</span>
              <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground/50" />
            </CommandItem>
            <CommandItem onSelect={() => onSelect("/attribution")}>
              <Info className="mr-2 h-4 w-4" />
              <span>Attribution</span>
              <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground/50" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
