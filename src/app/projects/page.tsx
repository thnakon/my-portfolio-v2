"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { projects } from "@/data/projects";
import { useIntro } from "@/components/intro-context";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/language-context";


export default function WorkPage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setDone } = useIntro();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const parts = path.split("/");
      if (parts.length > 2 && parts[2]) {
        setSelectedSlug(parts[2]);
      }
    }
  }, []);

  // Scroll and Drag states
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const dragDistance = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const isHovered = useRef(false);

  // Framer motion values for smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring configuration for clean inertia slide
  const springConfig = { damping: 25, stiffness: 250, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    setDone(true);
  }, [setDone]);

  // Handle Trackpad and Mouse Wheel scroll mapping
  useEffect(() => {
    if (!mounted) return;
    
    const handleWheel = (e: WheelEvent) => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      // Map both vertical and horizontal scroll to horizontal scrollLeft
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      
      // Stop auto scroll while wheeling
      isHovered.current = true;
      
      // Update scroll position
      scrollContainer.scrollLeft += delta * 0.8;

      // Handle infinite wrap
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollContainer.scrollLeft >= halfWidth) {
        scrollContainer.scrollLeft = 0;
      } else if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft = halfWidth;
      }

      // Resume auto scroll after scrolling stops (500ms timeout)
      const timeoutId = (window as any).wheelScrollTimeout;
      if (timeoutId) clearTimeout(timeoutId);
      (window as any).wheelScrollTimeout = setTimeout(() => {
        isHovered.current = false;
      }, 500);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      const timeoutId = (window as any).wheelScrollTimeout;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [mounted]);

  // Auto scroll loop
  useEffect(() => {
    if (!mounted) return;
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      if (!isHovered.current && !isDragging) {
        scrollContainer.scrollLeft += 0.5; // Flow speed

        // Seamless wrap
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= halfWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId.current = requestAnimationFrame(autoScroll);
    };

    animationFrameId.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isDragging, mounted]);

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string, index: number) => {
    e.preventDefault();
    if (dragDistance.current > 5) return; // Prevent navigation if dragged
    setCurrentImageIndex(0);
    setSelectedSlug(slug);
    setSelectedIndex(index);
    window.history.pushState(null, '', `/projects/${slug}`);
  };

  const handleCloseDetail = () => {
    setSelectedSlug(null);
    setSelectedIndex(null);
    setCurrentImageIndex(0);
    window.history.pushState(null, '', '/projects');
  };

  const handleOverlayProjectSwitch = (newSlug: string) => {
    setCurrentImageIndex(0);
    setSelectedSlug(newSlug);
    setSelectedIndex(null);
    window.history.pushState(null, '', `/projects/${newSlug}`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Outer container drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    setIsDragging(true);
    isHovered.current = true;
    startX.current = e.pageX - scrollContainer.offsetLeft;
    scrollLeftStart.current = scrollContainer.scrollLeft;
    dragDistance.current = 0;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    isHovered.current = false;
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    if (!isDragging) return;

    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag sensitivity
    dragDistance.current = Math.abs(x - startX.current);
    scrollContainer.scrollLeft = scrollLeftStart.current - walk;

    // Handle seamless wrap on drag
    const halfWidth = scrollContainer.scrollWidth / 2;
    if (scrollContainer.scrollLeft >= halfWidth) {
      scrollContainer.scrollLeft = 0;
    } else if (scrollContainer.scrollLeft <= 0) {
      scrollContainer.scrollLeft = halfWidth;
    }
  };

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Handle seamless wrap for touch swiping
    const halfWidth = scrollContainer.scrollWidth / 2;
    if (scrollContainer.scrollLeft >= halfWidth) {
      scrollContainer.scrollLeft = 0;
    } else if (scrollContainer.scrollLeft <= 0) {
      scrollContainer.scrollLeft = halfWidth;
    }

    // Determine closest card to center of viewport
    const cards = scrollContainer.children[0]?.children;
    if (!cards || cards.length === 0) return;

    const containerCenter = scrollContainer.scrollLeft + scrollContainer.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    setActiveProjectIndex(closestIndex % projects.length);
  };

  if (!mounted) return null;

  const marqueeProjects = [...projects, ...projects];
  const selectedProject = projects.find((p) => p.slug === selectedSlug);

  return (
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden bg-white text-black flex flex-col justify-between p-4 sm:p-8 selection:bg-black selection:text-white">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Top Left: Back Button & Language Switcher */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50 flex items-center gap-4 sm:gap-6">
        <Link
          href="/"
          className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform duration-200 cursor-pointer shadow-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
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

      {/* Main Content Area (Left-aligned, stretching full width to match padding) */}
      <div className="w-full flex-1 flex flex-col justify-start space-y-8 pt-24">
        {/* Header */}
        <div className="space-y-1">
          <p className="text-[10px] font-normal text-neutral-400 tracking-[0.2em] uppercase">
            PROJECTS
          </p>
          <h1 className="text-[26px] sm:text-[30px] md:text-[34px] font-bold text-black tracking-tight leading-tight max-w-4xl">
            Projects that explore <br />
            full-stack development, AI engineering, <br />
            and interactive web systems.
          </h1>
        </div>

        {/* Horizontal Scroll list (Marquee - stretching edge-to-edge) */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleContainerMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onScroll={handleScroll}
          className="w-[calc(100%+4rem)] -mx-8 overflow-hidden py-20 -my-20 select-none overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex shrink-0 gap-8">
            {marqueeProjects.map((project, index) => (
              <Link
                href={`/projects/${project.slug}`}
                key={`${project.slug}-${index}`}
                onClick={(e) => handleProjectClick(e, project.slug, index)}
                onMouseEnter={() => {
                  setActiveProjectIndex(index % projects.length);
                }}
                onMouseMove={handleMouseMove}
                className="h-[220px] md:h-[280px] w-auto relative group shrink-0 cursor-pointer block select-none z-10 hover:z-30"
              >
                <motion.img
                  layoutId={`project-image-${project.slug}-${index}`}
                  src={project.image}
                  alt={project.title}
                  className="h-full w-auto object-cover select-none pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
                {/* Overlay with capsule button that follows the mouse */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <motion.div
                    className="absolute bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg uppercase tracking-wider whitespace-nowrap"
                    style={{
                      x: smoothX,
                      y: smoothY,
                      translateX: "-50%",
                      translateY: "-120%", // Offset slightly upwards from cursor
                    }}
                  >
                    View Project →
                  </motion.div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Left: Active Project Details */}
      <div className="max-w-xl w-full z-10 mt-4 md:mt-0 min-h-[40px] flex flex-col justify-end">
        <motion.div
          key={activeProjectIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="space-y-1"
        >
          <p className="text-[9px] font-normal text-neutral-400 tracking-[0.15em] uppercase leading-none">
            {projects[activeProjectIndex]?.tags.join(" / ")}
          </p>
          <h2 className="text-[13px] md:text-[14px] font-bold text-neutral-900 tracking-tight leading-none mt-1">
            {projects[activeProjectIndex]?.title} / {projects[activeProjectIndex]?.date}
          </h2>
        </motion.div>
      </div>

      {/* Case Study Details Overlay (Shared Layout Transition) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white z-50 p-8 flex flex-col justify-between"
          >
            {/* Top Navigation */}
            <div className="w-full flex items-center justify-between z-50">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleCloseDetail}
                  className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform duration-200 cursor-pointer shadow-md"
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

            {/* Main Grid Area with horizontal image slider */}
            {(() => {
              const allImages = [
                selectedProject.image,
                ...(selectedProject.hoverImage ? [selectedProject.hoverImage] : []),
                ...(selectedProject.stackImages || [])
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
                <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-8 md:py-0">
                  {/* Left Column: Project Details */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="col-span-1 md:col-span-5 flex flex-col justify-center space-y-6 md:pr-8"
                  >
                    <div>
                      <p className="text-[10px] font-normal text-neutral-400 tracking-[0.2em] uppercase">
                        {String(projects.findIndex(p => p.slug === selectedSlug) + 1).padStart(2, "0")} &nbsp;·&nbsp; {selectedProject.date}
                      </p>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-tight mt-1">
                        {selectedProject.title}
                      </h1>
                    </div>

                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">
                      {selectedProject.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 border-t border-neutral-100 pt-6">
                      <div>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">CATEGORY</p>
                        <p className="text-xs font-bold text-neutral-900 mt-1 uppercase">
                          {selectedProject.isAI ? "AI Engineering" : "Full-Stack Development"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">PERIOD</p>
                        <p className="text-xs font-bold text-neutral-900 mt-1 leading-relaxed">
                          {selectedProject.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">STACK</p>
                        <p className="text-xs font-bold text-neutral-900 mt-1 uppercase leading-relaxed">
                          {selectedProject.tags.slice(0, 3).join(" / ")}
                        </p>
                      </div>
                    </div>

                    {(selectedProject.liveUrl || selectedProject.githubUrl) && (
                      <div className="pt-2">
                        <Link 
                          href={selectedProject.liveUrl || selectedProject.githubUrl || "#"} 
                          target="_blank"
                          className="inline-block px-6 py-3 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-neutral-50 active:scale-95 transition-all duration-200"
                        >
                          View Site
                        </Link>
                      </div>
                    )}
                  </motion.div>

                  {/* Right Column: Hero Image Frame with Slider */}
                  <div className="col-span-1 md:col-span-7 w-full h-[300px] md:h-[60vh] relative bg-neutral-50 group overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        layoutId={currentImageIndex === 0 && selectedIndex !== null ? `project-image-${selectedProject.slug}-${selectedIndex}` : undefined}
                        src={allImages[currentImageIndex]}
                        alt={selectedProject.title}
                        initial={currentImageIndex === 0 ? false : { opacity: 0, x: 15 }}
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
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Bottom Bar: Thumbnails Navigation */}
            <div className="w-full flex items-center justify-end mt-4 md:mt-0">
              <div className="flex gap-2 items-center">
                {projects.map((p) => {
                  const isActive = p.slug === selectedSlug;
                  return (
                    <div key={p.slug} className="relative group/tooltip">
                      <button
                        onClick={() => handleOverlayProjectSwitch(p.slug)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
