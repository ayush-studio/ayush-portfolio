"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, Activity, Palette, Grid, X, Check } from "lucide-react";

interface ColorPalette {
  id: string;
  name: string;
  accent: string;
  accent2: string;
  glow: string;
}

const COLOR_PALETTES: ColorPalette[] = [
  {
    id: "indigo",
    name: "Indigo (Default)",
    accent: "#6366f1",
    accent2: "#8b5cf6",
    glow: "rgba(99, 102, 241, 0.35)",
  },
  {
    id: "emerald",
    name: "Emerald Matrix",
    accent: "#10b981",
    accent2: "#059669",
    glow: "rgba(16, 185, 129, 0.35)",
  },
  {
    id: "cyan",
    name: "Cyber Cyan",
    accent: "#06b6d4",
    accent2: "#3b82f6",
    glow: "rgba(6, 182, 212, 0.35)",
  },
  {
    id: "amber",
    name: "Solar Amber",
    accent: "#f59e0b",
    accent2: "#ef4444",
    glow: "rgba(245, 158, 11, 0.35)",
  },
];

export default function DeveloperHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [activePalette, setActivePalette] = useState("indigo");
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [domCount, setDomCount] = useState(0);

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  // Real-time FPS ticker
  useEffect(() => {
    lastTimeRef.current = performance.now();
    let animId: number;
    const calcFps = (now: number) => {
      frameCountRef.current++;
      if (lastTimeRef.current !== null && now - lastTimeRef.current >= 1000) {
        setFps(Math.min(60, Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current))));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        setDomCount(document.getElementsByTagName("*").length);
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Update dynamic CSS variables when palette changes
  const applyPalette = (palette: ColorPalette) => {
    setActivePalette(palette.id);
    const root = document.documentElement;
    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--accent-2", palette.accent2);
    root.style.setProperty("--accent-glow", palette.glow);
  };

  return (
    <>
      {/* Grid Wireframe Overlay */}
      {showGridOverlay && (
        <div
          className="fixed inset-0 pointer-events-none z-[999] opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.2) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
      )}

      {/* Floating HUD Container */}
      <div className="fixed bottom-5 left-5 z-[80] font-mono text-xs select-none">
        {/* Expanded Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-2.5 w-72 rounded-2xl glass border border-[var(--border-color)] bg-[var(--bg-secondary)]/95 shadow-2xl p-4 space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2.5">
                <span className="font-bold text-[var(--text-primary)] flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                  <Activity size={13} className="text-emerald-400" />
                  Developer Telemetry
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  aria-label="Close HUD"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-[var(--bg-primary)]/50 border border-[var(--border-color)]">
                  <p className="text-[var(--text-secondary)]">Render Rate</p>
                  <p className="font-bold text-emerald-400 text-sm">{fps} FPS</p>
                </div>
                <div className="p-2 rounded-lg bg-[var(--bg-primary)]/50 border border-[var(--border-color)]">
                  <p className="text-[var(--text-secondary)]">DOM Nodes</p>
                  <p className="font-bold text-[var(--text-primary)] text-sm">{domCount || "—"}</p>
                </div>
              </div>

              {/* Accent Color Palette Switcher */}
              <div>
                <p className="text-[var(--text-secondary)] mb-2 flex items-center gap-1.5 text-[11px]">
                  <Palette size={12} className="text-[var(--accent)]" />
                  Live Theme Accent
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {COLOR_PALETTES.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => applyPalette(palette)}
                      className={`flex items-center gap-2 p-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                        activePalette === palette.id
                          ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--text-primary)] font-semibold"
                          : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)]/40"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: palette.accent }}
                      />
                      <span className="truncate">{palette.name.split(" ")[0]}</span>
                      {activePalette === palette.id && <Check size={11} className="ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wireframe Grid Toggle */}
              <div className="pt-2 border-t border-[var(--border-color)]">
                <button
                  onClick={() => setShowGridOverlay(!showGridOverlay)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors cursor-pointer text-[11px] ${
                    showGridOverlay
                      ? "bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)] font-semibold"
                      : "border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Grid size={13} />
                    <span>Layout Wireframe Grid</span>
                  </span>
                  <span>{showGridOverlay ? "ON" : "OFF"}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed HUD Trigger Pill */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full glass border transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md ${
            isOpen
              ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10"
              : "border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40"
          }`}
          title="Open Developer HUD & Theme Switcher"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-bold">{fps} FPS</span>
          <span className="text-[var(--border-color)]">|</span>
          <span className="flex items-center gap-1 font-semibold">
            <Sliders size={12} className="text-[var(--accent)]" />
            HUD
          </span>
        </motion.button>
      </div>
    </>
  );
}
