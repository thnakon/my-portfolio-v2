import type { Metadata } from "next";
import { Inter, Gochi_Hand, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const gochiHand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gochi",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const notoSansThai = Noto_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai"],
  variable: "--font-thai",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A minimalist developer portfolio",
  icons: {
    icon: "/favicon.png",
  },
};

import { IntroProvider } from "@/components/intro-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthContext } from "@/components/auth-context";
import { FixedNav } from "@/components/FixedNav";
import { Preloader } from "@/components/Preloader";
import { LanguageProvider } from "@/components/language-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${gochiHand.variable} ${geistMono.variable} ${notoSansThai.variable} font-sans antialiased`}
      >
        {/* Skip the entrance animation if it already played this session (no flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('intro-played'))document.documentElement.classList.add('intro-done')}catch(e){}",
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <AuthContext>
              <LanguageProvider>
                <IntroProvider>
                  <Preloader />
                  <div className="relative min-h-screen flex flex-col selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
                    <FixedNav />
                    {/* Fixed Navigation across all pages */}
                    <main className="flex-1 w-full h-full relative">
                      {children}
                    </main>
                  </div>
                </IntroProvider>
              </LanguageProvider>
            </AuthContext>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
