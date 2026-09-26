// ─────────────────────────────────────────────────────────────────────────────
// data.ts — All static content for Ayush's portfolio.
// Keeping data separate from UI components for clean architecture.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Navigation Links ────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Principles", href: "#principles" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// ─── About Section ───────────────────────────────────────────────────────────
export const ABOUT_SUMMARY = `Frontend Developer at Deloitte USI (2024 – Present), building scalable enterprise web applications using React, Angular, Next.js, JavaScript, and TypeScript. Passionate about architecting high-speed developer tools, static code analysis engines, and integrating AI capabilities into modern workflows — from intuitive UI design to serverless microservices and intelligent GenAI systems.`;

export const ABOUT_STATS = [
  { label: "Experience", value: "2024 – Now" },
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
    duration: "2024 – Present",
    location: "Bengaluru, India",
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
  "gaming-studio": "https://gaming-studio-khaki.vercel.app/",
  "gaming_studio": "https://gaming-studio-khaki.vercel.app/",
};

// ─── Rich Description Overrides (if GitHub API description is missing) ───────
export const PROJECT_DESCRIPTIONS: Record<string, string> = {
  "code-scanner":
    "Deterministic static architecture analyzer built with React, Vite, Tailwind CSS & Vercel Serverless. Extracts codebase metrics, builds interactive File Lineage dependency graphs, and auto-generates HLD & LLD Mermaid flowcharts with zero AI API costs.",
  "code_scanner":
    "Deterministic static architecture analyzer built with React, Vite, Tailwind CSS & Vercel Serverless. Extracts codebase metrics, builds interactive File Lineage dependency graphs, and auto-generates HLD & LLD Mermaid flowcharts with zero AI API costs.",
  "gaming-studio":
    "Nexus Forge — full-stack indie game marketplace built with Angular 17, Express.js & Vercel Serverless. Features a 12-game catalog, reactive cart powered by Angular Signals, 3D flip checkout, and a canvas scratch-off license key reveal.",
  "gaming_studio":
    "Nexus Forge — full-stack indie game marketplace built with Angular 17, Express.js & Vercel Serverless. Features a 12-game catalog, reactive cart powered by Angular Signals, 3D flip checkout, and a canvas scratch-off license key reveal.",
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
      "Nexus Forge — full-stack indie game marketplace built with Angular 17, Express.js & Vercel Serverless. Features a 12-game catalog, reactive cart powered by Angular Signals, 3D flip checkout, and a canvas scratch-off license key reveal.",
    language: "TypeScript",
    stars: 1,
    url: "https://github.com/ayush-studio/gaming-studio",
    homepage: "https://gaming-studio-khaki.vercel.app/",
    topics: ["angular", "serverless", "typescript", "full-stack", "marketplace"],
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

// ─── Engineering Philosophy & Pillars ─────────────────────────────────────────
export interface EngineeringPrinciple {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: string;
}

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    number: "01",
    title: "Performance & Rendering Discipline",
    subtitle: "Zero-Jank 60FPS UI & Minimal Bundle Overhead",
    description:
      "UI architecture begins with rendering budgets. Eliminating unnecessary re-renders via fine-grained reactivity, virtualized large datasets, code-splitting routes, and eliminating data over-fetching with targeted GraphQL queries.",
    highlights: [
      "15–20% latency reduction at Deloitte using targeted GraphQL",
      "Strict bundle budgets with tree-shaking & dynamic imports",
      "Optimized paint cycles & Core Web Vitals (LCP < 1.2s, CLS 0)",
    ],
    icon: "Zap",
  },
  {
    number: "02",
    title: "Deterministic State & Signal Reactivity",
    subtitle: "Predictable State Machines over Spaghetti Side-Effects",
    description:
      "State should be single-source-of-truth and mathematically predictable. From Angular Signals and RxJS streams to lightweight Zustand slices, state transitions remain debuggable, testable, and isolated from render logic.",
    highlights: [
      "Angular 17 Signals for zero-flicker e-commerce state in Nexus Forge",
      "RxJS reactive pipelines handling complex enterprise event streams",
      "Decoupled UI components from data fetching & caching layers",
    ],
    icon: "Layers",
  },
  {
    number: "03",
    title: "Generative AI as an Architectural Multiplier",
    subtitle: "Smart Workflows, Streaming UX & Cost Elimination",
    description:
      "AI is best used to amplify human velocity, not as an expensive black box. When static AST heuristics can parse a codebase for $0, use deterministic algorithms. When LLMs are needed, build streaming, resilient chat systems.",
    highlights: [
      "Deloitte Applause Award: Shipped Healthcare GenAI chatbot in 4 weeks",
      "Zero-LLM Code Scanner: 100% deterministic AST parsing with zero API cost",
      "FastAPI + Python backends integrating LLM reasoning with typed UI schemas",
    ],
    icon: "Brain",
  },
  {
    number: "04",
    title: "Design Systems & Micro-Craftsmanship",
    subtitle: "Accessible, Keyboard-First & Emotionally Engaging",
    description:
      "Great software feels effortless. Prioritizing WCAG AA accessibility, fluid responsive typography, semantic CSS design tokens, keyboard navigation (Cmd+K), and subtle micro-interactions that elevate brand perception.",
    highlights: [
      "Full keyboard navigation & screen-reader accessible interactive components",
      "CSS 3D flip card animations & HTML5 Canvas scratch-off interactions",
      "Harmonious dark/light design token systems with fluid responsiveness",
    ],
    icon: "Sparkles",
  },
];

