"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Palette, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NoteEditorProps {
  onSave: (note: { content: string; color: string }) => Promise<void>
  onClose: () => void
}

export function NoteEditor({ onSave, onClose }: NoteEditorProps) {
  const [content, setContent] = useState("")
  const [color, setColor] = useState("black")
  const [isSaving, setIsSaving] = useState(false)

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
      await onSave({ content, color })
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
            <h3 className="text-xl font-bold tracking-tight">Leave a note</h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <textarea
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? (max 500 chars)"
              maxLength={500}
              className="w-full h-40 bg-foreground/[0.02] border border-foreground/[0.08] rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg"
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground mr-1" />
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.id)}
                      className={`h-8 w-8 rounded-lg border-2 transition-all ${c.class} ${
                        color === c.id ? "scale-110 border-foreground/40 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || isSaving}
                className="rounded-xl px-6 h-11 font-bold gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Post Note
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
