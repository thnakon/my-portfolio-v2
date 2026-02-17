import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Code2, BrainCircuit, User, Linkedin, Github, Instagram, ArrowRight, ArrowUpRight, Cpu, Layers, Monitor, Mail, MapPin, Search } from "lucide-react"
import Image from "next/image"
import { ContactModal } from "./ContactModal"

export function AboutSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 auto-rows-[minmax(180px,auto)]">
      
      {/* 1. Main Profile Tile (Lg: 7 cols, Row: 2) */}
      <Card className="lg:col-span-7 lg:row-span-3 border bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center text-center p-8 lg:p-12 border-muted/20 shadow-2xl shadow-foreground/5 group hover:bg-card/60 transition-all duration-500">
        <div className="relative mb-8 pt-4">
          <div className="relative h-32 w-32 lg:h-40 lg:w-40 rounded-full overflow-hidden border-4 border-background shadow-2xl z-10">
            <Image 
              src="/profile-v3.jpg" 
              alt="Thanakon" 
              fill 
              className="object-cover scale-110"
            />
          </div>
          {/* Label Tag on Image */}
          <div className="absolute -top-2 -right-16 bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-xl z-20 rotate-12 scale-110">
            THANAKON 🥳
          </div>
          {/* Decorative Ring */}
          <div className="absolute inset-0 rounded-full border border-foreground/10 animate-pulse scale-125 -z-0" />
        </div>

        <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 uppercase">Digital Craftsmanship</h3>
        <p className="text-muted-foreground text-sm lg:text-base leading-relaxed max-w-[450px] mb-8 font-medium">
          Blending aesthetic precision with robust engineering to build the next generation of digital products.
        </p>

        <div className="grid grid-cols-2 gap-12 mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold font-mono tracking-tighter">3+</div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-mono tracking-tighter">20+</div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Projects</div>
          </div>
        </div>

        <ContactModal>
          <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-10 py-7 text-base font-bold group shadow-lg">
            Get in Touch
            <div className="ml-3 h-8 w-8 rounded-full bg-background/20 flex items-center justify-center transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4 text-background" />
            </div>
          </Button>
        </ContactModal>
      </Card>

      {/* 2. Neural Suite (AI Tools) (Lg: 5 cols, Row: 2) */}
      <Card className="lg:col-span-5 lg:row-span-2 border bg-[#f9f9f9] dark:bg-card/40 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-10 border-muted/20 group hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" />
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">Neural Suite</h4>
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">Modular Intelligence</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Commanding and orchestrating advanced AI for rapid engineering.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: "ChatGPT", desc: "Logic & Reasoning", icon: Cpu, color: "text-emerald-500" },
            { name: "Gemini", desc: "Multi-modal Vision", icon: Sparkles, color: "text-blue-500" },
            { name: "Claude", desc: "Creative Context", icon: BrainCircuit, color: "text-orange-500" },
            { name: "OpenClaw", desc: "System Control", icon: Layers, color: "text-red-500" }
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-4 p-4 rounded-3xl bg-background border border-muted/10 shadow-sm transition-all hover:border-foreground/20 cursor-default">
              <div className={`h-10 w-10 rounded-2xl bg-muted/30 flex items-center justify-center ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[13px] font-bold">{item.name}</div>
                <div className="text-[10px] text-muted-foreground font-medium">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Featured Projects (Lg: 5 cols, Row: 2) */}
      <Card className="lg:col-span-5 lg:row-span-2 border bg-[#f4f4f4] dark:bg-card/40 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-10 border-muted/20 relative overflow-hidden group">
        <div className="relative z-10 space-y-2 mb-8">
          <h3 className="text-2xl font-bold tracking-tight">Featured Projects</h3>
          <p className="text-muted-foreground text-sm">Some of my recent work</p>
        </div>
        
        <div className="relative mt-4 -mx-2 transition-transform duration-700 group-hover:scale-[1.02]">
          <div className="rounded-t-3xl border border-muted/20 overflow-hidden shadow-2xl">
             <Image 
               src="/babybib-preview.png" 
               alt="Project Preview" 
               width={600} 
               height={400} 
               className="object-cover w-full opacity-90 group-hover:opacity-100 transition-opacity"
             />
          </div>
        </div>
        {/* Decorative fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f4f4f4] dark:from-card via-transparent to-transparent z-20 pointer-events-none" />
      </Card>

      {/* 4. Location Tile (Lg: 3 cols, Row: 1) */}
      <Card className="lg:col-span-3 border bg-[#f0f0f0] dark:bg-card/40 backdrop-blur-md rounded-[2.5rem] p-8 border-muted/20 flex flex-col items-center justify-center text-center group hover:bg-card/50 transition-colors">
        <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground mb-4 opacity-70">Based In</div>
        <h3 className="text-3xl font-black uppercase tracking-tight mb-2">Thailand</h3>
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          GMT +7
        </div>
      </Card>

      {/* 5. Contact Tile (Lg: 3 cols, Row: 1) */}
      <Card className="lg:col-span-3 border bg-[#f9f9f9] dark:bg-card/40 backdrop-blur-md rounded-[2.5rem] p-8 border-muted/20 flex flex-col items-center justify-center text-center group hover:bg-card/50 transition-colors">
        <h4 className="text-sm font-bold mb-1">Let&apos;s work together</h4>
        <p className="text-[10px] text-muted-foreground font-medium mb-6">Open for new projects.</p>
        <div className="bg-background px-5 py-3 rounded-full border border-muted/10 shadow-sm flex items-center gap-3 group-hover:border-foreground/20 transition-all cursor-pointer">
          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[11px] font-bold lowercase tracking-wide">thnakon.d@gmail.com</span>
        </div>
      </Card>

      {/* 6. Tech Stack Tile (Lg: 6 cols, Row: 1) */}
      <Card className="lg:col-span-6 border bg-[#f4f4f4] dark:bg-card/40 backdrop-blur-md rounded-[2.5rem] p-6 lg:p-8 border-muted/20 flex flex-col justify-center overflow-hidden">
        <h4 className="text-[12px] font-bold mb-6 px-2">Specialized Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {["React", "Tailwind", "Bun", "Docker", "Node.js", "Laravel", "Figma", "Git", "GitLab", "Python", "MySQL", "Supabase"].map((tech) => (
            <div key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background border border-muted/10 shadow-sm hover:border-foreground/20 transition-all cursor-default group/tech">
              <div className="h-4 w-4 rounded-md bg-muted/30 flex-shrink-0" />
              <span className="text-[11px] font-bold text-foreground/80 group-hover/tech:text-foreground">{tech}</span>
            </div>
          ))}
        </div>
      </Card>

    </div>
  )
}
