// ─────────────────────────────────────────────────────────────────────────────
// github.ts — Utility to fetch public repos from GitHub API.
// Falls back gracefully on error or rate-limiting (403/429).
// ─────────────────────────────────────────────────────────────────────────────

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

/**
 * Fetches public repositories for `ayush-studio` from the GitHub API.
 * - Filters out forked repos
 * - Sorts by stars (descending)
 * - Returns top `limit` repos
 * - Returns `null` if the request fails (caller should use fallback data)
 */
export async function fetchGithubRepos(
  username = "ayush-studio",
  limit = 6
): Promise<GithubRepo[] | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=public`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        // Next.js: revalidate every 1 hour to stay within API rate limits
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.warn(`GitHub API responded with ${res.status}. Using fallback.`);
      return null;
    }

    const repos: GithubRepo[] = await res.json();

    // Filter out forks, sort by updated date (most recent first)
    const filtered = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, limit);

    // If GitHub returns 0 relevant repos, let the caller use fallback
    return filtered.length > 0 ? filtered : null;
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return null;
  }
}
