"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Globe, 
  Cpu, 
  PenTool, 
  Laptop, 
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Search,
  Keyboard,
  Mouse,
  Monitor,
  ArrowRight,
  Music
} from "lucide-react"
import { useIntro } from "@/components/intro-context"
import { ContactModal } from "@/components/ContactModal"
import { Button } from "@/components/ui/button"
import { FinalSection } from "@/components/FinalSection"
import { 
  socialLinks, 
  portfolioLinks, 
  contactLinks 
} from "@/data/links"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function LinksPage() {
  const { isDone, setDone } = useIntro()
  
  useEffect(() => {
    setDone(true)
  }, [setDone])

  const CategoryItem = ({ item }: { item: any }) => {
    const Icon = item.icon;
    const isExternal = !item.isInternal;
    const LinkComponent = isExternal ? 'a' : Link;
    const linkProps = isExternal ? { href: item.url, target: "_blank", rel: "noopener noreferrer" } : { href: item.url };

    return (
      <LinkComponent
        {...linkProps as any}
        className="group relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4 transition-all duration-300 hover:bg-card/60 hover:border-foreground/[0.12] hover:shadow-md hover:shadow-foreground/[0.02] cursor-pointer"
      >
        <div className="h-10 w-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.08] transition-colors overflow-hidden">
          <Icon className="h-5 w-5 text-foreground/50 transition-colors group-hover:text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-[13px] font-bold text-foreground/90 truncate leading-tight transition-colors group-hover:text-foreground">
              {item.title}
            </p>
            {isExternal && <ArrowUpRight className="h-3 w-3 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors" />}
          </div>
          <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{item.description}</p>
        </div>
      </LinkComponent>
    )
  }

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 items-start">
          
          {/* Sidebar: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-1 space-y-6 sticky top-32"
          >
            <div className="rounded-[2.5rem] border border-foreground/[0.08] bg-card/40 backdrop-blur-md p-8 shadow-2xl shadow-foreground/[0.02] flex flex-col items-center text-center space-y-6 overflow-hidden relative group">
              {/* Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-background shadow-xl ring-4 ring-foreground/[0.02] transition-transform duration-500 group-hover:scale-105">
                <Image 
                  src="/profile-v3.jpg" 
                  alt="Thanakon" 
                  fill
                  className="object-cover scale-125"
                />
              </div>

              <div className="space-y-2 w-full">
                <h1 className="text-2xl font-black tracking-tight text-foreground uppercase">Thanakon</h1>
                <div className="flex flex-wrap justify-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-foreground/[0.04] border border-foreground/[0.06] text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Developer</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-foreground/[0.04] border border-foreground/[0.06] text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Freelancer</span>
                </div>
              </div>

              <div className="w-full space-y-3 pt-4 border-t border-foreground/[0.06]">
                <div className="flex items-center gap-3 text-muted-foreground/70">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-medium">Thailand</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground/70">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-medium truncate">{contactLinks[0].description}</span>
                </div>
              </div>

              <div className="w-full space-y-3 pt-6">
                <ContactModal>
                  <Button className="w-full h-12 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-foreground/5 gap-2 group/btn">
                    Book a Call
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Button>
                </ContactModal>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/">
                    <Button variant="outline" className="w-full h-11 rounded-xl font-bold uppercase tracking-widest text-[9px] border-foreground/[0.06] hover:bg-foreground/[0.03]">
                      Website
                    </Button>
                  </Link>
                  <a href={`mailto:${contactLinks[0].description}`}>
                    <Button variant="outline" className="w-full h-11 rounded-xl font-bold uppercase tracking-widest text-[9px] border-foreground/[0.06] hover:bg-foreground/[0.03]">
                      Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content: Categories Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:col-span-3 space-y-16"
          >
            {/* Code & Craft Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-[13px] font-bold tracking-tight text-muted-foreground/60 whitespace-nowrap">Code & Craft</h2>
                <div className="h-[1px] w-full bg-foreground/[0.06]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Special GitHub Item like in image if we want, or just generic */}
                <CategoryItem item={socialLinks[0]} /> {/* GitHub */}
                <CategoryItem item={portfolioLinks[0]} /> {/* Selected Work */}
                <CategoryItem item={portfolioLinks[1]} /> {/* AI Attitudes */}
                <CategoryItem item={portfolioLinks[2]} /> {/* Recent Journal */}
              </div>
            </motion.div>

            {/* Connect Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-[13px] font-bold tracking-tight text-muted-foreground/60 whitespace-nowrap">Connect</h2>
                <div className="h-[1px] w-full bg-foreground/[0.06]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.slice(1).map((link) => (
                  <CategoryItem key={link.title} item={link} />
                ))}
              </div>
            </motion.div>

            {/* Daily Gear Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-[13px] font-bold tracking-tight text-muted-foreground/60 whitespace-nowrap">Daily Gear & Docs</h2>
                <div className="h-[1px] w-full bg-foreground/[0.06]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CategoryItem item={portfolioLinks[3]} /> {/* Resume */}
                <CategoryItem item={portfolioLinks[4]} /> {/* Tech Stack */}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bento Grid — Uses / Write to me / Last Played */}
        <section id="contact" className={`pt-32 pb-32 transition-all duration-1000 delay-[2000ms] ${isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">

            {/* Uses */}
            <Link href="/uses" className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none transition-opacity group-hover:opacity-20" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/60">Daily Setup</p>
                  <h3 className="text-lg font-bold tracking-tight">Uses</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Laptop, name: 'MacBook Air M2', detail: '13-inch' },
                    { icon: Keyboard, name: 'Lofree Flow', detail: 'Low Profile' },
                    { icon: Mouse, name: 'Logitech G Pro', detail: 'Wireless' },
                    { icon: Monitor, name: 'ASUS ProArt', detail: 'Color Accurate' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-2.5 group/item">
                      <div className="h-8 w-8 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover/item:bg-foreground/[0.08] transition-colors">
                        <item.icon className="h-3.5 w-3.5 text-foreground/50" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-foreground/80 truncate leading-tight">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground/50 font-medium">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Arrow */}
              <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </Link>

            {/* Write to me */}
            <Link href="/write-to-me" className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-5">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/60">Guestbook</p>
                  <h3 className="text-lg font-bold tracking-tight">Write a note</h3>
                </div>
                {/* Visual Note Sheets */}
                <div className="relative h-28 w-full mt-4">
                  <div className="absolute inset-0 bg-foreground/[0.03] border border-foreground/[0.05] rounded-xl rotate-[-4deg] translate-y-2 scale-95" />
                  <div className="absolute inset-0 bg-card/40 backdrop-blur-sm border border-foreground/[0.08] rounded-xl rotate-[2deg] translate-y-1 scale-[0.98]" />
                  <div className="absolute inset-0 bg-card/60 backdrop-blur-md border border-foreground/[0.1] rounded-xl flex flex-col p-5 gap-2 transition-transform duration-500 group-hover:rotate-[-1deg] group-hover:-translate-y-1">
                    <div className="h-1.5 w-1/2 bg-foreground/20 rounded-full mb-2" />
                    <div className="space-y-3">
                      <div className="h-[1px] w-full bg-foreground/[0.08]" />
                      <div className="h-[1px] w-full bg-foreground/[0.08]" />
                      <div className="h-[1px] w-[80%] bg-foreground/[0.08]" />
                    </div>
                    <div className="mt-auto self-end">
                      <div className="h-1.5 w-10 bg-foreground/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </Link>

            {/* Last Played */}
            <div className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/60">Apple Music</p>
                  <h3 className="text-lg font-bold tracking-tight">Last Played</h3>
                </div>
                <div className="flex items-center gap-4">
                  {/* Album art */}
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-foreground/[0.08] shadow-lg shrink-0 bg-gradient-to-br from-rose-500/20 via-purple-500/20 to-blue-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Music className="h-8 w-8 text-foreground/20" />
                    </div>
                  </div>
                  {/* Song info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-sm font-bold truncate leading-tight">Die With A Smile</p>
                    <p className="text-xs text-muted-foreground/60 truncate">Lady Gaga, Bruno Mars</p>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-end gap-[2px] h-3">
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '8px', animationDelay: '0s' }} />
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '12px', animationDelay: '0.15s' }} />
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '6px', animationDelay: '0.3s' }} />
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '10px', animationDelay: '0.45s' }} />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground/40">Playing now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

          </div>
        </section>

        <FinalSection />
      </div>
    </div>
  )
}
