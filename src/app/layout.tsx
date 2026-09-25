import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import { ToastProvider } from "@/components/Toast";
import AppModals from "@/components/AppModals";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayush — Frontend Developer & AI Systems Architect",
  description:
    "Personal portfolio of Ayush, a Frontend Developer with 2.5+ years at Deloitte USI specializing in React, Angular, TypeScript, performance engineering, and AI-driven web architectures.",
  keywords: [
    "Frontend Developer",
    "Senior UI Engineer",
    "React",
    "Angular",
    "Next.js",
    "TypeScript",
    "AI Integration",
    "Deloitte",
    "Portfolio",
  ],
  authors: [{ name: "Ayush Kumar", url: "https://www.linkedin.com/in/ayush-kumar-017640191/" }],
  openGraph: {
    title: "Ayush — Frontend Developer & AI Systems Architect",
    description:
      "Frontend Developer with 2.5+ years at Deloitte USI. Building scalable enterprise apps, deterministic static code analyzers, and AI-driven user experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ToastProvider>
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <AppModals />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
