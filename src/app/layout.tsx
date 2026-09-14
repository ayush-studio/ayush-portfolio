import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayush — Frontend Developer & AI Integrations",
  description:
    "Personal portfolio of Ayush, a Frontend Developer with 2.5+ years at Deloitte USI specializing in React, Angular, TypeScript, and AI-driven web applications.",
  keywords: [
    "Frontend Developer",
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
    title: "Ayush — Frontend Developer & AI Integrations",
    description:
      "Frontend Developer with 2.5+ years at Deloitte USI. Building scalable enterprise apps and AI-driven user experiences.",
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
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
