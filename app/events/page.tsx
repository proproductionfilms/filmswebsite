"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2, Play } from "lucide-react";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";

type EventCard = {
  id: number;
  number: string;
  heading: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: string;
  previewSrc: string;
  videoSrc: string;
  driveUrl: string;
};

const EVENT_CARDS: EventCard[] = [
  {
    id: 1,
    number: "01",
    heading: "Microsoft",
    title: "Microsoft",
    subtitle: "Enterprise Technology Summit",
    image: "/events-gallery/microsoft.jpg",
    aspect: "aspect-[16/10]",
    previewSrc: "/videos/events/microsoft-preview.mp4",
    videoSrc: "/videos/events/microsoft.mp4",
    driveUrl: "https://drive.google.com/file/d/18i1sqBhHrKsk-AQOBuvbrzIX27ZKFZG9/preview",
  },
  {
    id: 2,
    number: "02",
    heading: "Western Digital",
    title: "Western Digital",
    subtitle: "Corporate Highlights & Partner Summit",
    image: "/events-gallery/wd.jpg",
    aspect: "aspect-[16/10]",
    previewSrc: "/videos/events/wd-preview.mp4",
    videoSrc: "/videos/events/wd.mp4",
    driveUrl: "https://drive.google.com/file/d/1Ak_ryhDLKMKbjDMTylfU7l5ggsC9xyp4/preview",
  },
  {
    id: 3,
    number: "03",
    heading: "Hauntfest",
    title: "Hauntfest",
    subtitle: "Immersive Festival & Live Stage Production",
    image: "/events-gallery/hauntfest.jpg",
    aspect: "aspect-[16/10]",
    previewSrc: "/videos/events/hauntfest-preview.mp4",
    videoSrc: "/videos/events/hauntfest.mp4",
    driveUrl: "https://drive.google.com/file/d/1HOR_CIYjQTsRATTs8dVAG-5G96YmuMto/preview",
  },
  {
    id: 4,
    number: "04",
    heading: "Deloitte",
    title: "Deloitte",
    subtitle: "Leadership Conclave & Corporate Gala",
    image: "/events-gallery/deloitte.jpg",
    aspect: "aspect-[16/10]",
    previewSrc: "/videos/events/deloitte-preview.mp4",
    videoSrc: "/videos/events/deloitte.mp4",
    driveUrl: "https://drive.google.com/file/d/1obKzY4fkkWoQPH6PU9B2FQMs_FmQLhXG/preview",
  },
  {
    id: 5,
    number: "05",
    heading: "Airport Moksha Event",
    title: "Airport Moksha Event",
    subtitle: "Kempegowda International Airport Terminal 2",
    image: "/events-gallery/airport.jpg",
    aspect: "aspect-[16/10]",
    previewSrc: "/videos/events/airport-preview.mp4",
    videoSrc: "/videos/events/airport.mp4",
    driveUrl: "https://drive.google.com/file/d/11bVy8usPXsGPBJ-CH9yHo4V5lb8eCqzS/preview",
  },
  {
    id: 6,
    number: "06",
    heading: "Caterpillar",
    title: "Caterpillar",
    subtitle: "A Century of Industrial Excellence · 100 Years",
    image: "/events-gallery/cat.jpg",
    aspect: "aspect-[16/10]",
    previewSrc: "/videos/events/cat-preview.mp4",
    videoSrc: "/videos/events/cat.mp4",
    driveUrl: "https://drive.google.com/file/d/18Cn5G-RgBswF07iWfBxTLPDpFe103xyc/preview",
  },
];

