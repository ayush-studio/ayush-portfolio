"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import type { GithubRepo } from "@/lib/github";
import type { FallbackProject } from "@/data/data";
import { LANGUAGE_COLORS } from "@/data/data";

type CardData =
  | { type: "github"; data: GithubRepo }
  | { type: "fallback"; data: FallbackProject };

interface ProjectCardProps {
  card: CardData;
  index: number;
}

/**
 * ProjectCard — Displays a single project from GitHub API or fallback data.
 * Features glassmorphism, hover glow, language color dot, stars, and external link.
 */
export default function ProjectCard({ card, index }: ProjectCardProps) {
  const { type, data } = card;

  // Normalize fields across both types
  const name = data.name;
  const description = data.description ?? "No description provided.";
  const language = data.language ?? null;
  const stars = type === "github" ? (data as GithubRepo).stargazers_count : (data as FallbackProject).stars;
  const forks = type === "github" ? (data as GithubRepo).forks_count : 0;
  const url = type === "github" ? (data as GithubRepo).html_url : (data as FallbackProject).url;
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
        {/* Repo name */}
        <h3 className="font-bold text-[var(--text-primary)] text-lg leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-1">
          {name.replace(/-/g, " ").replace(/_/g, " ")}
        </h3>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Topics */}
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {topics.slice(0, 3).map((topic) => (
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

        {/* Footer: language + stats + link */}
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

          {/* View on GitHub */}
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                       bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20
                       hover:bg-[var(--accent)]/20 transition-colors duration-200"
          >
            View
            <ExternalLink size={11} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
