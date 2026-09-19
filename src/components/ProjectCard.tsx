"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Globe, Code2 } from "lucide-react";
import type { GithubRepo } from "@/lib/github";
import type { FallbackProject } from "@/data/data";
import { LANGUAGE_COLORS, PROJECT_LIVE_URLS } from "@/data/data";

type CardData =
  | { type: "github"; data: GithubRepo }
  | { type: "fallback"; data: FallbackProject };

interface ProjectCardProps {
  card: CardData;
  index: number;
}

export default function ProjectCard({ card, index }: ProjectCardProps) {
  const { type, data } = card;

  // Normalize fields across both types
  const name = data.name;
  const description = data.description ?? "No description provided.";
  const language = data.language ?? null;
  const stars = type === "github" ? (data as GithubRepo).stargazers_count : (data as FallbackProject).stars;
  const forks = type === "github" ? (data as GithubRepo).forks_count : 0;
  const githubUrl = type === "github" ? (data as GithubRepo).html_url : (data as FallbackProject).url;
  
  // Resolve live URL from repo homepage, override map, or fallback data
  const rawHomepage = type === "github" ? (data as GithubRepo).homepage : (data as FallbackProject).homepage;
  const normalizedKey = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const liveUrl = PROJECT_LIVE_URLS[normalizedKey] || PROJECT_LIVE_URLS[name.toLowerCase()] || rawHomepage || null;

  const topics: string[] =
    type === "github"
      ? (data as GithubRepo).topics ?? []
      : (data as FallbackProject).topics ?? [];

  const langColor = language ? LANGUAGE_COLORS[language] ?? "#6366f1" : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative glass rounded-2xl p-6 border border-[var(--border-color)]
                 hover:border-[var(--accent)]/50 transition-all duration-300
                 hover:shadow-xl hover:shadow-[var(--accent)]/10 flex flex-col h-full"
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
           style={{ background: "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08), transparent 70%)" }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Repo title & badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-[var(--text-primary)] text-lg leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-1">
            {name.replace(/-/g, " ").replace(/_/g, " ")}
          </h3>
          {liveUrl && (
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Live App
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Topics */}
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded-full text-xs font-medium
                           bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Footer: language + stats + action buttons */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-[var(--border-color)]">
          {/* Language tag */}
          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
            {langColor && language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: langColor }}
                />
                <span className="font-medium text-[var(--text-primary)]">{language}</span>
              </span>
            )}
            {stars > 0 && (
              <span className="flex items-center gap-1">
                <Star size={12} />
                {stars}
              </span>
            )}
            {forks > 0 && (
              <span className="flex items-center gap-1">
                <GitFork size={12} />
                {forks}
              </span>
            )}
          </div>

          {/* Buttons: Live Demo + GitHub */}
          <div className="flex items-center gap-2">
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                           bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm"
                title="Open Live Deployed Application"
              >
                <Globe size={12} />
                Live Demo
              </motion.a>
            )}

            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg
                         bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20
                         hover:bg-[var(--accent)]/20 transition-colors duration-200"
              title="View Source Code on GitHub"
            >
              <Code2 size={12} />
              Code
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
