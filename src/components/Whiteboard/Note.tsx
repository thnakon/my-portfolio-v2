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
  const colorClasses: Record<string, string> = {
    "pastel-yellow": "bg-[#FEF9C3] border-[#FEF08A] text-[#854D0E]",
    "pastel-pink": "bg-[#FCE7F3] border-[#FBCFE8] text-[#9D174D]",
    "pastel-blue": "bg-[#E0F2FE] border-[#BAE6FD] text-[#075985]",
    "pastel-green": "bg-[#DCFCE7] border-[#BBF7D0] text-[#166534]",
    "pastel-purple": "bg-[#F3E8FF] border-[#E9D5FF] text-[#6B21A8]",
  }

  const selectedColor = colorClasses[message.color] || colorClasses["pastel-yellow"]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: message.rotation - 10 }}
      animate={{ opacity: 1, scale: 1, rotate: message.rotation }}
      whileHover={{ scale: 1.05, zIndex: 50, rotate: 0 }}
      className={`absolute w-64 p-6 rounded-sm shadow-lg border-t-[1px] ${selectedColor} font-handwriting cursor-default selection:bg-black/10`}
      style={{
        left: `${message.x}%`,
        top: `${message.y}%`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      {/* Tape Effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/30 backdrop-blur-sm border border-white/20 rotate-[-2deg] rounded-sm shadow-sm" />

      {/* Content */}
      <div className="space-y-4">
        <p className="text-lg leading-relaxed break-words whitespace-pre-wrap min-h-[100px]">
          {message.content}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-3 pt-4 border-t border-black/5">
          {message.user.image && (
            <Image
              src={message.user.image}
              alt={message.user.name || "User"}
              width={24}
              height={24}
              className="rounded-full border border-black/10"
            />
          )}
          <div className="flex flex-col">
            <span className="text-[12px] font-bold opacity-80">
              {message.user.name || "Anonymous"}
            </span>
            <span className="text-[10px] opacity-50">
              {formatDistanceToNow(new Date(message.createdAt))} ago
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
