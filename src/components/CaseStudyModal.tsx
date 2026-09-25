"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, GitBranch, Cpu, CheckCircle2, Zap, Layers, Sparkles } from "lucide-react";
import type { FlagshipCaseStudy } from "@/data/data";

interface CaseStudyModalProps {
  study: FlagshipCaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (study) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [study, onClose]);

  return (
    <AnimatePresence>
      {study && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass border border-[var(--border-color)] bg-[var(--bg-secondary)]/95 shadow-2xl p-6 sm:p-8 z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Close case study"
            >
              <X size={18} />
            </button>

            {/* Header / Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide uppercase bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 mb-3">
                <Sparkles size={12} />
                {study.badge}
              </span>
              <h2 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                {study.name}
              </h2>
              <p className="text-[var(--text-secondary)] text-base mt-2 leading-relaxed">
                {study.tagline}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="glass rounded-xl p-3.5 border border-[var(--border-color)] bg-[var(--bg-primary)]/40"
                >
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    {metric.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold gradient-text my-1">
                    {metric.value}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              {/* Challenge */}
              <div className="glass rounded-2xl p-5 border border-[var(--border-color)]">
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold mb-2">
                  <Zap size={18} className="text-amber-400" />
                  <span>The Engineering Problem</span>
                </div>
                <p>{study.challenge}</p>
              </div>

              {/* Architectural Solution */}
              <div className="glass rounded-2xl p-5 border border-[var(--border-color)]">
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold mb-2">
                  <Layers size={18} className="text-[var(--accent)]" />
                  <span>Architectural Solution</span>
                </div>
                <p>{study.architecturalSolution}</p>
              </div>

              {/* Key Innovations */}
              <div className="glass rounded-2xl p-5 border border-[var(--border-color)]">
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold mb-3">
                  <Cpu size={18} className="text-emerald-400" />
                  <span>Key Technical Innovations</span>
                </div>
                <ul className="space-y-2.5">
                  {study.keyInnovations.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-400 mt-1 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  Production Technology Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-medium glass border border-[var(--border-color)] text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-3">
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all cursor-pointer"
                >
                  <ExternalLink size={15} />
                  Launch Live Application
                </a>
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm glass border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  <GitBranch size={15} />
                  GitHub Repository
                </a>
              </div>
              <button
                onClick={onClose}
                className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--border-color)] font-mono text-[10px]">Esc</kbd> to close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
