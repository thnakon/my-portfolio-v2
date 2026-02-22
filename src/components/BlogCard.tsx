"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { BlogPost } from "@/data/blogs"

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block space-y-5">
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-foreground/[0.05] bg-muted/30 transition-all duration-500 group-hover:border-foreground/[0.1] group-hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent z-10" />
          <div 
            className="w-full h-full bg-zinc-900 flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
          >
            {/* Visual Placeholder for Blog Images */}
            <div className="text-foreground/10 text-6xl font-black uppercase tracking-tighter opacity-20 rotate-[-10deg]">
              {post.category}
            </div>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-foreground/[0.05] text-[10px] font-bold uppercase tracking-widest text-foreground/70">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 px-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-foreground/70">
                {post.title}
              </h3>
              <div className="h-10 w-10 rounded-full border border-foreground/[0.05] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-background" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2 font-medium leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
