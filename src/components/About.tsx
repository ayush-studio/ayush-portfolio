"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Briefcase, Brain, Award } from "lucide-react";
import { ABOUT_SUMMARY, ABOUT_STATS } from "@/data/data";

const STAT_ICONS = [Briefcase, Award, Brain, Award];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/**
 * About — Professional summary with avatar, bio, and animated stats grid.
 */
export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">
            Get to know me
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Avatar / Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Animated gradient ring */}
              <div className="w-72 h-88 sm:w-80 sm:h-96 rounded-3xl p-[2px]"
                   style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6, #3b82f6)" }}>
                <div className="w-full h-full rounded-3xl glass flex flex-col items-center justify-center gap-3.5 relative overflow-hidden py-6">
                  {/* Background glow */}
                  <div className="absolute inset-0 opacity-20"
                       style={{ background: "radial-gradient(circle at 50% 50%, #6366f1, transparent 70%)" }} />
                  {/* Avatar Image */}
                  <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-indigo-500/30">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <Image
                        src="/profile.jpg"
                        alt="Ayush Kumar"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 112px, 128px"
                        priority
                      />
                    </div>
                  </div>
                  <div className="relative z-10 text-center px-4">
                    <p className="text-xl font-bold text-[var(--text-primary)]">Ayush Kumar</p>
                    <p className="text-sm text-[var(--accent)] font-medium">Frontend & AI Specialist</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">Deloitte USI · Bengaluru</p>
                    <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide glass border border-emerald-500/30 text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Available for High-Impact Roles
                    </div>
                  </div>
                  {/* Floating elements */}
                  <motion.div
                    className="absolute top-4 right-4 text-xs px-2 py-1 rounded-lg glass border border-indigo-500/30 text-indigo-400 font-mono"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {"<dev />"}
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4 text-xs px-2 py-1 rounded-lg glass border border-violet-500/30 text-violet-400 font-mono"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  >
                    {"AI ✦"}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold text-[var(--text-primary)]">
              Crafting Digital Experiences at the{" "}
              <span className="gradient-text">Intersection of AI & Design</span>
            </motion.h3>

            <motion.p variants={itemVariants} className="text-[var(--text-secondary)] leading-relaxed text-base">
              {ABOUT_SUMMARY}
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mt-2"
            >
              {ABOUT_STATS.map((stat, i) => {
                const Icon = STAT_ICONS[i];
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="glass rounded-xl p-4 border border-[var(--border-color)] hover:border-[var(--accent)]/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} className="text-[var(--accent)]" />
                      <span className="text-xs text-[var(--text-secondary)] font-medium">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
