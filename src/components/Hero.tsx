"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, Sparkles, FileText, Command, Copy, Check, Clock } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useToast } from "./Toast";
import { RECRUITER_QUICK_FACTS } from "@/data/data";

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

/**
 * Hero — Production-grade landing section with:
 * - Live Bengaluru status & availability ticker
 * - Recruiter Quick-View modal trigger
 * - Command palette shortcut pill (Cmd+K)
 * - Staggered entrance animations
 * - Floating mesh glow orbs
 * - Animated CTA buttons & quick email copy
 */
export default function Hero() {
  const { showToast } = useToast();
  const [bengaluruTime, setBengaluruTime] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        setBengaluruTime(formatter.format(now) + " IST");
      } catch {
        setBengaluruTime("UTC+5:30");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const openRecruiterModal = () => {
    window.dispatchEvent(new CustomEvent("open-recruiter-modal"));
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(RECRUITER_QUICK_FACTS.email);
    setCopiedEmail(true);
    showToast("Email copied to clipboard! (ayushkumaar41@gmail.com)");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Top Availability & Location Pill */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium glass border border-emerald-500/30 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AVAILABLE FOR HIGH-IMPACT UI ROLES
            </span>

            {bengaluruTime && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono glass border border-[var(--border-color)] text-[var(--text-secondary)]">
                <Clock size={12} className="text-[var(--accent)]" />
                Bengaluru · {bengaluruTime}
              </span>
            )}
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] max-w-4xl"
          >
            Hi, I&apos;m <span className="gradient-text">Ayush.</span>
            <span className="block mt-2 sm:mt-3 text-3xl sm:text-5xl lg:text-6xl text-[var(--text-primary)]">
              Senior Frontend &amp;{" "}
              <span className="gradient-text">AI Systems Architect</span>
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed"
          >
            Frontend Developer at <span className="text-[var(--text-primary)] font-semibold">Deloitte USI</span> (2024 – Present) crafting
            high-throughput web systems, deterministic code analysis engines, and GenAI workflows.{" "}
            <span className="text-[var(--text-primary)] font-medium">
              Obsessed with 60FPS render budgets, typed architectures, and micro-craft.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2"
          >
            <motion.button
              id="cta-view-work"
              onClick={() => scrollTo("projects")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 sm:px-7 py-3 rounded-xl font-semibold text-sm sm:text-base text-white cursor-pointer
                         bg-gradient-to-r from-indigo-500 to-violet-600
                         shadow-lg shadow-indigo-500/25
                         hover:shadow-indigo-500/45 transition-all duration-300"
            >
              Explore Flagship Work
            </motion.button>

            {/* Recruiter Cheat Sheet Button */}
            <motion.button
              onClick={openRecruiterModal}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm sm:text-base cursor-pointer
                         glass border border-[var(--accent)]/50 text-[var(--accent)]
                         hover:bg-[var(--accent)]/10 transition-colors duration-300 inline-flex items-center gap-2"
            >
              <Sparkles size={16} />
              Recruiter Cheat Sheet
            </motion.button>

            <motion.button
              id="cta-contact"
              onClick={() => scrollTo("contact")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm sm:text-base cursor-pointer
                         glass border border-[var(--border-color)]
                         hover:border-[var(--accent)] text-[var(--text-primary)]
                         transition-colors duration-300"
            >
              Contact Me
            </motion.button>

            <motion.a
              id="cta-resume"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 sm:px-5 py-3 rounded-xl font-semibold text-sm sm:text-base cursor-pointer
                         inline-flex items-center gap-2
                         glass border border-[var(--border-color)] text-[var(--text-secondary)]
                         hover:text-[var(--text-primary)] hover:border-[var(--border-color)] transition-colors duration-300"
            >
              <FileText size={16} />
              Resume
            </motion.a>
          </motion.div>

          {/* Command Palette Hint & Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-3"
          >
            {/* Quick Command Trigger Pill */}
            <button
              onClick={openCommandPalette}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40 transition-colors cursor-pointer"
            >
              <Command size={12} className="text-[var(--accent)]" />
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--border-color)] text-[10px]">⌘K</kbd>
              <span>or click for Command Menu</span>
            </button>

            {/* Quick Social & Copy */}
            <div className="flex items-center gap-4 text-[var(--text-secondary)]">
              <button
                onClick={copyEmail}
                className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                title="Click to copy email"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedEmail ? "Copied!" : "ayushkumaar41@gmail.com"}</span>
              </button>

              <span className="text-[var(--border-color)]">|</span>

              <a
                href="https://github.com/ayush-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/ayush-kumar-017640191/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer"
            onClick={() => scrollTo("about")}
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
