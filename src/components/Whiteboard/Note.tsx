"use client"

import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import { Trash2, Pencil } from "lucide-react"

interface NoteProps {
  message: {
    id: string
    content: string
    createdAt: string
    color: string
    rotation: number
    x: number
    y: number
    rating?: number | null
    emoji?: string | null
    userId: string
    user: {
      name: string | null
      image: string | null
    }
  }
  isAdmin?: boolean
  isOwner?: boolean
  onDelete?: (id: string) => Promise<void>
  onEdit?: (message: any) => void
}

export function Note({ message, isAdmin, isOwner, onDelete, onEdit }: NoteProps) {
  const markerColors: Record<string, string> = {
    "black": "text-zinc-800 dark:text-zinc-200",
    "blue": "text-blue-600 dark:text-blue-400",
    "red": "text-rose-600 dark:text-rose-400",
    "green": "text-emerald-600 dark:text-emerald-400",
    "purple": "text-purple-600 dark:text-purple-400",
    "pastel-yellow": "text-zinc-800 dark:text-zinc-200",
    "pastel-pink": "text-rose-600 dark:text-rose-400",
    "pastel-blue": "text-blue-600 dark:text-blue-400",
    "pastel-green": "text-emerald-600 dark:text-emerald-400",
    "pastel-purple": "text-purple-600 dark:text-purple-400",
  }

  const selectedColor = markerColors[message.color] || markerColors["black"]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: message.rotation - 5 }}
      animate={{ opacity: 1, scale: 1, rotate: message.rotation }}
      whileHover={{ scale: 1.02, zIndex: 50 }}
      className={`relative w-full p-4 cursor-default selection:bg-black/5 font-handwriting ${selectedColor} group`}
    >
      {/* Actions (Hover) */}
      <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 font-sans">
        {isOwner && onEdit && (
          <button
            onClick={() => onEdit(message)}
            className="p-1.5 bg-background border border-foreground/[0.08] text-foreground rounded-lg shadow-sm hover:bg-foreground/[0.03] transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
        {(isAdmin || isOwner) && onDelete && (
          <button
            onClick={() => onDelete(message.id)}
            className="p-1.5 bg-background border border-foreground/[0.08] text-rose-500 rounded-lg shadow-sm hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Content (Markers have slightly varying thickness and opacity) */}
      <div className="relative">
        {/* Emoji Floating */}
        {message.emoji && (
          <div className="absolute -top-6 -left-2 text-2xl transform -rotate-12 pointer-events-none select-none">
            {message.emoji}
          </div>
        )}

        <p className="text-2xl md:text-3xl leading-relaxed break-words whitespace-pre-wrap min-h-[60px] drop-shadow-sm opacity-90 transition-opacity group-hover:opacity-100">
          {message.content}
        </p>

        {/* Rating Stars */}
        {message.rating && (
          <div className="flex gap-0.5 mt-2 mb-1 text-xs opacity-60">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < (message.rating || 0) ? "text-yellow-500" : "text-zinc-300 dark:text-zinc-700"}>
                ★
              </span>
            ))}
          </div>
        )}

        {/* Signature / Info */}
        <div className="flex items-center gap-2 mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
          {message.user.image && (
            <div className="relative h-5 w-5 rounded-full overflow-hidden transition-all font-sans">
              <Image
                src={message.user.image}
                alt={message.user.name || "User"}
                fill
                sizes="20px"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-1.5 font-sans text-[10px] font-bold tracking-wide pointer-events-none">
            <span className="truncate max-w-[100px]">
              {message.user.name || "Anonymous"}
            </span>
            <span className="opacity-50">•</span>
            <span className="opacity-70">
              {formatDistanceToNow(new Date(message.createdAt))} ago
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
