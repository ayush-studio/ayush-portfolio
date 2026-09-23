"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Mail, Sparkles, FileText } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

/**
 * Hero — Full-viewport landing section with:
 * - Staggered text animations
 * - Floating gradient orbs
 * - Grid background overlay
 * - Animated CTA buttons
 * - Social quick-links
 */
export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }}
        animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--accent)]/40 text-sm font-medium text-[var(--accent)]">
              <Sparkles size={14} className="animate-pulse" />
              Frontend Developer · AI Integrations · Deloitte USI
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] max-w-4xl"
          >
            Hi, I&apos;m <span className="gradient-text">Ayush.</span>
            <span className="block mt-3 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl text-[var(--text-primary)]">
              Frontend Developer &amp;{" "}
              <span className="gradient-text">AI Specialist</span>
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed"
          >
            Crafting enterprise-scale applications and AI-driven user
            experiences.{" "}
            <span className="text-[var(--text-primary)] font-medium">
              Bridging the gap between intuitive design, robust architecture,
              and generative AI.
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-xl font-semibold text-white cursor-pointer
                         bg-gradient-to-r from-indigo-500 to-violet-600
                         shadow-lg shadow-indigo-500/30
                         hover:shadow-indigo-500/50 transition-shadow duration-300"
            >
              View My Work
            </motion.button>
            <motion.button
              id="cta-contact"
              onClick={() => scrollTo("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-xl font-semibold cursor-pointer
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl font-semibold cursor-pointer
                         inline-flex items-center gap-2
                         glass border border-[var(--accent)]/40 text-[var(--accent)]
                         hover:bg-[var(--accent)]/10 transition-colors duration-300"
            >
              <FileText size={16} />
              Resume (PDF)
            </motion.a>
          </motion.div>

          {/* Social Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-2"
          >
            {[
              {
                href: "https://github.com/ayush-studio",
                Icon: FaGithub,
                label: "GitHub",
              },
              {
                href: "https://www.linkedin.com/in/ayush-kumar-017640191/",
                Icon: FaLinkedinIn,
                label: "LinkedIn",
              },
              {
                href: "mailto:ayushkumaar41@gmail.com",
                Icon: Mail,
                label: "Email",
              },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200"
                aria-label={label}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--text-secondary)] cursor-pointer"
            onClick={() => scrollTo("about")}
          >
            <ArrowDown size={22} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
