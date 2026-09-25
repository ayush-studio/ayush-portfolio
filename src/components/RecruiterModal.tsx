"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Briefcase,
  Trophy,
  Zap,
  MapPin,
  Clock,
  Copy,
  Check,
  FileText,
  ExternalLink,
} from "lucide-react";
import { RECRUITER_QUICK_FACTS } from "@/data/data";
import { useToast } from "./Toast";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [bengaluruTime, setBengaluruTime] = useState("");

  // Bengaluru time ticker
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setBengaluruTime(formatter.format(now) + " IST");
      } catch {
        setBengaluruTime("UTC+5:30 (IST)");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RECRUITER_QUICK_FACTS.email);
    setCopied(true);
    showToast("Email copied to clipboard! (ayushkumaar41@gmail.com)");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass border border-[var(--border-color)] bg-[var(--bg-secondary)]/95 shadow-2xl p-6 sm:p-8 z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruiter-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Recruiter &amp; Tech Lead Cheat Sheet
                </span>
                <span className="text-xs font-mono text-[var(--text-secondary)]">30-Second Summary</span>
              </div>
              <h2 id="recruiter-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                {RECRUITER_QUICK_FACTS.name}
              </h2>
              <p className="text-[var(--accent)] font-semibold text-sm sm:text-base mt-1">
                {RECRUITER_QUICK_FACTS.title}
              </p>
            </div>

            {/* Quick Stat Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="glass rounded-xl p-3.5 border border-[var(--border-color)]">
                <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-mono uppercase mb-1">
                  <Briefcase size={14} />
                  <span>Experience</span>
                </div>
                <p className="text-base font-bold text-[var(--text-primary)]">
                  {RECRUITER_QUICK_FACTS.totalExperience}
                </p>
                <p className="text-[11px] text-[var(--text-secondary)]">Enterprise Production UI</p>
              </div>

              <div className="glass rounded-xl p-3.5 border border-[var(--border-color)]">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono uppercase mb-1">
                  <Trophy size={14} />
                  <span>Key Recognition</span>
                </div>
                <p className="text-base font-bold text-[var(--text-primary)]">Applause Award</p>
                <p className="text-[11px] text-[var(--text-secondary)]">Deloitte USI (4-wk AI Delivery)</p>
              </div>

              <div className="glass rounded-xl p-3.5 border border-[var(--border-color)]">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono uppercase mb-1">
                  <Clock size={14} />
                  <span>Local Time</span>
                </div>
                <p className="text-base font-bold text-[var(--text-primary)] font-mono">
                  {bengaluruTime || "Bengaluru (IST)"}
                </p>
                <p className="text-[11px] text-[var(--text-secondary)]">Bengaluru · Fast Responder</p>
              </div>
            </div>

            {/* Target Roles & Location */}
            <div className="glass rounded-2xl p-4 sm:p-5 border border-[var(--border-color)] mb-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
                <span className="text-xs font-mono font-semibold uppercase text-[var(--text-secondary)]">
                  Target Roles
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {RECRUITER_QUICK_FACTS.targetRoles.map((role) => (
                    <span
                      key={role}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono font-semibold uppercase text-[var(--text-secondary)]">
                  Location &amp; Availability
                </span>
                <span className="text-xs sm:text-sm text-[var(--text-primary)] flex items-center gap-1.5 font-medium">
                  <MapPin size={14} className="text-rose-400" />
                  {RECRUITER_QUICK_FACTS.location} · {RECRUITER_QUICK_FACTS.workPreference}
                </span>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="mb-6">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
                Core Tech Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {RECRUITER_QUICK_FACTS.coreSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium glass border border-[var(--border-color)] text-[var(--text-primary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Impact Highlights */}
            <div className="mb-6">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
                Verified Impact &amp; Engineering Wins
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {RECRUITER_QUICK_FACTS.keyAchievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Zap size={15} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 1-Click Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-color)]">
              <a
                href={RECRUITER_QUICK_FACTS.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
              >
                <FileText size={15} />
                Download Resume (PDF)
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm glass border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
              >
                {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                {copied ? "Copied!" : "Copy Email"}
              </button>

              <a
                href={RECRUITER_QUICK_FACTS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm glass border border-[var(--border-color)] text-[var(--text-primary)] hover:border-blue-400 transition-colors cursor-pointer"
              >
                <ExternalLink size={15} />
                LinkedIn Profile
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
