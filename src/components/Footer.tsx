"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react"
import { useIntro } from "@/components/intro-context"

export function Footer() {
  const { isDone } = useIntro()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-1000 delay-[2000ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="container mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-12 items-start">
          
          {/* Copyright & Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="/favicon.png" alt="Logo" width={24} height={24} className="h-full w-full object-cover" />
              </div>
              <span className="font-bold tracking-tight uppercase text-sm">Thanakon.dev</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              Crafting high-end digital experiences with a focus on AI and clean design.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
              <span>© {currentYear}</span>
              <span className="opacity-30">•</span>
              <span>Made with AI</span>
            </div>
          </div>

          {/* Quick Links & Social/Status Combined for Right Alignment */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 md:items-start text-right">
            {/* Quick Links */}
            <div className="flex flex-col gap-3 md:items-end">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 mb-2 whitespace-nowrap">Navigation</h4>
              <div className="grid grid-cols-2 md:flex md:flex-col gap-x-8 gap-y-2 text-left md:text-right">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                <Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Work</Link>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <Link href="/guestbook" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Guestbook</Link>
              </div>
            </div>

            {/* Social & Status */}
            <div className="flex flex-col md:items-end gap-6">
              <div className="flex items-center gap-4">
                <Link href="https://github.com/thnakon" target="_blank" className="h-10 w-10 rounded-xl border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="h-10 w-10 rounded-xl border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="https://twitter.com" target="_blank" className="h-10 w-10 rounded-xl border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-foreground/5 w-fit">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Status: Operational
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            Built with Next.js & TypeScript <ExternalLink className="h-2.5 w-2.5" />
          </p>
        </div>
      </div>
    </footer>
  )
}
