"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Palette, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NoteEditorProps {
  onSave: (note: { content: string; color: string; rating: number | null; emoji: string | null }) => Promise<void>
  onClose: () => void
}

export function NoteEditor({ onSave, onClose }: NoteEditorProps) {
  const [content, setContent] = useState("")
  const [color, setColor] = useState("black")
  const [rating, setRating] = useState<number | null>(null)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const emojis = ["✨", "🚀", "❤️", "💡", "🔥", "🎨", "💻", "☕"]

  const colors = [
    { id: "black", label: "Black", class: "bg-zinc-800 border-zinc-900" },
    { id: "red", label: "Red", class: "bg-rose-600 border-rose-700" },
    { id: "blue", label: "Blue", class: "bg-blue-600 border-blue-700" },
    { id: "green", label: "Green", class: "bg-emerald-600 border-emerald-700" },
    { id: "purple", label: "Purple", class: "bg-purple-600 border-purple-700" },
  ]

  const handleSubmit = async () => {
    if (!content.trim() || isSaving) return
    setIsSaving(true)
    try {
      await onSave({ content, color, rating, emoji: selectedEmoji })
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg bg-card border border-foreground/[0.08] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold uppercase tracking-tight">Write a note</h3>
            <button 
              onClick={onClose}
              className="text-muted-foreground/40 hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
            className="w-full h-32 bg-transparent text-xl font-handwriting resize-none focus:outline-none placeholder:opacity-30"
          />

          <div className="space-y-4">
            {/* Color Selection */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Marker Color</span>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setColor(c.id)}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${c.class} ${
                      color === c.id ? "scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-100"
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Emoji Selection */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Emoji (Optional)</span>
              <div className="flex flex-wrap gap-2">
                {emojis.map((e) => (
                  <button
                    key={e}
                    onClick={() => setSelectedEmoji(selectedEmoji === e ? null : e)}
                    className={`h-9 w-9 flex items-center justify-center rounded-xl bg-foreground/[0.03] border transition-all text-lg ${
                      selectedEmoji === e ? "border-primary bg-primary/5 scale-110" : "border-transparent hover:bg-foreground/[0.06]"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Selection */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Rating (Optional)</span>
              <div className="flex gap-2 text-2xl">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRating(rating === s ? null : s)}
                    className={`transition-all hover:scale-125 ${
                      rating && s <= rating ? "text-yellow-400" : "text-muted-foreground/20"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isSaving}
            className="w-full h-12 rounded-xl font-bold uppercase tracking-widest"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Post Note"
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
