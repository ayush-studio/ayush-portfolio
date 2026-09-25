"use client";

import { motion } from "framer-motion";
import { Star, GitFork, Globe, Code2 } from "lucide-react";
import type { GithubRepo } from "@/lib/github";
import type { FallbackProject } from "@/data/data";
import { LANGUAGE_COLORS, PROJECT_LIVE_URLS, PROJECT_DESCRIPTIONS } from "@/data/data";
import SpotlightCard from "./SpotlightCard";

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
  const normalizedKey = name.toLowerCase().replace(/[^a-z0-9]/g, "-");

  const rawDesc = data.description?.trim();
  const description =
    rawDesc && rawDesc !== "No description provided."
      ? rawDesc
      : PROJECT_DESCRIPTIONS[normalizedKey] ||
        PROJECT_DESCRIPTIONS[name.toLowerCase()] ||
        "Full-stack web application built with modern architecture.";

  const language = data.language ?? null;
  const stars = type === "github" ? (data as GithubRepo).stargazers_count : (data as FallbackProject).stars;
  const forks = type === "github" ? (data as GithubRepo).forks_count : 0;
  const githubUrl = type === "github" ? (data as GithubRepo).html_url : (data as FallbackProject).url;

  // Resolve live URL from repo homepage, override map, or fallback data
  const rawHomepage = type === "github" ? (data as GithubRepo).homepage : (data as FallbackProject).homepage;
  const liveUrl = PROJECT_LIVE_URLS[normalizedKey] || PROJECT_LIVE_URLS[name.toLowerCase()] || rawHomepage || null;

  const isSelfReferencing = !liveUrl || liveUrl === "#" || liveUrl.startsWith("#") || liveUrl.includes("ayush-portfolio");

  const handleLiveClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isSelfReferencing) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
        duration: 0.5,
        delay: index * 0.06,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <SpotlightCard className="p-6 h-full flex flex-col justify-between hover:border-[var(--accent)]/50 transition-colors">
        <div className="flex flex-col h-full">
          {/* Repo title & badge */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-bold text-[var(--text-primary)] text-base leading-snug line-clamp-1">
              {name.replace(/-/g, " ").replace(/_/g, " ")}
            </h4>
            {liveUrl && !isSelfReferencing && (
              <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Live App
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {description}
          </p>

          {/* Topics */}
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Footer: language + stats + action buttons */}
          <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-[var(--border-color)]">
            {/* Language tag & stats */}
            <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
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
                <span className="flex items-center gap-1 font-mono">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  {stars}
                </span>
              )}
              {forks > 0 && (
                <span className="flex items-center gap-1 font-mono">
                  <GitFork size={11} />
                  {forks}
                </span>
              )}
            </div>

            {/* Buttons: Live Demo + GitHub */}
            <div className="flex items-center gap-1.5">
              {liveUrl && (
                <motion.a
                  href={isSelfReferencing ? "#home" : liveUrl}
                  target={isSelfReferencing ? "_self" : "_blank"}
                  rel={isSelfReferencing ? undefined : "noopener noreferrer"}
                  onClick={handleLiveClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm cursor-pointer"
                  title={isSelfReferencing ? "Scroll to Top of Page" : "Open Live Deployed Application"}
                >
                  <Globe size={11} />
                  {isSelfReferencing ? "Top" : "Live Demo"}
                </motion.a>
              )}

              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                title="View Source Code on GitHub"
              >
                <Code2 size={11} />
                Code
              </motion.a>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
