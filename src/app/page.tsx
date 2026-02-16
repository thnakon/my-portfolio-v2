import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowDown, ArrowRight } from "lucide-react";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ContactModal } from "@/components/ContactModal";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col relative overflow-hidden">
      <main className="flex-1 flex flex-col items-center pt-20 lg:pt-32">
        <section className="container mx-auto px-4 pb-16 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2.5 px-0 py-0 text-[12px] font-medium transition-colors cursor-pointer group">
              <span className="px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground border border-muted-foreground/20 font-bold text-[10px] uppercase tracking-wider">
                Upcoming
              </span>
              <span className="text-foreground/90 font-medium animate-shimmer-text">A new project is launching soon!</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/70 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Building things for the web
          </h1>
          
          <div className="mx-auto max-w-[800px] text-muted-foreground text-base md:text-lg mb-10 leading-relaxed flex items-center justify-center flex-wrap gap-x-3">
            <span>Hello I&apos;m Thanakon</span>
            <div className="relative group cursor-pointer inline-flex items-center justify-center align-middle mx-1">
              <span className="absolute bottom-0 -right-1 text-2xl opacity-0 group-hover:opacity-100 animate-wave pointer-events-none transition-opacity duration-300 z-30">
                👋
              </span>
              <span className="inline-flex items-center justify-center h-14 w-14 rounded-full overflow-hidden border-2 border-background shadow-xl flex-shrink-0 relative z-20 transition-transform duration-300 group-hover:scale-105">
                <Image 
                  src="/profile-v3.jpg" 
                  alt="Thanakon" 
                  width={56} 
                  height={56} 
                  className="object-cover h-full w-full scale-125"
                />
              </span>
            </div>
            <span>AI Driven Developer</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ContactModal>
              <Button size="lg" className="rounded-xl px-8 font-semibold transition-all hover:scale-[1.02] flex items-center gap-2">
                Let&apos;s Connect <ArrowRight className="h-4 w-4" />
              </Button>
            </ContactModal>
            <CopyEmailButton />
          </div>
        </section>
      </main>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 inset-x-0 pointer-events-none hidden md:block">
        <div className="max-w-[1600px] mx-auto px-8">
          <div 
            className="flex items-center gap-2 cursor-pointer group pointer-events-auto w-fit"
            style={{ marginLeft: '64px' }} // Align with 'About' after logo (32px logo + 32px gap)
          >
            <span className="text-[13px] font-medium text-muted-foreground/60 group-hover:text-foreground transition-colors">
              Scroll down
            </span>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-y-0.5 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}