function EventCardItem({
  card,
  idx,
  onOpen,
}: {
  card: EventCard;
  idx: number;
  onOpen: () => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = cardRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    // Smart IntersectionObserver: play when entering viewport, pause when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        rootMargin: "250px 0px 250px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="flex flex-col">
      {/* Heading before card (Centered & Aligned) */}
      <div className="w-full h-8 sm:h-9 flex items-center justify-center text-center mb-2.5 sm:mb-3">
        <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.65rem] text-[#2b2721] font-normal tracking-[0.01em] select-none leading-none">
          {card.heading}
        </h3>
      </div>

      {/* Card with Running Video - GPU accelerated & silky smooth lift */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: idx * 0.06 }}
        onClick={onOpen}
        className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#1c1813] border-2 sm:border-[2.5px] border-[#63452c] hover:border-[#422c1b] shadow-[0_10px_28px_rgba(99,69,44,0.14)] hover:shadow-[0_20px_42px_rgba(66,44,27,0.24)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu hover:-translate-y-1.5 will-change-transform"
      >
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#241e18]">
          <video
            ref={videoRef}
            src={card.previewSrc}
            poster={card.image}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 pointer-events-none"
          />

          {/* Center Play Button (Visible on touch, smooth GPU scale on hover) */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/65 backdrop-blur-md border border-white/35 text-white shadow-[0_12px_36px_rgba(0,0,0,0.6)] opacity-90 sm:opacity-0 scale-90 sm:scale-75 sm:group-hover:opacity-100 sm:group-hover:scale-100 transform-gpu will-change-transform transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <span className="absolute inset-0 rounded-full border border-white/25 animate-ping opacity-0 group-hover:opacity-50" />
              <Play className="w-5 h-5 sm:w-7 sm:h-7 fill-white text-white ml-0.5 sm:ml-1 transition-transform duration-200 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function EventsPage() {
  const [activeVideoIdx, setActiveVideoIdx] = React.useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const fullVideoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const openFullVideo = (index: number) => {
    setActiveVideoIdx(index);
  };

  const closeFullVideo = React.useCallback(() => {
    if (fullVideoRef.current) {
      fullVideoRef.current.pause();
      fullVideoRef.current.currentTime = 0;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setActiveVideoIdx(null);
    setIsFullscreen(false);
  }, []);

  const nextVideo = React.useCallback(() => {
    setActiveVideoIdx((curr) => {
      if (curr === null) return 0;
      return (curr + 1) % EVENT_CARDS.length;
    });
  }, []);

  const prevVideo = React.useCallback(() => {
    setActiveVideoIdx((curr) => {
      if (curr === null) return 0;
      return (curr - 1 + EVENT_CARDS.length) % EVENT_CARDS.length;
    });
  }, []);

  const toggleNativeFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch(() => {});
    }
  };

  // Listen to native fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Keyboard navigation & body scroll lock
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeVideoIdx !== null) closeFullVideo();
      }
      if (activeVideoIdx !== null) {
        if (e.key === "ArrowRight") nextVideo();
        if (e.key === "ArrowLeft") prevVideo();
      }
    };

    if (activeVideoIdx !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeVideoIdx, closeFullVideo, nextVideo, prevVideo]);

  const activeCard = activeVideoIdx !== null ? EVENT_CARDS[activeVideoIdx] : null;

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-transparent">
      {/* Navigation Header */}
      <TopHeader />

      {/* Main Content Area */}
      <section className="relative z-10 w-full pt-[78px] sm:pt-[98px] md:pt-[104px] pb-16 sm:pb-20 px-3 sm:px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Section Heading: Animated Capital "EVENTS" matching "FILMS" */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.09,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2b2721] font-medium tracking-[0.16em] sm:tracking-[0.28em] uppercase flex items-center justify-center pl-[0.16em] sm:pl-[0.28em] select-none [-webkit-text-stroke:0.35px_currentColor]"
            >
              {"EVENTS".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 35,
                      filter: "blur(10px)",
                      scale: 0.88,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      scale: 1,
                      transition: {
                        type: "spring",
                        damping: 16,
                        stiffness: 140,
                      },
                    },
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.08,
                    color: "#16130f",
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  className="inline-block cursor-default transition-colors"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtle cinematic accent line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-[2px] w-12 sm:w-16 mx-auto mt-2.5 sm:mt-3 bg-[#63452c]/45 rounded-full origin-center"
            />
          </div>

          {/* Row 1: MICROSOFT · WESTERN DIGITAL · HAUNTFEST */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mb-16 sm:mb-20 lg:mb-24">
            {EVENT_CARDS.slice(0, 3).map((card, idx) => (
              <EventCardItem
                key={card.id}
                card={card}
                idx={idx}
                onOpen={() => openFullVideo(idx)}
              />
            ))}
          </div>

          {/* Row 2 (Moved clearly below): DELOITTE · AIRPORT MOKSHA EVENT · CATERPILLAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {EVENT_CARDS.slice(3, 6).map((card, idx) => (
              <EventCardItem
                key={card.id}
                card={card}
                idx={idx + 3}
                onOpen={() => openFullVideo(idx + 3)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-20 w-full mt-16 sm:mt-24 md:mt-32">
        <Footer />
      </div>

      {/* Full Page Edge-to-Edge Cinematic Theater View */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeCard && (
              <motion.div
                ref={containerRef}
                role="dialog"
                aria-modal="true"
                aria-label={activeCard.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[99999] w-screen h-screen bg-black flex flex-col justify-between overflow-hidden select-none"
              >
                {/* Top Minimal Floating Control Bar */}
                <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-8 py-3 sm:py-6 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-auto gap-2">
                  {/* Title & Brand */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-[#63452c] text-[#f7f3ee] text-[10px] font-mono uppercase tracking-[0.2em] font-semibold border border-[#d4af37]/40 shadow-sm flex-shrink-0">
                      PRO PRODUCTION EVENTS
                    </span>
                    <span className="text-white/90 font-serif text-sm sm:text-xl tracking-wide drop-shadow-md truncate">
                      {activeCard.heading}
                    </span>
                    <span className="hidden md:inline-block text-[#d4af37] text-xs font-mono tracking-widest uppercase opacity-80">
                      · {activeCard.subtitle}
                    </span>
                  </div>

                  {/* Action Controls */}
                  <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <span className="text-[11px] sm:text-xs font-mono text-white/50 tracking-wider">
                      {activeVideoIdx !== null ? activeVideoIdx + 1 : 1} / {EVENT_CARDS.length}
                    </span>

                    {/* Fullscreen Toggle */}
                    <button
                      type="button"
                      onClick={toggleNativeFullscreen}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95 shadow-lg"
                      aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </button>

                    {/* Close Full Page View */}
                    <button
                      type="button"
                      onClick={closeFullVideo}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95 shadow-lg"
                      aria-label="Close full page video"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Left Nav Arrow */}
                <button
                  type="button"
                  onClick={prevVideo}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/55 hover:bg-black/90 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer backdrop-blur-md hover:scale-110 active:scale-95 shadow-2xl"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                </button>

                {/* Right Nav Arrow */}
                <button
                  type="button"
                  onClick={nextVideo}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/55 hover:bg-black/90 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer backdrop-blur-md hover:scale-110 active:scale-95 shadow-2xl"
                  aria-label="Next video"
                >
                  <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                </button>

                {/* Full Viewport Center Video Player */}
                <div className="relative w-full h-full flex-1 flex items-center justify-center bg-black overflow-hidden">
                  <video
                    ref={fullVideoRef}
                    key={activeCard.videoSrc}
                    src={activeCard.videoSrc}
                    poster={activeCard.image}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full max-h-screen object-contain"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </main>
  );
}
