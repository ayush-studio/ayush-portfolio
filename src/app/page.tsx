import Hero from "@/components/Hero";
import About from "@/components/About";
import EngineeringPrinciples from "@/components/EngineeringPrinciples";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectGrid from "@/components/ProjectGrid";
import SkillsMarquee from "@/components/SkillsMarquee";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <EngineeringPrinciples />
      <ExperienceTimeline />
      <ProjectGrid />
      <SkillsMarquee />
      <Contact />
    </>
  );
}
