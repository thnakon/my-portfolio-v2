"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Plus, X, ExternalLink } from "lucide-react"

interface HardwareItem {
  id: string
  name: string
  detail: string
  image: string
  edition?: string
  specs: {
    label: string
    value: string
  }[]
}

const hardware: HardwareItem[] = [
  {
    id: "macbook",
    name: "Macbook Air M2",
    detail: "13.6-INCH",
    image: "/uses/macbook.png", // User to provide
    edition: "MIDNIGHT EDITION",
    specs: [
      { label: "COLOR", value: "Midnight" },
      { label: "DISPLAY", value: "Liquid Retina" },
      { label: "CHIP", value: "Apple M2" },
      { label: "RAM", value: "16GB" }
    ]
  },
  {
    id: "lofree",
    name: "Lofree Flow",
    detail: "LOW-PROFILE",
    image: "/uses/keyboard.png", // User to provide
    specs: [
      { label: "TYPE", value: "Mechanical" },
      { label: "SWITCHES", value: "Ghost / Phantom" },
      { label: "LAYOUT", value: "75%" },
      { label: "MATERIAL", value: "Aluminum" }
    ]
  },
  {
    id: "logitech",
    name: "Logitech G Pro",
    detail: "WIRELESS",
    image: "/uses/mouse.png", // User to provide
    specs: [
      { label: "SENSOR", value: "HERO 25K" },
      { label: "WEIGHT", value: "80g" },
      { label: "BATTERY", value: "60h+" },
      { label: "SWITCHES", value: "Mechanical" }
    ]
  },
  {
    id: "asus",
    name: "ASUS ProArt",
    detail: "27\" 4K HDR",
    image: "/uses/monitor.png", // User to provide
    specs: [
      { label: "RESOLUTION", value: "3840 x 2160" },
      { label: "PANEL", value: "IPS / HDR10" },
      { label: "COLOR", value: "100% sRGB" },
      { label: "CALIBRATION", value: "Calman Verified" }
    ]
  }
]

export function HardwareShowcase() {
  const [selectedId, setSelectedId] = useState(hardware[0].id)
  const activeItem = hardware.find(h => h.id === selectedId) || hardware[0]

  return (
    <div className="relative w-full aspect-[16/9] max-h-[700px] bg-[#F3F3F3] rounded-[40px] overflow-hidden border border-white shadow-sm font-sans flex items-center p-8 md:p-16">
      
      {/* Visit Website Button */}
      <div className="absolute top-8 right-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[10px] font-bold tracking-widest uppercase text-black/80 shadow-sm border border-black/[0.03] transition-transform hover:scale-105 active:scale-95">
          Visit Website
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="w-full h-full grid grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Spec Card & Selectors */}
        <div className="col-span-12 md:col-span-5 h-full flex flex-col justify-between py-4">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[32px] p-8 shadow-xl shadow-black/[0.02] w-full max-w-[360px]"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-black/90 leading-tight">{activeItem.name}</h3>
                  <p className="text-[10px] font-black tracking-widest text-black/30 uppercase">{activeItem.detail}</p>
                </div>
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                  <X className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                {activeItem.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center py-2 border-b border-black/[0.03] last:border-0">
                    <span className="text-[9px] font-black tracking-widest text-black/40 uppercase">{spec.label}</span>
                    <span className="text-[11px] font-bold text-black/80">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* List Selectors */}
          <div className="flex flex-col gap-3 mt-8">
            {hardware.map((item) => {
              const isActive = selectedId === item.id;
              if (isActive) return null; // Only show other items in the "add" list style
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className="group flex items-center gap-4 px-5 py-3 bg-white rounded-full w-fit shadow-sm border border-black/[0.02] transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="h-6 w-6 bg-black rounded-full flex items-center justify-center transition-transform group-hover:rotate-90">
                    <Plus className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-black/90 leading-tight">{item.name}</p>
                    <p className="text-[8px] font-black tracking-widest text-black/30 uppercase">{item.detail}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Product Image */}
        <div className="col-span-12 md:col-span-7 relative h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-square max-w-[500px]"
            >
              {/* Fallback box if image missing */}
              <div className="absolute inset-0 bg-black/[0.02] rounded-3xl flex items-center justify-center overflow-hidden border border-black/[0.05]">
                <Image
                  src={activeItem.image}
                  alt={activeItem.name}
                  fill
                  className="object-contain p-4 drop-shadow-2xl"
                  onError={(e) => {
                    // Just show the text if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {!activeItem.image && (
                  <p className="text-[11px] font-bold text-black/20 uppercase tracking-widest">Image Placeholder</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Edition Pill */}
          {activeItem.edition && (
            <div className="absolute bottom-4 right-4 bg-white rounded-full px-5 py-2.5 shadow-sm border border-black/[0.03] flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-[#2C313C]" />
              <span className="text-[9px] font-black tracking-[0.15em] text-black/80">{activeItem.edition}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
