import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import { ToastProvider } from "@/components/Toast";
import AppModals from "@/components/AppModals";
import DeveloperHUD from "@/components/DeveloperHUD";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayush — Frontend Developer & AI Systems Architect",
  description:
    "Personal portfolio of Ayush, a Frontend Developer at Deloitte USI (2024 – Present) specializing in React, Angular, TypeScript, performance engineering, and AI-driven web architectures.",
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
      "Frontend Developer at Deloitte USI (2024 – Present). Building scalable enterprise apps, deterministic static code analyzers, and AI-driven user experiences.",
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Ayush Kumar",
                jobTitle: "Senior Frontend Developer & AI Systems Architect",
                worksFor: {
                  "@type": "Organization",
                  name: "Deloitte USI",
                },
                url: "https://ayush-portfolio.vercel.app",
                sameAs: [
                  "https://github.com/ayush-studio",
                  "https://www.linkedin.com/in/ayush-kumar-017640191/",
                ],
                knowsAbout: [
                  "React",
                  "Angular",
                  "Next.js",
                  "TypeScript",
                  "JavaScript",
                  "GraphQL",
                  "FastAPI",
                  "Deterministic Static Code Analysis",
                  "Generative AI Workflows",
                ],
              }),
            }}
          />
          <ToastProvider>
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <DeveloperHUD />
            <AppModals />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
