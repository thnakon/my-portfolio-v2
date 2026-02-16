"use client";

import { Section } from "@/components/Section";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "An AI-powered dashboard for data visualization.",
    tech: ["Next.js", "Tailwind", "Python"],
    link: "#",
    github: "#",
    icon: "lni-graph",
  },
  {
    id: 2,
    title: "Project Beta",
    description: "A minimal e-commerce platform with Stripe integration.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#",
    github: "#",
    icon: "lni-cart",
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "Real-time chat application using WebSockets.",
    tech: ["Vue", "Firebase", "WebRTC"],
    link: "#",
    github: "#",
    icon: "lni-comments",
  },
];

export function Projects() {
  const { t, language } = useLanguage();

  return (
    <Section id="projects">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tighter flex items-center gap-4">
               <i className="lni lni-layers text-primary"></i>
               {t("projects")}
            </h2>
            <p className="text-muted-foreground">{language === 'en' ? 'Selected works and experiments.' : 'ผลงานและโปรเจกต์ที่ได้รับเลือก'}</p>
          </div>
          <Button variant="outline" className="gap-2">
            View All <i className="lni lni-arrow-right"></i>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group hover:border-primary/50 transition-colors"
            >
              <div className="aspect-[16/10] bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center text-zinc-300 dark:text-zinc-700 border-b border-border overflow-hidden relative">
                <i className={`lni ${project.icon} text-6xl opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500`}></i>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <a
                    href={project.github}
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    title="View Source"
                  >
                    <i className="lni lni-github-original"></i>
                  </a>
                  <a
                    href={project.link}
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    title="View Live"
                  >
                    <i className="lni lni-world"></i>
                  </a>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-[10px] font-bold px-2.5"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
