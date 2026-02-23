"use client"

import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"

interface NoteProps {
  message: {
    id: string
    content: string
    createdAt: string
    color: string
    rotation: number
    x: number
    y: number
    user: {
      name: string | null
      image: string | null
    }
  }
}

export function Note({ message }: NoteProps) {
  const markerColors: Record<string, string> = {
    "pastel-yellow": "text-zinc-800 dark:text-zinc-200", // Defaulting to black/dark
    "pastel-pink": "text-rose-600 dark:text-rose-400",
    "pastel-blue": "text-blue-600 dark:text-blue-400",
    "pastel-green": "text-emerald-600 dark:text-emerald-400",
    "pastel-purple": "text-purple-600 dark:text-purple-400",
    // Adding compatibility for old/new color names if needed
    "black": "text-zinc-800 dark:text-zinc-200",
    "blue": "text-blue-600 dark:text-blue-400",
    "red": "text-rose-600 dark:text-rose-400",
    "green": "text-emerald-600 dark:text-emerald-400",
    "purple": "text-purple-600 dark:text-purple-400",
  }

  const selectedColor = markerColors[message.color] || markerColors["black"]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: message.rotation - 5 }}
      animate={{ opacity: 1, scale: 1, rotate: message.rotation }}
      whileHover={{ scale: 1.02, zIndex: 50 }}
      className={`absolute w-72 p-4 cursor-default selection:bg-black/5 font-handwriting ${selectedColor}`}
      style={{
        left: `${message.x}%`,
        top: `${message.y}%`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      {/* Content (Markers have slightly varying thickness and opacity) */}
      <div className="relative group">
        <p className="text-2xl md:text-3xl leading-relaxed break-words whitespace-pre-wrap min-h-[60px] drop-shadow-sm opacity-90 transition-opacity group-hover:opacity-100">
          {message.content}
        </p>

        {/* Signature / Info */}
        <div className="flex items-center gap-2 mt-4 opacity-40 group-hover:opacity-100 transition-opacity">
          {message.user.image && (
            <div className="relative h-5 w-5 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all">
              <Image
                src={message.user.image}
                alt={message.user.name || "User"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-1.5 font-sans text-[10px] font-medium tracking-wide pointer-events-none">
            <span className="truncate max-w-[100px]">
              {message.user.name || "Anonymous"}
            </span>
            <span className="opacity-50">•</span>
            <span className="opacity-50">
              {formatDistanceToNow(new Date(message.createdAt))}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
