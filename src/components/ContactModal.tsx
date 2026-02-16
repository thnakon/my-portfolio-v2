"use client"

import * as React from "react"
import { 
  Calendar, 
  Mail, 
  Twitter, 
  Linkedin, 
  Github, 
  Copy, 
  Check,
  ArrowUpRight,
  Instagram,
  ChevronLeft,
  Loader2,
  Clock
} from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface ContactModalProps {
  children: React.ReactNode
}

export function ContactModal({ children }: ContactModalProps) {
  const [copied, setCopied] = useState(false)
  const [view, setView] = useState<"options" | "message" | "book">("options")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const email = "thnakon.d@gmail.com"

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy!", err)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset states after drawer closes
      setTimeout(() => {
        setView("options")
        setIsSuccess(false)
        setIsSending(false)
        setMessage("")
        setName("")
        setEmailInput("")
        setDate("")
        setTime("")
      }, 300)
    }
  }

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !emailInput || !message) return

    setIsSending(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: emailInput, message }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("Failed to send message.")
    } finally {
      setIsSending(false)
    }
  }

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !emailInput || !date || !time) return

    setIsSending(true)
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: emailInput, date, time }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Booking error:", error)
      alert("Failed to book a call.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Drawer onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col min-h-[450px]">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center flex-1 py-12 text-center animate-in zoom-in-95 duration-500">
              <div className="h-20 w-20 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Check className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {view === "book" ? "Request Sent!" : "Message Sent!"}
              </h2>
              <p className="text-muted-foreground max-w-[300px] mx-auto">
                {view === "book" 
                  ? "Your booking request has been sent! Please check your email for confirmation once it's approved."
                  : "Thank you for your message! I hope we get a chance to talk soon."}
              </p>
              <Button 
                variant="outline" 
                className="mt-8 rounded-xl px-8"
                onClick={() => handleOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : view === "options" ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <DrawerHeader className="text-left px-0 pb-2 pt-8">
                <DrawerTitle className="text-2xl font-bold tracking-tight">Get in touch</DrawerTitle>
                <DrawerDescription className="text-muted-foreground">
                  I&apos;m always open to discussing new projects, creative ideas or opportunities.
                </DrawerDescription>
              </DrawerHeader>

              <div className="space-y-6 pb-10 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Book a Call */}
                  <div 
                    className="group relative flex items-center gap-4 rounded-2xl border p-4 transition-all hover:bg-muted/50 cursor-pointer"
                    onClick={() => setView("book")}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Book a Call</h3>
                      <p className="text-[13px] text-muted-foreground">Schedule a 30-min chat</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  {/* Email Me */}
                  <div 
                    className="group relative flex items-center gap-4 rounded-2xl border p-4 transition-all hover:bg-muted/50 cursor-pointer"
                    onClick={copyEmail}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Email Me</h3>
                      <p className="text-[13px] text-muted-foreground truncate max-w-[120px]">{email}</p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border shadow-sm flex-shrink-0">
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Message Section */}
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="text-[13px] font-semibold text-muted-foreground tracking-wider mb-3">
                      Or write me a message here
                    </h4>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12 rounded-xl gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all border-dashed"
                      onClick={() => setView("message")}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-pulse" />
                      Tap to open
                    </Button>
                  </div>
                </div>

                {/* Socials */}
                <div className="space-y-4 pt-4 flex flex-col items-center">
                  <h4 className="text-[13px] font-semibold text-muted-foreground tracking-wider underline underline-offset-4 decoration-border/50">
                    Connect on socials
                  </h4>
                  <div className="flex items-center gap-4">
                    {[
                      { icon: Twitter, href: "https://x.com/Obounwarm", name: "Twitter" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/thanankon-duangkumwattanasiri-1709823a8/?trk=public-profile-join-page", name: "LinkedIn" },
                      { icon: Github, href: "https://github.com/thnakon", name: "GitHub" },
                      { icon: Instagram, href: "https://www.instagram.com/itzwarm_/", name: "Instagram" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border bg-background transition-all hover:bg-muted hover:scale-110 active:scale-95 shadow-sm"
                      >
                        <social.icon className="h-5 w-5 text-foreground/80" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : view === "message" ? (
            <form onSubmit={handleMessageSubmit} className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col flex-1">
              <DrawerHeader className="text-left px-0 pb-6 pt-8">
                <div className="flex items-center gap-2 mb-2">
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setView("options")}
                    className="h-8 w-8 -ml-2 rounded-full"
                    disabled={isSending}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <DrawerTitle className="text-2xl font-bold tracking-tight">Send a message</DrawerTitle>
                </div>
                <DrawerDescription className="text-muted-foreground">
                  I&apos;ll get back to you as soon as possible.
                </DrawerDescription>
              </DrawerHeader>

              <div className="space-y-4 pb-10 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[13px] font-semibold text-muted-foreground tracking-wider">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      className="rounded-xl h-11 border-muted-foreground/20 focus-visible:ring-foreground" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[13px] font-semibold text-muted-foreground tracking-wider">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@example.com" 
                      className="rounded-xl h-11 border-muted-foreground/20 focus-visible:ring-foreground" 
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      disabled={isSending}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message" className="text-[13px] font-semibold text-muted-foreground tracking-wider">Message</Label>
                    <span className="text-[11px] font-medium text-muted-foreground tabular-nums">
                      {message.length}/1000
                    </span>
                  </div>
                  <Textarea 
                    id="message" 
                    placeholder="Tell me about your project..." 
                    className="min-h-[150px] rounded-xl border-muted-foreground/20 focus-visible:ring-foreground resize-none py-3"
                    maxLength={1000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={isSending}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSending}
                  className="w-full h-12 rounded-xl font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all mt-2 shadow-lg shadow-foreground/10"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleBookSubmit} className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col flex-1">
              <DrawerHeader className="text-left px-0 pb-6 pt-8">
                <div className="flex items-center gap-2 mb-2">
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setView("options")}
                    className="h-8 w-8 -ml-2 rounded-full"
                    disabled={isSending}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <DrawerTitle className="text-2xl font-bold tracking-tight">Book a Call</DrawerTitle>
                </div>
                <DrawerDescription className="text-muted-foreground">
                  Schedule a 30-minute chat to discuss your project.
                </DrawerDescription>
              </DrawerHeader>

              <div className="space-y-4 pb-10 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="book-name" className="text-[13px] font-semibold text-muted-foreground tracking-wider">Name</Label>
                    <Input 
                      id="book-name" 
                      placeholder="Your name" 
                      className="rounded-xl h-11 border-muted-foreground/20 focus-visible:ring-foreground" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="book-email" className="text-[13px] font-semibold text-muted-foreground tracking-wider">Email</Label>
                    <Input 
                      id="book-email" 
                      type="email" 
                      placeholder="email@example.com" 
                      className="rounded-xl h-11 border-muted-foreground/20 focus-visible:ring-foreground" 
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      disabled={isSending}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="book-date" className="text-[13px] font-semibold text-muted-foreground tracking-wider">Preferred Date</Label>
                    <div className="relative">
                      <Input 
                        id="book-date" 
                        type="date" 
                        className="rounded-xl h-11 border-muted-foreground/20 focus-visible:ring-foreground pl-10" 
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        onClick={(e) => e.currentTarget.showPicker?.()}
                        disabled={isSending}
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="book-time" className="text-[13px] font-semibold text-muted-foreground tracking-wider">Preferred Time</Label>
                    <div className="relative">
                      <Input 
                        id="book-time" 
                        type="time" 
                        className="rounded-xl h-11 border-muted-foreground/20 focus-visible:ring-foreground pl-10" 
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        onClick={(e) => e.currentTarget.showPicker?.()}
                        disabled={isSending}
                      />
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-[12px] text-muted-foreground bg-muted/30 p-3 rounded-lg border border-dashed">
                    * Booking requests are subject to approval. You will receive a confirmation email once accepted.
                  </p>
                </div>
                <Button 
                  type="submit"
                  disabled={isSending}
                  className="w-full h-12 rounded-xl font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all mt-4 shadow-lg shadow-foreground/10"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    "Send Booking Request"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
