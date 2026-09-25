"use client";

import { motion } from "framer-motion";
import { Zap, Layers, Brain, Sparkles, CheckCircle2 } from "lucide-react";
import { ENGINEERING_PRINCIPLES } from "@/data/data";
import SpotlightCard from "./SpotlightCard";

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Layers,
  Brain,
  Sparkles,
};

export default function EngineeringPrinciples() {
  return (
    <section id="principles" className="py-24 relative bg-[var(--bg-primary)]">
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">
            02 // Core Architectural Pillars
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
            Engineering Philosophy &amp; <span className="gradient-text">Craft</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            How I architect enterprise UI systems at scale — balancing 60FPS render budgets,
            deterministic state machines, and pragmatic AI integration.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {ENGINEERING_PRINCIPLES.map((principle, index) => {
            const Icon = ICON_MAP[principle.icon] || Zap;
            return (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between hover:border-[var(--accent)]/40 transition-colors">
                  <div>
                    {/* Header: Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                        PILLAR {principle.number}
                      </span>
                      <div className="p-2.5 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                        <Icon size={20} />
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[var(--accent)] mb-3">
                      {principle.subtitle}
                    </p>

                    {/* Body */}
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                      {principle.description}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
                    {principle.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
