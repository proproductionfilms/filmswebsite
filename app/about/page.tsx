"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Camera,
  Volume2,
  Layers,
  Move,
} from "lucide-react";

import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/ui/scroll-morph-hero";

// --- 4 Pillars of Filmmaking ---
const METHODOLOGY_PILLARS = [
  {
    number: "01",
    title: "RESEARCH & DISCOVERY",
    subtitle: "Stories Rooted in Truth",
    icon: Compass,
    description:
      "Every powerful documentary begins with curiosity. We research deeply, verify facts, and uncover the people, places, and moments that bring every story to life.",
    tags: ["Archival Research", "Factual Accuracy", "Story Development"],
  },
  {
    number: "02",
    title: "CINEMATIC CRAFT",
    subtitle: "Every Frame Has a Purpose",
    icon: Camera,
    description:
      "We combine thoughtful composition, natural light, and intentional camera movement to create visuals that feel immersive, authentic, and timeless.",
    tags: ["Visual Storytelling", "Cinematography", "Field Production"],
  },
  {
    number: "03",
    title: "SOUND & EMOTION",
    subtitle: "Hear the Story. Feel the Moment.",
    icon: Volume2,
    description:
      "From intimate interviews to the atmosphere of real locations, carefully crafted sound brings depth, emotion, and presence to every scene.",
    tags: ["Location Sound", "Foley & Ambience", "Sound Design"],
  },
  {
    number: "04",
    title: "EDITING & LEGACY",
    subtitle: "Stories Made to Endure",
    icon: Layers,
    description:
      "Through considered editing, precise colour grading, and thoughtful finishing, we create documentaries designed to preserve meaning and resonate for generations.",
    tags: ["Editorial Storytelling", "Colour Grading", "Master Delivery"],
  },
];

export default function AboutPage() {
  const blocksRef = React.useRef<HTMLDivElement>(null);

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-transparent selection:bg-[#9a6a3e]/20 selection:text-[#2b2721]">
      {/* Navigation Header */}
      <TopHeader />

      {/* Hero Section: Interactive 3D Values Morph */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center pt-[90px] pb-2">
        <div className="relative w-full h-[calc(100vh-130px)] min-h-[720px] max-h-[980px] overflow-hidden">
          <IntroAnimation />
        </div>
      </section>

      {/* SECTION: THE 4-PILLAR METHODOLOGY */}
      <section
        id="about-content"
        className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 lg:py-12 min-h-[calc(100vh-80px)] flex flex-col justify-center border-t border-[#2b2721]/10 bg-gradient-to-b from-transparent via-[#f3eee5]/60 to-transparent scroll-mt-14 overflow-visible"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#2b2721]/15 text-[#2b2721]/75 text-[11px] font-bold tracking-[0.2em] uppercase mb-2 shadow-sm">
                Filmmaking Discipline · Core Standards
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2b2721] font-normal tracking-tight leading-tight">
                Our 4-Pillar Craft & Methodology
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#6b6053] font-newsreader leading-relaxed">
              Every documentary we create follows an unyielding standard of research, optical precision,
              field sound engineering, and archival permanence.
            </p>
          </div>

          {/* 4 Solid Methodology Blocks (2x2 Grid) - Touch Responsive */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {METHODOLOGY_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -4,
                    scale: 1.012,
                    boxShadow: "0 22px 45px -8px rgba(39,31,24,0.6)",
                  }}
                  whileTap={{
                    scale: 0.985,
                    y: -1,
                    boxShadow: "0 8px 18px -4px rgba(39,31,24,0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  style={{
                    background: "linear-gradient(180deg, #44372c 0%, #342a21 48%, #271f18 100%)",
                    backgroundColor: "#342a21",
                  }}
                  className="p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl text-[#ede5da] border border-white/10 shadow-[0_12px_28px_-6px_rgba(42,33,25,0.4)] select-none flex flex-col justify-between group relative cursor-pointer hover:border-white/25 transition-colors"
                >
                  <div>
                    {/* Block Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 sm:pb-3.5 sm:mb-3.5 border-b border-white/12 pointer-events-none">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-serif text-2xl sm:text-3xl text-white/40 group-hover:text-white font-light transition-colors">
                          {pillar.number}
                        </span>
                        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#ede5da]/80">
                          {pillar.title}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#ede5da] group-hover:bg-white group-hover:text-[#342a21] transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 className="font-serif text-lg sm:text-xl lg:text-[22px] text-[#ede5da] font-normal leading-tight mb-2 sm:mb-2.5 pointer-events-none">
                      {pillar.subtitle}
                    </h3>

                    {/* Description Body */}
                    <p className="text-xs sm:text-[13px] lg:text-[13.5px] text-[#ede5da]/85 font-newsreader leading-relaxed pointer-events-none">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Block Footer: Key Disciplines */}
                  <div className="pt-3 mt-3.5 sm:pt-4 sm:mt-4 border-t border-white/12 flex flex-wrap items-center gap-1.5 sm:gap-2 pointer-events-none">
                    {pillar.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md sm:rounded-lg bg-white/10 text-[#ede5da] text-[10px] sm:text-[10.5px] font-mono uppercase tracking-wider border border-white/12"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <Footer />
    </main>
  );
}
