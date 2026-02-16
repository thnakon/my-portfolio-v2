import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A minimalist developer portfolio",
  icons: {
    icon: "/favicon.png",
  },
};

import { Navbar } from "@/components/Navbar";
import { SidebarLabel } from "@/components/SidebarLabel";
import { IntroProvider } from "@/components/intro-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <IntroProvider>
            <div className="relative min-h-screen">
              <SidebarLabel />
              <Navbar />
              {children}
            </div>
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
