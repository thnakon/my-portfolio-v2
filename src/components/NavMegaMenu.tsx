"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, ExternalLink, Mail, Brain, Link2, Monitor, Info } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function NavMegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-3 py-1.5 h-auto text-[13px] font-medium bg-transparent hover:bg-muted rounded-md data-[state=open]:bg-muted">
            More
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[600px] p-6 grid grid-cols-12 gap-6">
              {/* Left Side: Two Large Cards */}
              <div className="col-span-8 grid grid-cols-2 gap-4">
                <Link
                  href="/contact"
                  className="group relative flex h-full min-h-[140px] flex-col justify-end overflow-hidden rounded-xl bg-muted p-4 transition-all hover:ring-2 hover:ring-primary/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <div className="absolute inset-0 bg-[url('/write-to-me-bg.png')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110" />
                  <div className="relative z-20 flex items-center gap-2 text-white">
                    <Mail className="h-4 w-4" />
                    <p className="text-sm font-semibold">Write to me</p>
                  </div>
                </Link>

                <Link
                  href="/ai-attitudes"
                  className="group relative flex h-full min-h-[140px] flex-col justify-end overflow-hidden rounded-xl bg-white p-4 transition-all hover:ring-2 hover:ring-primary/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <div className="absolute inset-0 bg-[url('/attitudes-ai-bg.png')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110" />
                  <div className="relative z-20 flex items-center gap-2 text-white">
                    <Brain className="h-4 w-4" />
                    <p className="text-sm font-semibold">Attitudes AI</p>
                  </div>
                </Link>
              </div>

              {/* Right Side: Secondary Links */}
              <div className="col-span-4 flex flex-col gap-6">
                <div className="flex flex-col gap-5">
                  <Link href="/links" className="group flex items-start gap-3">
                    <div className="mt-0.5 rounded-md bg-muted p-1.5 transition-colors group-hover:bg-primary/10">
                      <Link2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold">
                        Links
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug">
                        All my links are here
                      </p>
                    </div>
                  </Link>

                  <Link href="/uses" className="group flex items-start gap-3">
                    <div className="mt-0.5 rounded-md bg-muted p-1.5 transition-colors group-hover:bg-primary/10">
                      <Monitor className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold">
                        Uses
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug">
                        A peek into my digital...
                      </p>
                    </div>
                  </Link>

                  <Link href="/attribution" className="group flex items-start gap-3">
                    <div className="mt-0.5 rounded-md bg-muted p-1.5 transition-colors group-hover:bg-primary/10">
                      <Info className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold">
                        Attribution
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug">
                        Journey to create this
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
