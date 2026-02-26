"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, Search, Sparkles, Laptop, Keyboard, Mouse, Monitor, Music, ArrowRight } from "lucide-react"
import Link from "next/link"
import { blogs } from "@/data/blogs"
import { BlogCard } from "@/components/BlogCard"
import { FinalSection } from "@/components/FinalSection"
import { useIntro } from "@/components/intro-context"
import Image from "next/image"

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const { isDone } = useIntro()

  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = ["All", ...new Set(blogs.map(post => post.category))]

  const filteredPosts = blogs.filter(post => {
    const matchesFilter = activeFilter === "All" || post.category === activeFilter
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  if (!mounted) return null

  return (
    <div className="pt-32">

      <main className="container mx-auto px-8 pb-32 relative z-10">
        {/* Header Section */}
        <div className="space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-[0.9]">
              Blog & <br />
              Reflections
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Writing about design, engineering, and the future of AI. A space for sharing technical deep-dives and creative thoughts.
            </p>
          </motion.div>
        </div>

        {/* Toolbar: Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-foreground/[0.06] pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-muted-foreground/40 mr-2" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === category
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 group-focus-within:text-foreground transition-colors" />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-foreground/[0.03] border border-foreground/[0.06] rounded-xl py-3 pl-10 pr-4 text-sm font-medium transition-all focus:outline-none focus:border-foreground/20 focus:bg-foreground/[0.05]"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="text-muted-foreground/60 font-medium">No articles found matching your criteria.</p>
          </motion.div>
        )}
        {/* Bottom Bento Grid — Uses / Write to me / Last Played */}
        <section id="contact" className={`mt-32 transition-all duration-1000 delay-[500ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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
            <Link 
              href="https://music.youtube.com/watch?v=GCkhFdMdGOY&list=OLAK5uy_lGltRMFUZ_XFtWZUPF5KuNGOYwyWigmeo"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">YouTube Music</p>
                  <h3 className="text-lg font-bold tracking-tight">On Repeat</h3>
                </div>
                <div className="flex items-center gap-4">
                  {/* Album art */}
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-foreground/[0.08] shadow-lg shrink-0">
                    <Image 
                      src="/fashion.jpg"
                      alt="FaSHioN - Cortis"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  {/* Song info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-sm font-bold truncate leading-tight uppercase tracking-tight">FaSHioN</p>
                    <p className="text-xs text-muted-foreground/60 truncate font-medium">Cortis</p>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-end gap-[2px] h-3">
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '8px', animationDelay: '0s' }} />
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '12px', animationDelay: '0.15s' }} />
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '6px', animationDelay: '0.3s' }} />
                        <span className="w-[3px] bg-foreground/40 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '10px', animationDelay: '0.45s' }} />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground/40 tracking-tighter">Now Playing</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </Link>

          </div>
        </section>

        <div className="mt-32">
          <FinalSection />
        </div>
      </main>
    </div>
  )
}
