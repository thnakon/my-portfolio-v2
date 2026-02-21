"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Code2, Github, User, Linkedin, ArrowRight, Star, Users, BookOpen, Instagram } from "lucide-react"
import Image from "next/image"
import { GitHubCalendar } from 'react-github-calendar'
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function AboutSection() {
  const [stats, setStats] = useState({ followers: 0, repos: 0, stars: 0 });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchStats = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/thnakon');
        const userData = await userRes.json();
        
        // Fetch all repos to count stars (handling pagination if needed, but thnakon has < 100)
        const reposRes = await fetch('https://api.github.com/users/thnakon/repos?per_page=100');
        const reposData = await reposRes.json();
        const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

        setStats({
          followers: userData.followers || 0,
          repos: userData.public_repos || 0,
          stars: totalStars || 0
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
    >
      {/* Left Column: Image */}
      <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6">
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border bg-muted group shadow-2xl shadow-foreground/5">
          <Image 
            src="/profile-v3.jpg" 
            alt="Thanakon" 
            fill 
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://linkedin.com/in/thanakon-d" target="_blank" className="h-12 w-12 rounded-2xl border bg-card shadow-sm flex items-center justify-center transition-all hover:shadow-md hover:translate-y-[-2px] group">
            <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
          <a href="https://github.com/thnakon" target="_blank" className="h-12 w-12 rounded-2xl border bg-card shadow-sm flex items-center justify-center transition-all hover:shadow-md hover:translate-y-[-2px] group">
            <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
          <a href="https://instagram.com/thnakon" target="_blank" className="h-12 w-12 rounded-2xl border bg-card shadow-sm flex items-center justify-center transition-all hover:shadow-md hover:translate-y-[-2px] group">
            <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
        </div>
      </motion.div>

      {/* Middle Column: Intro Text */}
      <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight uppercase">About Me</h2>
          <div className="h-1 w-12 bg-foreground" />
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Hello, I&apos;m Thanakon. A software developer redefining system architecture through the lens of AI. I don&apos;t just use AI to write code; I embrace it as a &apos;co-thinker and co-builder&apos; at every stage of the process.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          I specialize in integrating LLMs and AI Agents into real-world workflows, elevating software with the ability to think and analyze beyond traditional limits. By leveraging Laravel and Next.js with an AI-first mindset, I build intelligent systems that transform how users interact with technology.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          I believe the future of software development lies in AI-driven innovation. My goal is to create high-performance, intelligent applications that drive sustainable business growth and deliver lasting value in an ever-evolving digital landscape.
        </p>
      </motion.div>

      {/* Right Column: Interaction */}
      <motion.div variants={itemVariants} className="lg:col-span-5 w-full">
        <Tabs defaultValue="github" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 rounded-xl p-1 mb-8">
            <TabsTrigger value="github" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Github className="h-3.5 w-3.5 mr-2" />
              GitHub
            </TabsTrigger>
            <TabsTrigger value="skills" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Code2 className="h-3.5 w-3.5 mr-2" />
              Skillset
            </TabsTrigger>
            <TabsTrigger value="identity" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <User className="h-3.5 w-3.5 mr-2" />
              Identity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="github" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col gap-6">
                  {/* Contribution Graph */}
                  <div className="w-full overflow-hidden bg-background/50 rounded-xl p-4 border flex flex-col items-center min-h-[180px] justify-center">
                    {!mounted ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="flex gap-1">
                          {[...Array(20)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-muted animate-pulse rounded-sm" />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-full text-center mb-4">
                          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">Contribution Graph</h4>
                        </div>
                        <GitHubCalendar 
                          username="thnakon" 
                          fontSize={12}
                          blockSize={11}
                          blockMargin={4}
                          colorScheme="light"
                          theme={{
                            light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                          }}
                          transformData={(data) => {
                            const fiveMonthsAgo = new Date();
                            fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);
                            return data.filter(day => new Date(day.date) >= fiveMonthsAgo);
                          }}
                        />
                      </>
                    )}
                  </div>

                  {/* GitHub Stats Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border bg-background/50 rounded-xl p-3 flex flex-col items-center justify-center gap-1 text-center font-mono">
                      <Users className="h-4 w-4 text-muted-foreground/60" />
                      <span className="text-lg font-bold">{loading ? "--" : stats.followers}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Followers</span>
                    </div>
                    <div className="border bg-background/50 rounded-xl p-3 flex flex-col items-center justify-center gap-1 text-center font-mono">
                      <BookOpen className="h-4 w-4 text-muted-foreground/60" />
                      <span className="text-lg font-bold">{loading ? "--" : stats.repos}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Repos</span>
                    </div>
                    <div className="border bg-background/50 rounded-xl p-3 flex flex-col items-center justify-center gap-1 text-center font-mono">
                      <Star className="h-4 w-4 text-muted-foreground/60" />
                      <span className="text-lg font-bold">{loading ? "--" : stats.stars}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Stars</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/70">Frontend Craft</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Expertise in Next.js, React, and GSAP/Framer Motion for creating fluid, motion-driven interfaces.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/70">AI Integration</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Implementing LLMs, vector databases (RAG), and agentic workflows to build intelligent software solutions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="identity" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold uppercase tracking-wide">
                      What drives my curiosity?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      The rapid evolution of Large Language Models and their potential to transform how we interact with technology. I enjoy exploring the limits of what automated agents can do.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b-0">
                    <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold uppercase tracking-wide">
                      Outside of coding?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      I&apos;m an avid learner of design trends, architectural patterns, and occasional coffee enthusiast. I believe a balanced life fuels creativity.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <a 
            href="#experience" 
            className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Review Experience
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
