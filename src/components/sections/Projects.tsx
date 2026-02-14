"use client";

import { Section } from "@/components/Section";
import { useLanguage } from "@/context/LanguageContext";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "An AI-powered dashboard for data visualization.",
    tech: ["Next.js", "Tailwind", "Python"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Project Beta",
    description: "A minimal e-commerce platform with Stripe integration.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "Real-time chat application using WebSockets.",
    tech: ["Vue", "Firebase", "WebRTC"],
    link: "#",
    github: "#",
  },
];

export function Projects() {
  const { t } = useLanguage();

  return (
    <Section id="projects">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold tracking-tight mb-12">{t("projects")}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-card rounded-[28px] border-2 border-border overflow-hidden hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <a
                  href={project.github}
                  className="p-2 rounded-full bg-background border border-border hover:bg-accent"
                  title="View Source"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={project.link}
                  className="p-2 rounded-full bg-background border border-border hover:bg-accent"
                  title="View Live"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground border-b border-border">
                [Preview Image]
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
