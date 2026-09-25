"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Copy,
  FileText,
  Moon,
  Sun,
  Sparkles,
  Zap,
  Briefcase,
  Layers,
  Code2,
  Mail,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { RECRUITER_QUICK_FACTS } from "@/data/data";
import { useToast } from "./Toast";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Flagship Case Studies" | "Recruiter & Quick Actions" | "Theme";
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRecruiter: () => void;
  onOpenCaseStudy: (id: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenRecruiter,
  onOpenCaseStudy,
}: CommandPaletteProps) {
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  const scrollTo = (id: string) => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(RECRUITER_QUICK_FACTS.email);
    showToast("Email copied to clipboard! (ayushkumaar41@gmail.com)");
    handleClose();
  };

  const openResume = () => {
    window.open(RECRUITER_QUICK_FACTS.resumeUrl, "_blank");
    showToast("Opening resume PDF...");
    handleClose();
  };

  const items: CommandItem[] = [
    // Recruiter & High Value
    {
      id: "recruiter-sheet",
      title: "Recruiter & Tech Lead Cheat Sheet",
      subtitle: "30-second summary: stack, experience, wins & availability",
      category: "Recruiter & Quick Actions",
      icon: Sparkles,
      action: () => {
        handleClose();
        onOpenRecruiter();
      },
      shortcut: "⌘R",
    },
    {
      id: "copy-email",
      title: "Copy Email Address",
      subtitle: RECRUITER_QUICK_FACTS.email,
      category: "Recruiter & Quick Actions",
      icon: Copy,
      action: copyEmail,
      shortcut: "⌘C",
    },
    {
      id: "download-resume",
      title: "Download Resume",
      subtitle: "Curriculum Vitae (PDF)",
      category: "Recruiter & Quick Actions",
      icon: FileText,
      action: openResume,
    },
    // Flagships
    {
      id: "cs-code-scanner",
      title: "Zero-LLM Codebase Scanner",
      subtitle: "Case Study: Deterministic AST architecture & $0 API costs",
      category: "Flagship Case Studies",
      icon: Code2,
      action: () => {
        handleClose();
        onOpenCaseStudy("code-scanner");
      },
    },
    {
      id: "cs-gaming-studio",
      title: "Nexus Forge (Gaming Studio)",
      subtitle: "Case Study: Angular 17 Signals, 3D flip card, Canvas scratch-off",
      category: "Flagship Case Studies",
      icon: Zap,
      action: () => {
        handleClose();
        onOpenCaseStudy("gaming-studio");
      },
    },
    // Navigation
    {
      id: "nav-home",
      title: "Jump to Home",
      subtitle: "Hero landing & core intro",
      category: "Navigation",
      icon: User,
      action: () => scrollTo("home"),
    },
    {
      id: "nav-about",
      title: "Jump to About",
      subtitle: "Bio, stats, and background",
      category: "Navigation",
      icon: User,
      action: () => scrollTo("about"),
    },
    {
      id: "nav-principles",
      title: "Jump to Engineering Principles",
      subtitle: "UI architecture, render discipline & deterministic state",
      category: "Navigation",
      icon: Layers,
      action: () => scrollTo("principles"),
    },
    {
      id: "nav-experience",
      title: "Jump to Experience",
      subtitle: "Deloitte USI career journey & metrics",
      category: "Navigation",
      icon: Briefcase,
      action: () => scrollTo("experience"),
    },
    {
      id: "nav-projects",
      title: "Jump to Featured Projects",
      subtitle: "Flagship builds and GitHub repositories",
      category: "Navigation",
      icon: Code2,
      action: () => scrollTo("projects"),
    },
    {
      id: "nav-skills",
      title: "Jump to Skills & Toolkit",
      subtitle: "Frontend, Serverless, AI & DevTools marquee",
      category: "Navigation",
      icon: Sparkles,
      action: () => scrollTo("skills"),
    },
    {
      id: "nav-contact",
      title: "Jump to Contact",
      subtitle: "Get in touch or leave a message",
      category: "Navigation",
      icon: Mail,
      action: () => scrollTo("contact"),
    },
    // Theme
    {
      id: "toggle-theme",
      title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      subtitle: `Current theme: ${theme === "dark" ? "Dark" : "Light"}`,
      category: "Theme",
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        handleClose();
      },
    },
  ];

  // Filter items
  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const safeSelectedIndex = selectedIndex >= filtered.length ? 0 : selectedIndex;

  // Manage overflow and input focus on open
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Key navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[safeSelectedIndex]) {
        e.preventDefault();
        filtered[safeSelectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, safeSelectedIndex, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl rounded-2xl glass border border-[var(--border-color)] bg-[var(--bg-secondary)]/95 shadow-2xl overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-color)] gap-3">
              <Search size={18} className="text-[var(--text-secondary)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or jump to section..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm sm:text-base outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
              />
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--border-color)] text-[var(--text-secondary)]">
                ESC
              </span>
            </div>

            {/* List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-10 text-center text-sm text-[var(--text-secondary)]">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === safeSelectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent)]/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg shrink-0 ${
                            isSelected
                              ? "bg-[var(--accent)] text-white"
                              : "bg-[var(--border-color)]/50 text-[var(--text-secondary)]"
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-[var(--text-secondary)] truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {item.shortcut ? (
                        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--border-color)] text-[var(--text-secondary)] shrink-0 ml-2">
                          {item.shortcut}
                        </span>
                      ) : (
                        isSelected && (
                          <ArrowRight size={14} className="text-[var(--accent)] shrink-0 ml-2" />
                        )
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Guide */}
            <div className="flex items-center justify-between px-4 py-2 text-[11px] font-mono text-[var(--text-secondary)] border-t border-[var(--border-color)] bg-[var(--bg-primary)]/40">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--border-color)] text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--border-color)] text-[10px]">↓</kbd>
                <span>to navigate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--border-color)] text-[10px]">↵</kbd>
                <span>to select</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
