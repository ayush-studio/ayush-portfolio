"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Trophy, Zap, Clock, ShieldCheck } from "lucide-react";
import { EXPERIENCE } from "@/data/data";

/**
 * ExperienceTimeline — Vertical animated timeline for work history.
 * Each bullet fades in when scrolled into view.
 */
export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative bg-[var(--bg-secondary)]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 opacity-30"
           style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.1), transparent 60%)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">
            03 // Career Journey &amp; Enterprise Impact
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
            Professional <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Quick Impact Metrics Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10"
        >
          <div className="glass rounded-xl p-3.5 border border-[var(--border-color)] text-center hover:border-amber-400/40 transition-colors">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
              <Trophy size={15} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Recognition</span>
            </div>
            <p className="text-base font-bold text-[var(--text-primary)]">Deloitte Applause</p>
            <p className="text-[11px] text-[var(--text-secondary)]">Rapid AI UI Delivery</p>
          </div>

          <div className="glass rounded-xl p-3.5 border border-[var(--border-color)] text-center hover:border-indigo-400/40 transition-colors">
            <div className="flex items-center justify-center gap-1.5 text-indigo-400 mb-1">
              <Zap size={15} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Performance</span>
            </div>
            <p className="text-base font-bold text-[var(--text-primary)]">15–20% Faster</p>
            <p className="text-[11px] text-[var(--text-secondary)]">Via GraphQL Queries</p>
          </div>

          <div className="glass rounded-xl p-3.5 border border-[var(--border-color)] text-center hover:border-emerald-400/40 transition-colors">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
              <Clock size={15} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Velocity</span>
            </div>
            <p className="text-base font-bold text-[var(--text-primary)]">4 Weeks</p>
            <p className="text-[11px] text-[var(--text-secondary)]">Healthcare AI Shipped</p>
          </div>

          <div className="glass rounded-xl p-3.5 border border-[var(--border-color)] text-center hover:border-purple-400/40 transition-colors">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 mb-1">
              <ShieldCheck size={15} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Scale</span>
            </div>
            <p className="text-base font-bold text-[var(--text-primary)]">Enterprise UI</p>
            <p className="text-[11px] text-[var(--text-secondary)]">Angular, React & FastAPI</p>
          </div>
        </motion.div>

        {/* Timeline */}
        {EXPERIENCE.map((exp) => (
          <div key={exp.company} className="relative">
            {/* Role Card Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass rounded-2xl p-6 mb-8 border border-[var(--border-color)] hover:border-[var(--accent)]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    {exp.role}
                  </h3>
                  <p className="text-lg font-semibold gradient-text">{exp.company}</p>
                </div>
                <div className="flex flex-col gap-1.5 text-sm text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[var(--accent)]" />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-[var(--accent)]" />
                    {exp.location}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Vertical Timeline Line */}
            <div className="relative pl-8 ml-4">
              {/* The line */}
              <div className="absolute left-0 top-0 bottom-4 w-px bg-gradient-to-b from-[var(--accent)] to-transparent" />

              {/* Bullet Points */}
              <div className="space-y-6">
                {exp.bullets.map((bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.07,
                      ease: "easeOut",
                    }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[2.15rem] top-1.5 w-3 h-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-primary)]">
                      <div className="absolute inset-0.5 rounded-full bg-[var(--accent)] opacity-60" />
                    </div>

                    {/* Content */}
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="glass rounded-xl p-4 border border-[var(--border-color)] hover:border-[var(--accent)]/30 transition-colors cursor-default"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl mt-0.5 flex-shrink-0">{bullet.icon}</span>
                        <div className="flex-1">
                          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                            {bullet.text}
                          </p>
                          {bullet.highlight && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 }}
                              className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-semibold
                                         bg-amber-500/10 border border-amber-500/30 text-amber-400"
                            >
                              <Trophy size={11} />
                              {bullet.highlight}
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
