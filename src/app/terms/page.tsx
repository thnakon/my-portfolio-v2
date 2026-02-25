import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <div className="container mx-auto px-8 py-20 max-w-3xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        
        <div className="space-y-12 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using this portfolio website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Use License</h2>
            <p>
              The content on this website, including projects, designs, and code snippets, is for portfolios and display purposes only. Unauthorized reproduction or distribution is prohibited unless explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Disclaimer</h2>
            <p>
              The materials on this website are provided on an 'as is' basis. I make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Limitations</h2>
            <p>
              In no event shall I be liable for any damages arising out of the use or inability to use the materials on this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-8 border-t border-foreground/5 text-[10px] uppercase tracking-widest font-mono text-muted-foreground/40 text-center">
          Last updated: February 2026
        </div>
      </div>
    </div>
  );
}
