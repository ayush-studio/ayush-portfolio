"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, FileText } from "lucide-react";
import { NAV_LINKS } from "@/data/data";
import ThemeToggle from "./ThemeToggle";

/**
 * Navbar — Fixed top navigation with:
 * - Blur backdrop on scroll
 * - Smooth-scroll section links
 * - Mobile hamburger menu
 * - Dark/Light mode toggle
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position for background blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section via IntersectionObserver-like scroll check
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    // Close mobile menu first so layout settles before we measure
    setMobileOpen(false);

    // Small delay on mobile lets the drawer close animation finish
    // before we calculate the scroll position
    setTimeout(() => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      // Offset by navbar height (64px) + a little breathing room (8px)
      const NAVBAR_HEIGHT = 72;
      const top =
        el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;

      window.scrollTo({ top, behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass border-b border-[var(--border-color)] shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 font-bold text-lg cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="gradient-text">Ayush</span>
            </motion.a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer
                      ${
                        isActive
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-[var(--accent)]/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Right Side: Resume Button + Theme Toggle + Mobile Button */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                           bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/25
                           hover:bg-[var(--accent)]/20 transition-all duration-200"
                title="View Resume PDF"
              >
                <FileText size={13} />
                Resume
              </a>
              <ThemeToggle />
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center
                           glass border border-[var(--border-color)] hover:border-[var(--accent)] transition-colors"
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={16} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-[var(--border-color)] md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer
                    ${
                      activeSection === link.href.replace("#", "")
                        ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--border-color)] hover:text-[var(--text-primary)]"
                    }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 mt-2 px-4 py-2.5 text-sm font-semibold rounded-lg
                           bg-[var(--accent)] text-white shadow-md shadow-indigo-500/20"
              >
                <FileText size={15} />
                View Resume (PDF)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
