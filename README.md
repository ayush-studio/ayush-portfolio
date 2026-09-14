# 🚀 Ayush Kumar — Personal Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A modern, highly interactive personal portfolio website showcasing my work as a **Frontend Developer & AI Integration Specialist** at Deloitte USI.

---

## ✨ Features

- **🌗 Dark / Light Mode** — Seamless theme switching powered by `next-themes`
- **🎞️ Framer Motion Animations** — Staggered hero entrance, `whileInView` scroll reveals, and hover micro-interactions across every section
- **📌 Fixed Navbar** — Blur backdrop on scroll, animated active section pill, mobile hamburger drawer
- **🌌 Hero Section** — Animated gradient headline, floating particle orbs, CTA buttons with glow effects
- **👤 About Section** — 2-column layout with animated avatar card and stats grid
- **🗂️ Experience Timeline** — Vertical animated timeline with all Deloitte USI highlights, including Applause Award badges
- **🔗 GitHub Project Grid** — Live data from the GitHub API (`ISR` revalidation every 1hr), with a rich static fallback
- **⚡ Skills Marquee** — 3-row auto-scrolling marquee (Frontend / Backend / AI & Tools) with alternating direction and hover-to-pause
- **📬 Contact Form** — Fully validated form (Name, Email, Message) with animated loading/success states and mailto integration
- **📱 100% Mobile Responsive** — All layouts built with Tailwind's `sm:`, `md:`, and `lg:` prefixes

---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + Custom CSS Variables |
| Animations | Framer Motion |
| Icons | Lucide React + React Icons |
| Theming | next-themes |
| Fonts | Google Fonts (Inter) |
| Data | GitHub REST API (ISR) + Static Fallback |
| Deployment | Vercel-ready |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css          ← Design tokens, marquee keyframes, glassmorphism
│   ├── layout.tsx           ← Root layout (ThemeProvider, Navbar, SEO metadata)
│   └── page.tsx             ← Page assembling all sections
├── components/
│   ├── Navbar.tsx           ← Fixed nav with blur, active pill, mobile menu
│   ├── Hero.tsx             ← Gradient headline, orb animations, CTAs
│   ├── About.tsx            ← Summary, avatar card, stats grid
│   ├── ExperienceTimeline.tsx ← Vertical animated timeline
│   ├── ProjectGrid.tsx      ← GitHub API fetch → static fallback
│   ├── ProjectCard.tsx      ← Glassmorphism card with language color tags
│   ├── SkillsMarquee.tsx    ← 3-row scrolling skills with hover pause
│   ├── Contact.tsx          ← Validated form + social links
│   └── ThemeToggle.tsx      ← Sun ↔ Moon animated toggle
├── data/
│   └── data.ts              ← All static content (experience, skills, projects)
└── lib/
    └── github.ts            ← GitHub API utility with ISR + fallback
```

---

## ⚡ Getting Started

```bash
# Clone the repo
git clone https://github.com/ayush-studio/ayush-portfolio.git
cd ayush-portfolio

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔗 Connect

- **LinkedIn**: [ayush-kumar-017640191](https://www.linkedin.com/in/ayush-kumar-017640191/)
- **GitHub**: [ayush-studio](https://github.com/ayush-studio)
- **Email**: ayushkumaar41@gmail.com

---

<p align="center">Built with ❤️ using Next.js, Tailwind CSS & Framer Motion</p>
