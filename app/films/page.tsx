"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2, Play } from "lucide-react";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";

type FilmVideoItem = {
  badge?: string;
  title: string;
  videoSrc: string;
  driveUrl: string;
};

type FilmCard = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: string;
  videoSrc?: string;
  driveUrl?: string;
  videos?: FilmVideoItem[];
};

const FILM_CARDS: FilmCard[] = [
  {
    id: 1,
    number: "01",
    title: "Bangalore Division",
    subtitle: "South Western Railway",
    image: "/films-gallery/img1.png",
    aspect: "aspect-[16/10]",
    videoSrc: "/videos/railway.mp4",
    driveUrl: "https://drive.google.com/file/d/1Mc2CpaIPt9IWtO-h6wpJCVrxwdMxXQ6R/preview",
  },
  {
    id: 2,
    number: "02",
    title: "Indian Institute of Science",
    subtitle: "A Legacy of Excellence",
    image: "/films-gallery/img2.png",
    aspect: "aspect-[16/10]",
    videos: [
      {
        badge: "FILM 1",
        title: "Film 1 · IISc",
        videoSrc: "/videos/iisc-msc.mp4",
        driveUrl: "https://drive.google.com/file/d/1zeOIkrNbubq6VB_-a8cRxXiJ0ak2NY8I/preview",
      },
      {
        badge: "FILM 2",
        title: "Film 2 · IISc",
        videoSrc: "/videos/iisc-spell.mp4",
        driveUrl: "https://drive.google.com/file/d/1g1pzGLR4I6GHuyIg7c6wd5Y-jAP3TwTK/preview",
      },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Schneider Electric",
    subtitle: "Industrial Infrastructure & Innovation",
    image: "/films-gallery/img3.png",
    aspect: "aspect-[16/10]",
    videoSrc: "/videos/schneider.mp4",
    driveUrl: "https://drive.google.com/file/d/1qUR-DNEkjhObSY_kcSWSF733y1DkhKdw/preview",
  },
  {
    id: 4,
    number: "04",
    title: "Kewaunee Scientific Corporation",
    subtitle: "Laboratory Engineering & Architecture",
    image: "/films-gallery/img4.png",
    aspect: "aspect-[16/10]",
    videoSrc: "/videos/kewaunee.mp4",
    driveUrl: "https://drive.google.com/file/d/1OK-xFWIE6bImILskAqdgI5TiKj8WRd0j/preview",
  },
  {
    id: 5,
    number: "05",
    title: "Bhuler",
    subtitle: "Precision Engineering Documentary",
    image: "/films-gallery/img5.png",
    aspect: "aspect-[16/10]",
    videoSrc: "/videos/bhuler.mp4",
    driveUrl: "https://drive.google.com/file/d/1fac-wui6LNJf835-gB_av_C-DaowWokM/preview",
  },
  {
    id: 6,
    number: "06",
    title: "AIMS",
    subtitle: "Institutional Legacy & Healthcare",
    image: "/films-gallery/img6.png",
    aspect: "aspect-[16/10]",
    videoSrc: "/videos/aims.mp4",
    driveUrl: "https://drive.google.com/file/d/15wYwLdfGjyM99MjIdOhpB8QqKrpS5TKW/preview",
  },
  {
    id: 7,
    number: "07",
    title: "International Centre for Theoretical Sciences",
    subtitle: "Theoretical Physics & Research Campus",
    image: "/films-gallery/img7.png",
    aspect: "aspect-[16/10]",
    videoSrc: "/videos/icts.mp4",
    driveUrl: "https://drive.google.com/file/d/1zGKGYpd7U5xbS-TyPsNtlxSG35bwHeAq/preview",
  },
];

type ActiveVideoModal = {
  title: string;
  subtitle: string;
  videos: FilmVideoItem[];
};

export default function FilmsPage() {
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);
  const [activeModal, setActiveModal] = React.useState<ActiveVideoModal | null>(null);
  const [multiTab, setMultiTab] = React.useState<"all" | number>("all");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIdx(index);
  };

  const closeLightbox = React.useCallback(() => {
    setSelectedIdx(null);
  }, []);

  const nextImage = React.useCallback(() => {
    setSelectedIdx((curr) => {
      if (curr === null) return 0;
      return (curr + 1) % FILM_CARDS.length;
    });
  }, []);

  const prevImage = React.useCallback(() => {
    setSelectedIdx((curr) => {
      if (curr === null) return 0;
      return (curr - 1 + FILM_CARDS.length) % FILM_CARDS.length;
    });
  }, []);

  const openVideoModal = (card: FilmCard) => {
    const videosList: FilmVideoItem[] = card.videos && card.videos.length > 0
      ? card.videos
      : [
          {
            badge: "FILM 1",
            title: card.title,
            videoSrc: card.videoSrc || "",
            driveUrl: card.driveUrl || "",
          },
        ];

    setActiveModal({
      title: card.title,
      subtitle: card.subtitle,
      videos: videosList,
    });
    setMultiTab("all");
  };

  const closeVideoModal = React.useCallback(() => {
    // Pause any active HTML5 videos in the modal
    if (typeof document !== "undefined") {
      const vids = document.querySelectorAll<HTMLVideoElement>(".screening-video-player");
      vids.forEach((v) => {
        v.pause();
        v.currentTime = 0;
      });
    }
    setActiveModal(null);
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeModal) closeVideoModal();
        if (selectedIdx !== null) closeLightbox();
      }
      if (selectedIdx !== null) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };

    if (selectedIdx !== null || activeModal !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIdx, activeModal, closeLightbox, closeVideoModal, nextImage, prevImage]);

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-transparent">
      {/* Navigation Header */}
      <TopHeader />

      {/* Main Content Area: 3-column Card Grid */}
      <section className="relative z-10 w-full pt-[92px] sm:pt-[98px] md:pt-[104px] pb-16 sm:pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Section Heading: Animated Capital "FILMS" */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-7 md:mb-8">
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
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2b2721] font-medium tracking-[0.22em] sm:tracking-[0.28em] uppercase flex items-center justify-center pl-[0.22em] sm:pl-[0.28em] select-none [-webkit-text-stroke:0.35px_currentColor]"
            >
              {"FILMS".split("").map((char, index) => (
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

          {/* 3 Cards Per Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {FILM_CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                onClick={() => openVideoModal(card)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#1c1813] border-2 sm:border-[2.5px] border-[#63452c] hover:border-[#422c1b] shadow-[0_10px_28px_rgba(99,69,44,0.14)] hover:shadow-[0_20px_42px_rgba(66,44,27,0.24)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu hover:-translate-y-1.5 will-change-transform"
              >
                {/* Image Container with 16:10 aspect ratio matching reference */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#241e18]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading={idx < 3 ? "eager" : "lazy"}
                  />

                  {/* Top-Right Expand Icon Badge (Opens Image Lightbox) */}
                  <button
                    type="button"
                    onClick={(e) => openLightbox(idx, e)}
                    className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 hover:scale-110 opacity-0 group-hover:opacity-100 transform-gpu will-change-transform transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 shadow-md cursor-pointer"
                    aria-label="Expand image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Center Play Button (appears smoothly on hover) */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/65 backdrop-blur-md border border-white/35 text-white shadow-[0_12px_36px_rgba(0,0,0,0.6)] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transform-gpu will-change-transform transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {/* Ambient ring pulse on hover */}
                      <span className="absolute inset-0 rounded-full border border-white/25 animate-ping opacity-0 group-hover:opacity-50" />
                      {/* Play Icon */}
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white ml-1 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Subtle Gradient Overlay on Hover with Title & Subtitle */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] mb-1">
                      {card.subtitle}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#f6efe2] font-normal leading-snug">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer moved lower down with generous spacing */}
      <div className="relative z-20 w-full mt-16 sm:mt-24 md:mt-32">
        <Footer />
      </div>

      {/* Cinematic Video Screening Modal (Handles 1 or 2 Films) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeModal && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={activeModal.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/60 backdrop-blur-md"
                onClick={closeVideoModal}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-[#c4a472]/35 flex flex-col my-auto max-h-[92vh] ${
                    activeModal.videos.length > 1
                      ? "w-full max-w-[1260px]"
                      : "w-full max-w-[960px]"
                  }`}
                  style={{
                    background: "#16130f",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#1c1813] flex-shrink-0">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#d4af37]">
                    {activeModal.videos.length > 1
                      ? "PRO PRODUCTION FILMS · 2 FILMS"
                      : "PRO PRODUCTION FILMS · SCREENING"}
                  </span>
                  <h3 className="text-base sm:text-xl md:text-2xl font-serif text-[#f6efe2] tracking-wide mt-0.5">
                    {activeModal.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {/* Tab switcher for 2-film modal matching Homepage Sketchbook */}
                  {activeModal.videos.length > 1 && (
                    <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono tracking-wider">
                      <button
                        type="button"
                        onClick={() => setMultiTab("all")}
                        className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                          multiTab === "all"
                            ? "bg-[#d4af37] text-black font-semibold shadow-sm"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        BOTH FILMS
                      </button>
                      <button
                        type="button"
                        onClick={() => setMultiTab(0)}
                        className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                          multiTab === 0
                            ? "bg-[#d4af37] text-black font-semibold shadow-sm"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        FILM 1
                      </button>
                      <button
                        type="button"
                        onClick={() => setMultiTab(1)}
                        className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                          multiTab === 1
                            ? "bg-[#d4af37] text-black font-semibold shadow-sm"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        FILM 2
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={closeVideoModal}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors text-2xl font-light cursor-pointer border border-white/10 flex-shrink-0"
                    aria-label="Close video modal"
                  >
                    &times;
                  </button>
                </div>
              </div>

              {/* Video Player Body */}
              {activeModal.videos.length > 1 ? (
                /* Dual Video Layout matching Homepage 2nd Page */
                <div className="p-4 sm:p-6 bg-[#0f0d0a] overflow-y-auto max-h-[80vh]">
                  <div
                    className={`grid gap-4 sm:gap-6 ${
                      multiTab === "all"
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 max-w-3xl mx-auto"
                    }`}
                  >
                    {activeModal.videos.map((vid, vIdx) => {
                      const isVisible = multiTab === "all" || multiTab === vIdx;
                      if (!isVisible) return null;

                      return (
                        <div
                          key={vIdx}
                          className="rounded-xl border border-white/10 bg-[#16130f] overflow-hidden flex flex-col shadow-lg"
                        >
                          {/* Individual Video Header Bar */}
                          <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2.5 bg-[#1c1813]">
                            <span className="px-2 py-0.5 rounded bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-mono uppercase tracking-wider font-semibold">
                              {vid.badge || `FILM ${vIdx + 1}`}
                            </span>
                            <h4 className="text-xs sm:text-sm text-white/90 font-serif tracking-wide">
                              {vid.title}
                            </h4>
                          </div>

                          {/* Video Player */}
                          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                            {vid.videoSrc ? (
                              <video
                                src={vid.videoSrc}
                                controls
                                playsInline
                                className="screening-video-player w-full h-full object-contain"
                              />
                            ) : (
                              <iframe
                                src={vid.driveUrl}
                                title={vid.title}
                                className="w-full h-full border-0"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Single Video Layout */
                <div className="relative w-full aspect-video bg-black flex items-center justify-center flex-1 min-h-0">
                  {activeModal.videos[0].videoSrc ? (
                    <video
                      src={activeModal.videos[0].videoSrc}
                      controls
                      autoPlay
                      playsInline
                      className="screening-video-player w-full h-full object-contain"
                    />
                  ) : (
                    <iframe
                      src={activeModal.videos[0].driveUrl}
                      title={activeModal.videos[0].title}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}

      {/* High-Resolution Lightbox Modal */}
      {mounted &&
        selectedIdx !== null &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors border border-white/15 cursor-pointer"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Content Container */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-white/15 bg-[#120f0c]">
                  <img
                    src={FILM_CARDS[selectedIdx].image}
                    alt={FILM_CARDS[selectedIdx].title}
                    className="max-h-[75vh] w-auto max-w-full object-contain mx-auto block"
                  />

                  {/* Modal Caption Bar */}
                  <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-[#1a1612] border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37]">
                        {FILM_CARDS[selectedIdx].subtitle}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg text-[#f6efe2]">
                        {FILM_CARDS[selectedIdx].title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-white/50 tracking-wider">
                      {selectedIdx + 1} / {FILM_CARDS.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </main>
  );
}
