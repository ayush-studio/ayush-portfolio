import { fetchGithubRepos } from "@/lib/github";
import { FALLBACK_PROJECTS } from "@/data/data";
import ProjectCard from "./ProjectCard";
import FlagshipShowcase from "./FlagshipShowcase";
import type { GithubRepo } from "@/lib/github";
import type { FallbackProject } from "@/data/data";

/**
 * ProjectGrid — Server Component rendering:
 * 1. High-impact Flagship Architectural Systems (Zero-LLM Code Scanner & Gaming Studio)
 * 2. Secondary Open-Source & Interactive Repositories with live GitHub sync / fallback.
 */
export default async function ProjectGrid() {
  const githubRepos = await fetchGithubRepos("ayush-studio", 8);
  const usingFallback = !githubRepos;

  // Filter out the flagship projects from the secondary grid so they aren't repeated
  const secondaryGithubRepos = (githubRepos || []).filter((repo) => {
    const key = repo.name.toLowerCase();
    return !key.includes("code-scanner") && !key.includes("gaming-studio");
  });

  const secondaryFallbackProjects = FALLBACK_PROJECTS.filter((p) => {
    const key = p.name.toLowerCase();
    return !key.includes("zero-llm") && !key.includes("codebase") && !key.includes("gaming");
  });

  return (
    <section id="projects" className="py-24 relative">
      {/* Subtle ambient lighting */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 40%, rgba(139,92,246,0.15), transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">
            04 // Production Systems &amp; Repositories
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
            Featured <span className="gradient-text">Engineering Projects</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            From deterministic static analysis engines to reactive indie gaming storefronts and
            interactive web applications.
          </p>
        </div>

        {/* 1. Flagship Systems Showcase */}
        <FlagshipShowcase />

        {/* 2. Open-Source & Exploratory Repositories */}
        <div className="mt-16">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                02 // Open Source &amp; Explorations
              </span>
              <span className="hidden sm:inline text-xs text-[var(--text-secondary)]">
                {usingFallback
                  ? "Curated selections from GitHub"
                  : "Live repositories synced with GitHub REST API"}
              </span>
            </div>

            <a
              href="https://github.com/ayush-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
            >
              github.com/ayush-studio →
            </a>
          </div>

          {/* Secondary Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usingFallback
              ? secondaryFallbackProjects.map((project: FallbackProject, i) => (
                  <ProjectCard
                    key={project.name}
                    card={{ type: "fallback", data: project }}
                    index={i}
                  />
                ))
              : secondaryGithubRepos.map((repo: GithubRepo, i) => (
                  <ProjectCard
                    key={repo.id}
                    card={{ type: "github", data: repo }}
                    index={i}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
