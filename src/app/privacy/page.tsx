import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
        
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        
        <div className="space-y-12 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Introduction</h2>
            <p>
              Your privacy is important to me. This Privacy Policy explains how I collect, use, and protect your information when you visit my portfolio website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Information Collection</h2>
            <p>
              I only collect information that you voluntarily provide through the contact form or guestbook, such as your name, email address, and message content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Use of Information</h2>
            <p>
              The information collected is used solely to respond to your inquiries or display your contributions in the guestbook. I do not sell or share your data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Cookies</h2>
            <p>
              This site may use basic cookies to enhance user experience, such as remembering your theme preference or managing session states.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Contact Me</h2>
            <p>
              If you have any questions about this Privacy Policy, please feel free to reach out via the contact form on the home page.
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
