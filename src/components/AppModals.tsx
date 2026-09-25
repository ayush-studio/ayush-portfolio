"use client";

import { useState, useEffect } from "react";
import CommandPalette from "./CommandPalette";
import RecruiterModal from "./RecruiterModal";
import CaseStudyModal from "./CaseStudyModal";
import { FLAGSHIP_PROJECTS, type FlagshipCaseStudy } from "@/data/data";

export default function AppModals() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const [activeStudy, setActiveStudy] = useState<FlagshipCaseStudy | null>(null);

  // Global Keyboard shortcuts & Event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K -> Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      // Cmd+R or Ctrl+R with Shift/Alt or custom trigger -> we let browser reload default, but listen to custom events
    };

    const handleOpenCommand = () => setIsCommandOpen(true);
    const handleOpenRecruiter = () => setIsRecruiterOpen(true);
    const handleOpenCaseStudy = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      const found = FLAGSHIP_PROJECTS.find((p) => p.id === customEvent.detail?.id);
      if (found) setActiveStudy(found);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenCommand);
    window.addEventListener("open-recruiter-modal", handleOpenRecruiter);
    window.addEventListener("open-case-study", handleOpenCaseStudy as EventListener);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenCommand);
      window.removeEventListener("open-recruiter-modal", handleOpenRecruiter);
      window.removeEventListener("open-case-study", handleOpenCaseStudy as EventListener);
    };
  }, []);

  const handleOpenCaseStudyFromCommand = (id: string) => {
    const found = FLAGSHIP_PROJECTS.find((p) => p.id === id);
    if (found) setActiveStudy(found);
  };

  return (
    <>
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenRecruiter={() => setIsRecruiterOpen(true)}
        onOpenCaseStudy={handleOpenCaseStudyFromCommand}
      />
      <RecruiterModal
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
      />
      <CaseStudyModal
        study={activeStudy}
        onClose={() => setActiveStudy(null)}
      />
    </>
  );
}
