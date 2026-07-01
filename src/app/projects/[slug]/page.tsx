"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/language-context";


export default function ProjectPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  const handleBack = () => {
    router.push("/projects");
  };

  const handleProjectSwitch = (newSlug: string) => {
    if (newSlug === slug) return;
    router.push(`/projects/${newSlug}`);
  };

  if (!mounted) return null;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-white text-black">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-black text-white rounded-md font-bold uppercase tracking-wider text-xs"
        >
          Back to Work
        </button>
      </div>
    );
  }

  const formattedIndex = String(projectIndex + 1).padStart(2, "0");
  const category = project.isAI ? "AI Engineering" : "Full-Stack Development";
  
  const allImages = [
    project.image,
    ...(project.hoverImage ? [project.hoverImage] : []),
    ...(project.stackImages || [])
  ];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden bg-white text-black flex flex-col justify-between p-8 selection:bg-black selection:text-white">
      {/* Top Navigation */}
      <div className="w-full flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform duration-200 cursor-pointer shadow-md animate-shimmer-border"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase">
            <button
              onClick={() => setLanguage("en")}
              className={`cursor-pointer transition-all duration-200 ${
                language === "en"
                  ? "text-black dark:text-white font-bold"
                  : "text-neutral-400 dark:text-neutral-500 font-normal hover:text-black dark:hover:text-white"
              }`}
            >
              EN
            </button>
            <span className="text-neutral-300 dark:text-neutral-800">/</span>
            <button
              onClick={() => setLanguage("th")}
              className={`cursor-pointer transition-all duration-200 ${
                language === "th"
                  ? "text-black dark:text-white font-bold"
                  : "text-neutral-400 dark:text-neutral-500 font-normal hover:text-black dark:hover:text-white"
              }`}
            >
              TH
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-8 md:py-0">
        {/* Left Column: Project Details */}
        <div className="col-span-1 md:col-span-5 flex flex-col justify-center space-y-6 md:pr-8">
          <div>
            <p className="text-[10px] font-normal text-neutral-400 tracking-[0.2em] uppercase">
              {formattedIndex} &nbsp;·&nbsp; {project.date}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-tight mt-1">
              {project.title}
            </h1>
          </div>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">
            {project.description}
          </p>

          <div className="grid grid-cols-3 gap-4 border-t border-neutral-100 pt-6">
            <div>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">CATEGORY</p>
              <p className="text-xs font-bold text-neutral-900 mt-1 uppercase">{category}</p>
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">PERIOD</p>
              <p className="text-xs font-bold text-neutral-900 mt-1 leading-relaxed">
                {project.date}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">STACK</p>
              <p className="text-xs font-bold text-neutral-900 mt-1 uppercase leading-relaxed">
                {project.tags.slice(0, 3).join(" / ")}
              </p>
            </div>
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="pt-2">
              <Link 
                href={project.liveUrl || project.githubUrl || "#"} 
                target="_blank"
                className="inline-block px-6 py-3 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-neutral-50 active:scale-95 transition-all duration-200"
              >
                View Site
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Hero Image Frame */}
        <div className="col-span-1 md:col-span-7 w-full h-[300px] md:h-[60vh] relative bg-neutral-50 group overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={allImages[currentImageIndex]}
              alt={project.title}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-black shadow-md border border-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-black shadow-md border border-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Slider Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentImageIndex
                        ? "w-4 h-1.5 bg-black"
                        : "w-1.5 h-1.5 bg-black/30 hover:bg-black/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Bar: Thumbnails Navigation */}
      <div className="w-full flex items-center justify-end mt-4 md:mt-0">
        <div className="flex gap-2 items-center">
          {projects.map((p) => {
            const isActive = p.slug === slug;
            return (
              <div key={p.slug} className="relative group/tooltip">
                <button
                  onClick={() => handleProjectSwitch(p.slug)}
                  className={`relative h-8 w-12 overflow-hidden transition-all duration-300 ease-out ${
                    isActive 
                      ? "opacity-100 -translate-y-1.5 cursor-default" 
                      : "opacity-40 translate-y-0 hover:opacity-100 hover:-translate-y-1.5"
                  }`}
                >
                  <img src={p.image} className="h-full w-full object-cover" alt={p.title} />
                </button>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-black text-white text-[10px] font-bold tracking-wider rounded uppercase whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 z-50 shadow-md">
                  {p.title}
                  {/* Tiny arrow pointing down */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-black w-0 h-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
