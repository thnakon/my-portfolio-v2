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
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium rounded-full bg-muted/50 border-muted-foreground/20 hover:bg-muted transition-colors cursor-pointer group">
              <span className="text-muted-foreground mr-1.5">Introducing</span> 
              <span>Scribe v2 Realtime</span>
              <ChevronRight className="ml-1 h-3.5 w-3.5 inline-block group-hover:translate-x-0.5 transition-transform" />
            </Badge>
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
