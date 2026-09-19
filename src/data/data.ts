// ─────────────────────────────────────────────────────────────────────────────
// data.ts — All static content for Ayush's portfolio.
// Keeping data separate from UI components for clean architecture.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Navigation Links ────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// ─── About Section ───────────────────────────────────────────────────────────
export const ABOUT_SUMMARY = `Frontend Developer with 2.5+ years of experience at Deloitte USI, building scalable enterprise web applications using React, Angular, Next.js, JavaScript, and TypeScript. Passionate about architecting high-speed developer tools, static code analysis engines, and integrating AI capabilities into modern workflows — from intuitive UI design to serverless microservices and intelligent GenAI systems.`;

export const ABOUT_STATS = [
  { label: "Years of Experience", value: "2.5+" },
  { label: "Enterprise Projects", value: "10+" },
  { label: "AI & Serverless Tools", value: "6+" },
  { label: "Award", value: "🏆 Applause" },
];

// ─── Experience Section ───────────────────────────────────────────────────────
export interface ExperienceBullet {
  icon: string;
  text: string;
  highlight?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  bullets: ExperienceBullet[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Frontend Developer",
    company: "Deloitte USI",
    duration: "2022 – Present  (2.5+ years)",
    location: "Hyderabad, India",
    bullets: [
      {
        icon: "🤖",
        text: "Engineered the complete frontend architecture for a custom Angular-based AI chatbot in just 4 weeks for a healthcare client, earning the Deloitte Applause Award for rapid UI delivery.",
        highlight: "🏆 Applause Award",
      },
      {
        icon: "💬",
        text: "Designed intuitive chat interfaces and seamlessly integrated backend NLP APIs, connecting the frontend to AI models that translate natural language queries into SQL — heavily reducing medical staff's dependency on data engineering teams.",
      },
      {
        icon: "⚡",
        text: "Decreased page load times by 15–20% by architecting and integrating 10 custom GraphQL queries, replacing legacy REST APIs for tabular data retrieval and eliminating data over-fetching.",
        highlight: "15–20% Faster",
      },
      {
        icon: "🚀",
        text: "Developed scalable React-based enterprise applications, utilizing AI-driven tools like 'Lovable' to generate intuitive UX designs and significantly accelerate the frontend UI development lifecycle.",
      },
      {
        icon: "🎨",
        text: "Designed and developed 6 distinct Angular screens from scratch to implement critical UI enhancements during the initial project phase, ensuring a highly responsive and accessible user experience.",
      },
      {
        icon: "🐍",
        text: "Built Python/FastAPI backend services incorporating Generative AI and LLM capabilities to support intelligent enterprise workflows and automate manual information processing tasks.",
      },
      {
        icon: "🛠️",
        text: "Leveraged AI-assisted development tools, including Cursor and Claude, to accelerate Python backend development, code generation, debugging, and advanced solution design.",
      },
      {
        icon: "📱",
        text: "Improved application responsiveness and rendering across modern browsers through lazy loading and efficient state management using RxJS and React Context API.",
      },
      {
        icon: "✅",
        text: "Maintained high code quality through peer code reviews, mentoring junior developers in React/Angular best practices, and standard GitHub PR workflows. Tested REST APIs using Swagger UI.",
      },
    ],
  },
];

// ─── Skills Section ───────────────────────────────────────────────────────────
export interface SkillCategory {
  label: string;
  color: string;
  bgColor: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Frontend & UI",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10 border-indigo-500/30",
    skills: [
      "React",
      "Angular",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Mermaid.js",
      "Zustand",
      "RxJS",
      "Context API",
      "HTML5 / SCSS",
    ],
  },
  {
    label: "Backend & Serverless",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/30",
    skills: [
      "Vercel Serverless",
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "GraphQL",
      "REST APIs",
      "Swagger UI",
      "SQLite",
    ],
  },
  {
    label: "AI, DevTools & Architecture",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10 border-violet-500/30",
    skills: [
      "Static Code Analysis",
      "Generative AI & LLMs",
      "NLP Integration",
      "Cursor IDE",
      "Claude AI",
      "Lovable",
      "Git / GitHub",
      "Agile / Scrum",
      "Figma",
    ],
  },
];

// ─── Direct Live Demo URL Overrides ───────────────────────────────────────────
export const PROJECT_LIVE_URLS: Record<string, string> = {
  "code-scanner": "https://code-scanner-liard.vercel.app/",
  "code_scanner": "https://code-scanner-liard.vercel.app/",
  "gaming-studio": "https://github.com/ayush-studio/gaming-studio",
};

// ─── Fallback Projects (used when GitHub API rate-limits or offline) ───────────
export interface FallbackProject {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  homepage?: string;
  topics: string[];
}

export const FALLBACK_PROJECTS: FallbackProject[] = [
  {
    name: "Zero-LLM Codebase Scanner",
    description:
      "Deterministic static architecture analyzer built with React, Vite, Tailwind CSS & Vercel Serverless. Extracts codebase metrics, builds interactive File Lineage dependency graphs, and auto-generates HLD & LLD Mermaid diagrams with zero AI API costs.",
    language: "TypeScript",
    stars: 1,
    url: "https://github.com/ayush-studio/code-scanner",
    homepage: "https://code-scanner-liard.vercel.app/",
    topics: ["react", "serverless", "static-analysis", "mermaid", "typescript"],
  },
  {
    name: "Gaming Studio",
    description:
      "Nexus Forge — full-stack indie game marketplace built with Angular 17, Express.js & SQLite. Features a 12-game catalog, reactive cart powered by Angular Signals, 3D flip checkout, and a canvas scratch-off license key reveal.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/ayush-studio/gaming-studio",
    topics: ["angular", "express", "sqlite", "typescript", "full-stack"],
  },
  {
    name: "OmniVerse",
    description:
      "OmniVerse — track, rate, and discuss movies, games, manga, music and more. A multi-entertainment tracking platform with social features and personal collection management.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/ayush-studio/OmniVerse",
    topics: ["javascript", "entertainment", "tracker", "social"],
  },
  {
    name: "Pixel Pitch Cricket",
    description:
      "Pixel Pitch: Cricket Dynasty — a 2D arcade street cricket game built in Godot 4.3 with GDScript. Features full arena configuration, animated gameplay, a launch page, and physics-driven ball mechanics.",
    language: "GDScript",
    stars: 0,
    url: "https://github.com/ayush-studio/Pixel-Pitch-Cricket",
    topics: ["godot", "gdscript", "game-dev", "cricket", "2d"],
  },
];

// ─── Language Color Map (for project cards) ───────────────────────────────────
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  GDScript: "#478CBF",
  HTML: "#E34F26",
  CSS: "#1572B6",
  SCSS: "#CC6699",
  Go: "#00ADD8",
  Rust: "#CE422B",
  C: "#555555",
  "C++": "#F34B7D",
  "C#": "#178600",
  Java: "#B07219",
  Ruby: "#701516",
  Shell: "#89E051",
  Vue: "#41B883",
  Svelte: "#FF3E00",
};
