import { fetchGithubRepos } from "@/lib/github";
import { FALLBACK_PROJECTS } from "@/data/data";
import ProjectCard from "./ProjectCard";
import type { GithubRepo } from "@/lib/github";
import type { FallbackProject } from "@/data/data";

/**
 * ProjectGrid — Server Component that fetches GitHub repos at build/request time.
 * Falls back to static data if the API is unavailable or rate-limited.
 */
export default async function ProjectGrid() {
  const githubRepos = await fetchGithubRepos("ayush-studio", 6);
  const usingFallback = !githubRepos;

  return (
    <section id="projects" className="py-24 relative">
      {/* Gradient accent */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.12), transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">
            What I&apos;ve built
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto text-base">
            {usingFallback
              ? "Showcasing a curated selection of personal and professional projects."
              : "Live data pulled directly from my GitHub profile."}
          </p>

          {/* GitHub profile link */}
          <a
            href="https://github.com/ayush-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            github.com/ayush-studio →
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usingFallback
            ? FALLBACK_PROJECTS.map((project: FallbackProject, i) => (
                <ProjectCard
                  key={project.name}
                  card={{ type: "fallback", data: project }}
                  index={i}
                />
              ))
            : githubRepos.map((repo: GithubRepo, i) => (
                <ProjectCard
                  key={repo.id}
                  card={{ type: "github", data: repo }}
                  index={i}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
