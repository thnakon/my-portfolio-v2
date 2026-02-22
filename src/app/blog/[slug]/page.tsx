"use client"

import { useParams, useRouter } from "next/navigation"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Share2, Sparkles, Tag, ChevronRight, Laptop, Keyboard, Mouse, Monitor, Music, ArrowRight } from "lucide-react"
import Link from "next/link"
import { blogs } from "@/data/blogs"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FinalSection } from "@/components/FinalSection"

export default function BlogPostPage() {
  const { slug } = useParams()
  const router = useRouter()
  const post = blogs.find((b) => b.slug === slug)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-6">
        <h1 className="text-4xl font-black uppercase">Post Not Found</h1>
        <p className="text-muted-foreground">The article you are looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/blog">
          <Button variant="outline" className="rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-[11px] gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Button>
        </Link>
      </div>
    )
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-foreground z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-foreground/[0.02] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-foreground/[0.015] rounded-full blur-[120px]" />
      </div>

      <main className="container mx-auto px-8 pt-32 pb-32 relative z-10">
        {/* Navigation Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-muted-foreground/50 text-[11px] font-black uppercase tracking-widest mb-12"
        >
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground/40">{post.category}</span>
        </motion.div>

        {/* Post Header */}
        <div className="max-w-4xl mx-auto space-y-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-muted-foreground/60 font-mono text-[11px] uppercase tracking-[0.2em]">
              <Sparkles className="h-3 w-3" />
              <span>{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.85] text-foreground">
              {post.title}
            </h1>
            
            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-foreground/[0.06]">
              <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-muted-foreground/40">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-foreground/[0.03] border border-foreground/[0.05] rounded-lg text-[9px] font-bold text-muted-foreground/60 tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Featured Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-2xl border border-foreground/[0.05]"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.05] to-transparent z-10" />
             <div className="h-full w-full flex items-center justify-center opacity-10">
                <div className="text-[10vw] font-black uppercase tracking-tighter rotate-[-5deg]">
                  {post.title.split(' ')[0]}
                </div>
             </div>
          </motion.div>
        </div>

        {/* Post Content */}
        <article className="max-w-3xl mx-auto prose prose-invert prose-zinc lg:prose-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-foreground/80 leading-relaxed font-medium space-y-8"
          >
            {post.content.split('\n').map((paragraph, i) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;
              
              if (trimmed.startsWith('###')) {
                return <h3 key={i} className="text-2xl font-bold text-foreground pt-8">{trimmed.replace('###', '')}</h3>;
              }
              
              if (trimmed.startsWith('-')) {
                return (
                  <li key={i} className="list-none flex items-start gap-3 ml-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/30 mt-2.5 shrink-0" />
                    <span>{trimmed.replace('-', '').trim()}</span>
                  </li>
                );
              }

              return <p key={i}>{trimmed}</p>;
            })}
          </motion.div>
        </article>

        {/* Footer Actions */}
        <div className="max-w-3xl mx-auto mt-24 pt-12 border-t border-foreground/[0.06] flex items-center justify-between">
            <Link href="/blog">
              <Button variant="ghost" className="rounded-xl px-0 hover:bg-transparent hover:text-foreground text-muted-foreground gap-2 font-black uppercase tracking-widest text-[11px]">
                  <ArrowLeft className="h-4 w-4" /> Back to Articles
              </Button>
            </Link>
            <Button variant="outline" className="rounded-xl h-12 w-12 border-foreground/10 flex items-center justify-center hover:bg-foreground/[0.03] transition-all">
               <Share2 className="h-4 w-4 text-muted-foreground" />
            </Button>
        </div>

        {/* Bottom Bento Grid — Uses / Write to me / Last Played */}
        <section id="contact" className={`mt-40 transition-all duration-1000 delay-[500ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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
            <div className="rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 flex flex-col group hover:bg-card/60 hover:border-foreground/[0.12] transition-all duration-300 overflow-hidden relative">
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
            </div>

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

        <div className="mt-32 pb-32">
          <FinalSection />
        </div>
      </main>
    </div>
  )
}
