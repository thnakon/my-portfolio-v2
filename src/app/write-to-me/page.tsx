"use client"

import { useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Github, Chrome, Loader2, Info, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Note } from "@/components/Whiteboard/Note"
import { NoteEditor } from "@/components/Whiteboard/NoteEditor"
import { FinalSection } from "@/components/FinalSection"
import Image from "next/image"

export default function GuestbookPage() {
  const { data: session, status } = useSession()
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages")
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteNote = async (id: string) => {
    if (session?.user?.email !== "thnakon.d@gmail.com") return
    
    if (!confirm("Are you sure you want to delete this note?")) return

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete note:", error)
    }
  }

  const handleSaveNote = async (note: { 
    content: string; 
    color: string; 
    rating: number | null; 
    emoji: string | null 
  }) => {
    const rotation = (Math.random() - 0.5) * 10

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...note, rotation }),
      })

      if (res.ok) {
        const newMessage = await res.json()
        setMessages([newMessage, ...messages])
      }
    } catch (error) {
      console.error("Failed to save note:", error)
    }
  }

  if (!mounted) return null

  const isAdmin = session?.user?.email === "thnakon.d@gmail.com"

  return (
    <div className="pt-32 pb-32">
      {/* Header Overlay */}
      <header className="relative z-10 container mx-auto px-8 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase"
          >
            Write to me
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl leading-relaxed"
          >
            Leave a note, share a thought, or just say hi. Your messages are pinned here for everyone to see.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          {status === "authenticated" ? (
            <div className="flex items-center gap-4 bg-card/60 backdrop-blur-md border border-foreground/[0.08] rounded-2xl p-2 pr-6">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-xl border border-foreground/[0.08]"
                />
              )}
              <div className="flex flex-col">
                <span className="text-[13px] font-bold truncate leading-tight">
                  {session.user?.name}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsEditorOpen(true)}
                    className="text-[11px] text-primary font-bold uppercase tracking-wider hover:underline"
                  >
                    Write a note
                  </button>
                  <span className="h-1 w-1 rounded-full bg-foreground/10" />
                  <button
                    onClick={() => signOut()}
                    className="text-[11px] text-muted-foreground/60 font-bold uppercase tracking-wider hover:text-rose-500 transition-colors flex items-center gap-1"
                  >
                    <LogOut className="h-3 w-3" />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/40 text-center md:text-left">
                Sign in to leave a note
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => signIn("github")}
                  className="rounded-xl px-4 h-11 border-foreground/10 hover:bg-foreground/[0.03] gap-2"
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => signIn("google")}
                  className="rounded-xl px-4 h-11 border-foreground/10 hover:bg-foreground/[0.03] gap-2"
                >
                  <Chrome className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          <Button
            onClick={() => {
              if (status === "authenticated") {
                setIsEditorOpen(true)
              } else {
                signIn()
              }
            }}
            className="rounded-2xl px-8 h-14 text-[13px] font-black uppercase tracking-[0.1em] shadow-xl shadow-primary/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 mr-2" /> Write a note
          </Button>
        </motion.div>
      </header>

      {/* Main Whiteboard Area */}
      <main className="flex-1 relative container mx-auto px-8 pb-32">
        <div className="relative w-full min-h-[800px] border-2 border-dashed border-foreground/[0.05] rounded-[3rem] overflow-hidden bg-foreground/[0.01]">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/20" />
            </div>
          ) : messages.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="h-20 w-20 rounded-3xl bg-foreground/[0.03] flex items-center justify-center">
                <Info className="h-10 w-10 text-muted-foreground/20" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">No notes yet</h3>
                <p className="text-muted-foreground">Be the first to pin something on the board!</p>
              </div>
            </div>
          ) : (
            <div className="relative p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                  <div key={message.id} className="relative">
                    <Note 
                      message={message} 
                      isAdmin={isAdmin}
                      onDelete={handleDeleteNote}
                    />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <section className="mt-20">
        <FinalSection />
      </section>

      <AnimatePresence>
        {isEditorOpen && (
          <NoteEditor
            onSave={handleSaveNote}
            onClose={() => setIsEditorOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
