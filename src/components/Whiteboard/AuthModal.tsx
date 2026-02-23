"use client"

import { motion } from "framer-motion"
import { Github, Chrome, X } from "lucide-react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

interface AuthModalProps {
  onClose: () => void
}

export function AuthModal({ onClose }: AuthModalProps) {
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

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm bg-background border border-foreground/[0.08] rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Sign in</h2>
            <p className="text-muted-foreground text-sm">
              to continue to thnakon.dev
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              onClick={() => signIn("github")}
              className="w-full h-14 rounded-2xl bg-foreground text-background hover:opacity-90 transition-all font-bold text-sm gap-3 group"
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
            </Button>

            <Button
              onClick={() => signIn("google")}
              variant="outline"
              className="w-full h-14 rounded-2xl border-foreground/[0.08] bg-transparent text-foreground hover:bg-foreground/[0.03] transition-all font-bold text-sm gap-3"
            >
              <Chrome className="h-5 w-5" />
              Continue with Google
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      </motion.div>
    </div>
  )
}
