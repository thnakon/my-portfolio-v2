"use client"

import { useParams, useRouter } from "next/navigation"
import { motion, useScroll, useSpring } from "framer-motion"
import { 
  ArrowLeft, Github, Globe, Rocket, ShieldCheck, Zap, 
  BarChart3, Inbox, Smartphone, CheckCircle2, 
  Layers, Cpu, Layout, Info, Award, MousePointer2,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ContactModal } from "@/components/ContactModal"

const iconMap: Record<string, any> = {
  Zap,
  Inbox,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Layers,
  Cpu,
  Layout,
  Info,
  Award
}

export default function ProjectPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1]
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0]
  
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sectionIds = ["overview", "features", "architecture", "stack"];
    
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-background">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Button onClick={() => router.push("/work")}>Back to Work</Button>
      </div>
    )
  }

  const sections = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "features", label: "Feature Highlights", icon: Award },
    { id: "architecture", label: "Architecture", icon: Layers },
    { id: "stack", label: "Tech Stack", icon: Cpu }
  ]

  const getIconSlug = (tag: string) => {
    const map: Record<string, string> = {
      "Next.js": "nextdotjs",
      "React": "react",
      "Tailwind": "tailwindcss",
      "Tailwind CSS": "tailwindcss",
      "TypeScript": "typescript",
      "MySQL": "mysql",
      "PHP": "php",
      "Laravel": "laravel",
      "Laravel 11": "laravel",
      "Laravel 12": "laravel",
      "Vue.js 3": "vuedotjs",
      "Vu3.js": "vuedotjs",
      "Supabase": "supabase",
      "Docker": "docker",
      "PostgreSQL": "postgresql",
      "Node.js": "nodedotjs",
      "JavaScript": "javascript",
      "HTML5": "html5",
      "CSS3": "css3"
    }
    return map[tag] || tag.toLowerCase().replace('.', 'dot').replace(' ', '');
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-clip text-foreground">
      {/* Dynamic Background Layer (Subtle Watermark) */}
      <div className="absolute top-0 inset-x-0 h-[100vh] pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/90 to-background z-10" />
        <Image 
          src={project.image} 
          alt="" 
          fill 
          className="object-cover opacity-[0.05] grayscale brightness-150 contrast-50"
          priority
        />
        <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      </div>

      <main className="container mx-auto px-8 pt-32 pb-32 relative z-10">
        
        {/* Navigation & Header */}
        <div className="max-w-4xl mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              href="/work" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] font-black uppercase tracking-widest bg-foreground/[0.03] px-2 py-1 rounded-md">Archive 2024</span>
            </Link>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9]">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              {project.description}
            </p>

            {/* Tags & Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
               {project.tags.map(tag => (
                 <div key={tag} className="flex items-center gap-1.5 bg-foreground/[0.03] border border-foreground/[0.06] px-3 py-1 rounded-full">
                    <img 
                      src={`https://cdn.simpleicons.org/${getIconSlug(tag)}`} 
                      className="h-3 w-3 dark:invert opacity-60"
                      alt={tag}
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{tag}</span>
                 </div>
               ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
               {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank">
                    <Button size="lg" className="rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-[10px] gap-2 shadow-2xl animate-shimmer-border">
                      View Project <Globe className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
               )}
               {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank">
                    <Button variant="outline" size="lg" className="rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-[10px] gap-2 border-foreground/10 bg-background/50 backdrop-blur-xl animate-shimmer-border">
                      Source Code <Github className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
               )}
            </div>
          </motion.div>
        </div>

        {/* Multi-Screen Hero Display */}
        <div className="relative mb-32 group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               className="aspect-video relative rounded-3xl overflow-hidden border border-foreground/10 shadow-[0_50px_100px_rgba(0,0,0,0.1)] bg-muted"
            >
              <Image src={project.image} fill className="object-cover" alt="Main View" priority />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                 <span className="text-[8px] font-bold text-white uppercase tracking-widest opacity-80">Primary Architecture</span>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               className="aspect-video relative rounded-3xl overflow-hidden border border-foreground/10 shadow-[0_50px_100px_rgba(0,0,0,0.1)] bg-muted"
            >
              <Image src={project.hoverImage || project.stackImages?.[0] || project.image} fill className="object-cover" alt="Detail View" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                 <span className="text-[8px] font-bold text-white uppercase tracking-widest opacity-80">Interface System</span>
              </div>
            </motion.div>
          </div>
          {/* Decorative backdrop blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-blue-500/5 blur-[120px] -z-10 rounded-full" />
        </div>

        {/* Content Layout (75/25 split) */}
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Main Content Areas */}
          <div className="flex-1 space-y-32">
            
            {/* 1. Overview */}
            <section id="overview">
              <div className="flex items-center gap-4 group">
                <Rocket className="h-6 w-6 text-foreground/40 transition-transform group-hover:scale-110" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Overview</h2>
              </div>
              <div className="space-y-8">
                <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                  {project.overview}
                </p>
                <div className="bg-foreground/[0.02] border border-foreground/[0.06] rounded-[2rem] p-8 flex gap-6 items-start">
                   <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-2xl bg-foreground/[0.03] border border-foreground/5">
                      <Info className="h-5 w-5 text-foreground/40" />
                   </div>
                   <div className="space-y-2">
                      <p className="text-[11px] font-black uppercase tracking-widest text-foreground/60">A Dev's Personal Space</p>
                      <p className="text-sm text-muted-foreground/80 italic">"More than a portfolio — this is a production-grade app showcasing technical depth, storytelling, and user engagement."</p>
                   </div>
                </div>
              </div>
            </section>

            {/* 2. Feature Highlights */}
            <section id="features">
              <div className="flex items-center gap-4 group">
                <Award className="h-6 w-6 text-foreground/40 transition-transform group-hover:scale-110" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Feature Highlights</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {project.features.map((feature, idx) => {
                  const Icon = iconMap[feature.icon] || CheckCircle2
                  return (
                    <div key={idx} className="flex items-center justify-between p-6 rounded-2xl bg-card/40 border border-foreground/[0.06] hover:bg-card/60 hover:border-foreground/[0.1] transition-all group/feat">
                      <div className="flex items-center gap-6">
                        <div className="h-10 w-10 rounded-xl bg-foreground/[0.03] border border-foreground/5 flex items-center justify-center group-hover/feat:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-foreground/40" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-tight text-foreground/80">{feature.text}</span>
                      </div>
                      <Link href="#" className="h-8 w-8 rounded-full border border-foreground/5 flex items-center justify-center opacity-0 group-hover/feat:opacity-100 transition-all hover:bg-foreground hover:text-background translate-x-4 group-hover/feat:translate-x-0">
                         <MousePointer2 className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* 3. Architecture & Structure */}
            <section id="architecture">
              <div className="flex items-center gap-4 group">
                <Layers className="h-6 w-6 text-foreground/40 transition-transform group-hover:scale-110" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Architecture & Structure</h2>
              </div>
              <div className="space-y-6">
                <ul className="grid grid-cols-1 gap-3">
                   {project.architecture.map((item, idx) => (
                     <li key={idx} className="flex gap-4 items-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-foreground/20 mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">
                          <strong className="text-foreground/90 font-black uppercase text-[11px] tracking-widest mr-2">{item.split(':')[0]}:</strong>
                          {item.split(':')[1]}
                        </p>
                     </li>
                   ))}
                </ul>
              </div>
            </section>

             {/* 4. Tech Stack */}
             <section id="stack">
              <div className="flex items-center gap-4 group">
                <Cpu className="h-6 w-6 text-foreground/40 transition-transform group-hover:scale-110" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Tech Stack</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 {project.tags.map(tag => (
                   <div key={tag} className="p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/[0.05] hover:bg-foreground/[0.04] transition-colors flex flex-col gap-3">
                      <div className="h-10 w-10 rounded-xl bg-foreground/[0.03] border border-foreground/5 flex items-center justify-center">
                        <img 
                          src={`https://cdn.simpleicons.org/${getIconSlug(tag)}`} 
                          className="h-5 w-5 dark:invert opacity-70"
                          alt={tag}
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest text-foreground/70">{tag}</span>
                   </div>
                 ))}
              </div>
            </section>


            {/* Pagination */}
            <div className="pt-20 border-t border-foreground/10 grid grid-cols-1 md:grid-cols-2 gap-8">
               <Link href={`/work/${prevProject.slug}`} className="group p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/[0.06] hover:bg-foreground/[0.04] transition-all flex flex-col gap-4 text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Previous Project</span>
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full border border-foreground/10 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                        <ArrowLeft className="h-4 w-4" />
                     </div>
                     <span className="text-xl font-black uppercase tracking-tight">{prevProject.title}</span>
                  </div>
               </Link>

               <Link href={`/work/${nextProject.slug}`} className="group p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/[0.06] hover:bg-foreground/[0.04] transition-all flex flex-col gap-4 text-right items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Next Project</span>
                  <div className="flex items-center gap-4">
                     <span className="text-xl font-black uppercase tracking-tight">{nextProject.title}</span>
                     <div className="h-10 w-10 rounded-full border border-foreground/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="ml-1 h-4 w-4" />
                     </div>
                  </div>
               </Link>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0 relative">
            <div className="sticky top-32 space-y-10">
              <div className="space-y-4">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">On this page</p>
                <nav className="flex flex-col gap-1.5">
                  {sections.map((sec) => (
                    <a 
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`group flex items-center gap-3 py-1 text-[11px] font-bold uppercase tracking-widest transition-all ${
                        activeTab === sec.id ? 'text-foreground translate-x-1' : 'text-muted-foreground/50 hover:text-foreground'
                      }`}
                    >
                      <sec.icon className={`h-3.5 w-3.5 transition-opacity ${activeTab === sec.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
                      <span>{sec.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

               {/* Quick Contact Box */}
               <div className="p-8 rounded-[2rem] bg-foreground/[0.03] border border-foreground/[0.06] space-y-6 animate-shimmer-border">
                  <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-foreground/[0.03] border border-foreground/5">
                    <Smartphone className="h-5 w-5 text-foreground/40" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Interested?</p>
                    <p className="text-sm font-bold uppercase tracking-tight">Let's build something similar!</p>
                  </div>
                  <ContactModal>
                    <Button size="sm" className="w-full rounded-xl font-bold uppercase tracking-widest text-[9px] h-9 shadow-xl">
                       Get in touch
                    </Button>
                  </ContactModal>
               </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  )
}
