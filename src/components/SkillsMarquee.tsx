"use client";

import { motion } from "framer-motion";
import { SKILL_CATEGORIES, type SkillCategory } from "@/data/data";

/**
 * SkillChip — A single animated skill chip.
 */
function SkillChip({
  skill,
  bgColor,
}: {
  skill: string;
  bgColor: string;
}) {
  return (
    <motion.span
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                  border whitespace-nowrap cursor-default select-none
                  transition-shadow duration-200 hover:shadow-md ${bgColor}`}
    >
      {skill}
    </motion.span>
  );
}

/**
 * MarqueeRow — An infinitely scrolling row of skill chips.
 * Direction alternates per row to create visual depth.
 */
function MarqueeRow({
  category,
  reverse = false,
}: {
  category: SkillCategory;
  reverse?: boolean;
}) {
  // Duplicate skills array so the marquee seamlessly loops
  const doubled = [...category.skills, ...category.skills];

  return (
    <div className="overflow-hidden relative">
      {/* Left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10"
           style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10"
           style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }} />

      <div
        className={`flex gap-4 w-max ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}
      >
        {doubled.map((skill, i) => (
          <SkillChip
            key={`${skill}-${i}`}
            skill={skill}
            bgColor={category.bgColor}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * SkillsMarquee — Three rows of auto-scrolling skill chips, one per category.
 * Rows alternate scroll direction for visual interest.
 */
export default function SkillsMarquee() {
  return (
    <section id="skills" className="py-24 relative bg-[var(--bg-secondary)] overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.15), transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">
            05 // Technical Toolkit &amp; Stack
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">
            Technologies I work with daily — hover any chip to pause the scroll.
          </p>
        </motion.div>

        {/* Category labels + Marquee rows */}
        <div className="space-y-10">
          {SKILL_CATEGORIES.map((category, i) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="space-y-3"
            >
              {/* Category label */}
              <div className="flex items-center gap-3 px-2">
                <span className={`text-xs font-bold tracking-widest uppercase ${category.color}`}>
                  {category.label}
                </span>
                <div className="flex-1 h-px bg-[var(--border-color)]" />
              </div>

              {/* Scrolling row */}
              <MarqueeRow category={category} reverse={i % 2 !== 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
