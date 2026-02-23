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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-background border border-foreground/[0.08] rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Write a note</h2>
            <p className="text-muted-foreground text-sm">
              share a thought or just say hi to everyone.
            </p>
          </div>

          <div className="space-y-6">
            <textarea
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write something..."
              className="w-full h-32 bg-foreground/[0.03] border border-foreground/[0.05] rounded-[1.5rem] p-4 text-xl font-handwriting resize-none focus:outline-none focus:border-primary/30 transition-all placeholder:opacity-30"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {/* Color Selection */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Marker Color</span>
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

                {/* Rating Selection */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rating (Optional)</span>
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

              {/* Emoji Selection */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Emoji (Optional)</span>
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
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isSaving}
            className="w-full h-14 rounded-2xl bg-foreground text-background hover:opacity-90 transition-all font-bold text-sm"
          >
            {isSaving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Post your note"
            )}
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      </motion.div>
    </div>
  )
}
