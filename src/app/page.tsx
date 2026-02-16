import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto px-4 pt-12 pb-16 text-center lg:pt-20">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2.5 px-0 py-0 text-[12px] font-medium transition-colors cursor-pointer group">
              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-semibold text-[11px]">
                Upcoming
              </span>
              <span className="text-foreground/90 font-medium animate-shimmer-text">A new project is launching soon!</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/70 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6">
            ElevenLabs UI
          </h1>
          
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
            A collection of Open Source agent and audio components that you can customize and extend.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-xl px-8 font-semibold">
              Get Started
            </Button>
            <Button variant="ghost" size="lg" className="rounded-xl px-8 font-semibold">
              View Components
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
