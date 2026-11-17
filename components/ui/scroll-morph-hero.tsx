"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    word: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Dimensions ---
const CARD_WIDTH = 80;
const CARD_HEIGHT = 106;

function FlipCard({
    word,
    index,
    total,
    phase,
    target,
}: FlipCardProps) {
    // Alternating color pattern: Cream (even), Green (odd)
    const isCream = index % 2 === 0;

    // Font size scaling based on word length for flawless typography
    const wordLen = word.length;
    const fontSizeClass =
        wordLen <= 7
            ? "text-[14px] tracking-wide"
            : wordLen <= 10
            ? "text-[12px] tracking-tight"
            : "text-[10px] tracking-tight";

    return (
        <motion.div
            // Smoothly animate to coordinates defined by parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            style={{
                position: "absolute",
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group select-none"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180, scale: 1.08 }}
            >
                {/* FRONT FACE */}
                <div
                    className={`absolute inset-0 h-full w-full rounded-2xl flex items-center justify-center p-3 transition-all duration-300 ${
                        isCream
                            ? "bg-gradient-to-b from-[#FAF5EC] via-[#F4ECE0] to-[#EAE0D0] text-[#342a21] border border-[#d8cca8] shadow-[0_8px_20px_-6px_rgba(43,39,33,0.22),0_2px_6px_rgba(43,39,33,0.06)]"
                            : "bg-gradient-to-b from-[#44372c] via-[#342a21] to-[#271f18] text-[#ede5da] border border-white/10 shadow-[0_8px_22px_-6px_rgba(42,33,25,0.5),0_2px_6px_rgba(0,0,0,0.2)]"
                    }`}
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    {/* Centered Word */}
                    <span
                        className={`font-serif font-semibold leading-tight text-center select-none whitespace-nowrap px-1 ${fontSizeClass} ${
                            isCream ? "text-[#342a21]" : "text-[#ede5da]"
                        }`}
                        style={{
                            fontFamily: "'Newsreader', 'Instrument Serif', Georgia, serif",
                            textShadow: isCream ? "none" : "0 1px 2px rgba(0,0,0,0.35)",
                        }}
                    >
                        {word}
                    </span>

                    {/* Ambient gloss highlight */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 bg-gradient-to-tr from-transparent via-white/10 to-white/30" />
                </div>

                {/* BACK FACE (Inverted Color on 3D Flip) */}
                <div
                    className={`absolute inset-0 h-full w-full rounded-2xl flex items-center justify-center p-3 transition-all duration-300 ${
                        isCream
                            ? "bg-gradient-to-b from-[#44372c] via-[#342a21] to-[#271f18] text-[#ede5da] border border-white/10 shadow-[0_12px_28px_-6px_rgba(42,33,25,0.55)]"
                            : "bg-gradient-to-b from-[#FAF5EC] via-[#F4ECE0] to-[#EAE0D0] text-[#342a21] border border-[#d8cca8] shadow-[0_12px_28px_-6px_rgba(43,39,33,0.25)]"
                    }`}
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {/* Center: Inverted Word */}
                    <div className="flex flex-col items-center justify-center text-center px-1">
                        <span
                            className={`text-[7px] font-sans font-bold uppercase tracking-[0.22em] mb-1.5 ${
                                isCream ? "text-[#dcd4c3]" : "text-[#7d7265]"
                            }`}
                        >
                            Core Value
                        </span>
                        <span
                            className={`font-serif font-semibold leading-tight text-center select-none whitespace-nowrap px-1 ${fontSizeClass} ${
                                isCream ? "text-[#ede5da]" : "text-[#342a21]"
                            }`}
                            style={{
                                fontFamily: "'Newsreader', 'Instrument Serif', Georgia, serif",
                            }}
                        >
                            {word}
                        </span>
                    </div>

                    {/* Ambient gloss highlight */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-30 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- 19 Core Values Listed By User ---
const WORDS = [
    "Success",
    "Achievement",
    "Excellence",
    "Growth",
    "Progress",
    "Victory",
    "Ambition",
    "Innovation",
    "Creativity",
    "Leadership",
    "Passion",
    "Dedication",
    "Resilience",
    "Determination",
    "Inspiration",
    "Breakthrough",
    "Transformation",
    "Accomplishment",
    "Greatness",
];

const TOTAL_CARDS = WORDS.length;
const MAX_SCROLL = 1800; // Virtual scroll range tuned for snappy feel

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        // Initial set
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            // When already scrolled down into the page body, let normal window scroll upward
            if (e.deltaY < 0 && typeof window !== "undefined" && window.scrollY > 10) {
                return;
            }

            // Prevent default to smoothly control hero animation within bounds
            if ((e.deltaY > 0 && scrollRef.current < MAX_SCROLL) || (e.deltaY < 0 && scrollRef.current > 0)) {
                e.preventDefault();
            }

            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        // Touch support
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            if (deltaY < 0 && typeof window !== "undefined" && window.scrollY > 10) {
                return;
            }

            if ((deltaY > 0 && scrollRef.current < MAX_SCROLL) || (deltaY < 0 && scrollRef.current > 0)) {
                e.preventDefault();
            }

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    const morphProgress = useTransform(virtualScroll, [0, 500], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 45, damping: 20 });

    // 2. Scroll Rotation: Rotates bottom arc
    const scrollRotate = useTransform(virtualScroll, [500, 1800], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 45, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return WORDS.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    // --- Render Loop (Manual Calculation for Morph) ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-transparent overflow-hidden">
            {/* Inner Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text (Fades out when morphing to arc) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-4 max-w-[360px] sm:max-w-[440px]">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="font-serif text-center text-[#2b2721] text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] tracking-[0.01em] leading-[1.04] flex flex-col items-center justify-center select-none"
                    >
                        <span className="whitespace-nowrap font-normal">Pro Production</span>
                        <span className="italic font-normal text-[0.92em] text-[#2b2721] -mt-0.5">Films</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-3 text-[11px] font-sans font-medium tracking-[0.24em] text-[#2b2721]/55 uppercase"
                    >
                        Scroll to Explore
                    </motion.p>
                </div>

                {/* Arc Active Content (Fades in when bottom arc forms) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-[#2b2721] tracking-tight mb-4 font-koulen uppercase">
                        Explore Our Values
                    </h2>
                    <p className="text-sm md:text-base text-[#2b2721]/80 max-w-lg leading-relaxed font-newsreader">
                        From ambition to greatness, our principles drive every documentary we create. <br className="hidden md:block" />
                        Scroll through our core values shaping each story.
                    </p>
                </motion.div>

                {/* Main Cards Field */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {WORDS.map((word, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        // 1. Intro Phases (Scatter -> Line)
                        if (introPhase === "scatter") {
                            target = scatterPositions[i] || { x: 0, y: 0, rotation: 0, scale: 0.6, opacity: 0 };
                        } else if (introPhase === "line") {
                            const lineSpacing = 86;
                            const lineTotalWidth = TOTAL_CARDS * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            // 2. Circle Phase & Morph Logic
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // A. Calculate Circle Position
                            const circleRadius = isMobile
                                ? Math.min(minDimension * 0.35, 250)
                                : Math.min(minDimension * 0.39, 365);
                            const circleAngle = (i / TOTAL_CARDS) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // B. Calculate Bottom Arc Position
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.35 : 1.1);
                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_CARDS - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.08 : 1.6,
                            };

                            // C. Interpolate (Morph)
                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(isMobile ? 0.82 : 1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={word}
                                word={word}
                                index={i}
                                total={TOTAL_CARDS}
                                phase={introPhase}
                                target={target}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
