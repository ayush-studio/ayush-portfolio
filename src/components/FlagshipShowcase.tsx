"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Sparkles, Zap, FileCode } from "lucide-react";
import { FLAGSHIP_PROJECTS, type FlagshipCaseStudy } from "@/data/data";
import SpotlightCard from "./SpotlightCard";
import CaseStudyModal from "./CaseStudyModal";
import CodeLineageMiniLab from "./CodeLineageMiniLab";

export default function FlagshipShowcase() {
  const [activeStudy, setActiveStudy] = useState<FlagshipCaseStudy | null>(null);

  return (
    <>
      <div className="mb-20">
        {/* Section Pretitle */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
            01 // Flagship Systems Architecture
          </span>
          <div className="flex-1 h-px bg-[var(--border-color)]" />
        </div>

        {/* Flagship Cards */}
        <div className="space-y-8">
          {FLAGSHIP_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <SpotlightCard className="p-6 sm:p-8 md:p-10 border-[var(--border-color)] hover:border-[var(--accent)]/50 transition-all duration-300">
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Details & Narrative (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Top Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
                          <Sparkles size={12} />
                          {project.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mb-2">
                        {project.name}
                      </h3>

                      {/* Tagline */}
                      <p className="text-sm sm:text-base font-medium text-[var(--accent)] mb-4">
                        {project.tagline}
                      </p>

                      {/* Summary */}
                      <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                        {project.summary}
                      </p>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-mono font-medium glass border border-[var(--border-color)] text-[var(--text-primary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                      <button
                        onClick={() => setActiveStudy(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
                      >
                        <FileCode size={15} />
                        Inspect Architecture Case Study
                      </button>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm glass border border-[var(--border-color)] text-[var(--text-primary)] hover:border-emerald-500/40 transition-colors cursor-pointer"
                      >
                        <ExternalLink size={14} />
                        Launch Live App
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      >
                        <GitBranch size={14} />
                        Source
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Key Architectural Metrics (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                      Engineered Performance &amp; Metrics
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="glass rounded-xl p-4 border border-[var(--border-color)] bg-[var(--bg-primary)]/40 hover:border-[var(--accent)]/30 transition-colors"
                        >
                          <p className="text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                            {metric.label}
                          </p>
                          <p className="text-xl sm:text-2xl font-bold gradient-text mb-1">
                            {metric.value}
                          </p>
                          <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
                            {metric.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Quick highlights preview */}
                    <div className="glass rounded-xl p-4 border border-[var(--border-color)] bg-[var(--bg-primary)]/20 mt-2">
                      <p className="text-xs font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                        <Zap size={14} className="text-amber-400" />
                        Architectural Highlight:
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {project.keyInnovations[0]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Mini-Lab for Code Scanner */}
                {project.id === "code-scanner" && <CodeLineageMiniLab />}
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal study={activeStudy} onClose={() => setActiveStudy(null)} />
    </>
  );
}