// ─── Flagship Architectural Case Studies ──────────────────────────────────────
export interface FlagshipCaseStudy {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  summary: string;
  metrics: { label: string; value: string; detail: string }[];
  challenge: string;
  architecturalSolution: string;
  keyInnovations: string[];
  stack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export const FLAGSHIP_PROJECTS: FlagshipCaseStudy[] = [
  {
    id: "code-scanner",
    name: "Zero-LLM Codebase Scanner",
    badge: "Flagship Architecture // Deterministic Engine",
    tagline: "High-speed static architecture analyzer with zero AI API token costs.",
    summary:
      "A deterministic codebase analyzer built with React, TypeScript, Tailwind CSS, and Vercel Serverless. Ingests GitHub repositories or local source trees, parses language AST tokens, builds interactive File Lineage dependency graphs, and auto-generates HLD & LLD Mermaid flowcharts in under 150ms.",
    metrics: [
      { label: "API Cost", value: "$0.00", detail: "Zero recurring LLM billing" },
      { label: "Parse Latency", value: "<150ms", detail: "Deterministic AST tokenizer" },
      { label: "Diagrams", value: "HLD & LLD", detail: "Auto-rendered Mermaid flowcharts" },
      { label: "Stack", value: "React + TS", detail: "Vercel Serverless pipeline" },
    ],
    challenge:
      "Modern code review and architecture analysis tools almost exclusively rely on LLM APIs, resulting in expensive token bills, non-deterministic hallucinations, and high latency for multi-thousand-line repositories.",
    architecturalSolution:
      "Designed a pure deterministic parsing pipeline in TypeScript. Uses regex-driven AST tokenizers to extract file imports, exports, and function calls, computing a directed acyclic graph (DAG) of project lineage. Automatically converts dependencies into clean Mermaid diagrams rendered dynamically in the client.",
    keyInnovations: [
      "Interactive File Lineage visualizer mapping inter-file coupling & dead code",
      "Automatic High-Level (HLD) & Low-Level (LLD) architectural diagram synthesis",
      "Zero AI API dependencies — 100% deterministic, reproducible, and private",
      "Instant Vercel Serverless execution with resilient GitHub REST rate-limit caching",
    ],
    stack: ["React 19", "TypeScript", "Vercel Serverless", "Tailwind CSS", "Mermaid.js", "Vite"],
    githubUrl: "https://github.com/ayush-studio/code-scanner",
    liveUrl: "https://code-scanner-liard.vercel.app/",
    featured: true,
  },
  {
    id: "gaming-studio",
    name: "Nexus Forge — Indie Game Marketplace",
    badge: "Full-Stack E-Commerce // Angular 17 Signals",
    tagline: "Immersive digital gaming marketplace with 3D flip card checkout and reactive cart.",
    summary:
      "A high-performance full-stack game store built with Angular 17, Express.js, and Vercel Serverless. Powered by Angular Signals for fine-grained reactivity, 3D CSS flip-card payment simulation, and an interactive HTML5 Canvas scratch-off mechanic for revealing purchased license keys.",
    metrics: [
      { label: "Reactivity", value: "Angular Signals", detail: "Zero-flicker fine-grained state" },
      { label: "Interactivity", value: "3D Flip & Scratch", detail: "HTML5 Canvas license reveal" },
      { label: "Catalog", value: "12 Games", detail: "Rich metadata & trailer embeds" },
      { label: "Backend", value: "Serverless", detail: "Express.js API on Vercel" },
    ],
    challenge:
      "E-commerce storefronts frequently suffer from sluggish state synchronizations, uninspired checkout experiences, and static post-purchase confirmation screens that bore users.",
    architecturalSolution:
      "Architected the cart and checkout states using Angular 17 Signals, achieving sub-10ms state propagation without Zone.js overhead. Designed tactile micro-interactions including a 60fps CSS 3D flipping credit card with auto-card brand detection and a canvas-based scratchable foil key reveal.",
    keyInnovations: [
      "Angular 17 Signals state store eliminating unnecessary change-detection cycles",
      "CSS 3D perspective flip card with interactive CVV tilt and live validation",
      "HTML5 Canvas scratch-off foil effect with realistic particle brush physics",
      "Express.js serverless microservice simulating transactional order fulfillment",
    ],
    stack: ["Angular 17", "TypeScript", "Express.js", "Vercel Serverless", "HTML5 Canvas", "Tailwind CSS"],
    githubUrl: "https://github.com/ayush-studio/gaming-studio",
    liveUrl: "https://gaming-studio-khaki.vercel.app/",
    featured: true,
  },
];

// ─── Recruiter Quick-Facts ───────────────────────────────────────────────────
export const RECRUITER_QUICK_FACTS = {
  name: "Ayush Kumar",
  title: "Frontend Developer & AI Specialist",
  targetRoles: ["Senior Frontend Engineer", "UI Developer / UI Architect", "Full-Stack UI Engineer"],
  totalExperience: "2024 – Present (Deloitte USI)",
  location: "Bengaluru, Karnataka, India",
  workPreference: "Hybrid / On-site / Remote (Immediate to 30 days notice)",
  coreSkills: [
    "React / Next.js",
    "Angular (v14–17)",
    "TypeScript / JavaScript",
    "Generative AI & LLM UI",
    "GraphQL & REST APIs",
    "Tailwind CSS & SCSS",
    "State Management (Signals, Zustand, RxJS)",
    "Performance Optimization",
  ],
  keyAchievements: [
    "Deloitte Applause Award for rapid 4-week delivery of enterprise Healthcare AI Chatbot",
    "15–20% page load acceleration via custom GraphQL queries eliminating REST over-fetching",
    "Architected Zero-LLM static code analyzer saving 100% of recurring token costs",
    "Mentored junior engineers and led frontend peer code reviews adhering to enterprise PR standards",
  ],
  email: "ayushkumaar41@gmail.com",
  linkedin: "https://www.linkedin.com/in/ayush-kumar-017640191/",
  github: "https://github.com/ayush-studio",
  resumeUrl: "/resume.pdf",
};

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

