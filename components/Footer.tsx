"use client";

import * as React from "react";
import Link from "next/link";

export default function Footer() {
  const [isStamped, setIsStamped] = React.useState(false);
  const [stampKey, setStampKey] = React.useState(0);
  const footerRef = React.useRef<HTMLElement>(null);

  // Trigger stamp animation whenever user scrolls into the footer
  React.useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When user comes to footer, stamp down!
            setIsStamped(true);
          } else {
            // Reset when out of view so whenever user returns, it stamps down again
            setIsStamped(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Re-stamp on click
  const handleRestamp = () => {
    setIsStamped(false);
    setTimeout(() => {
      setStampKey((k) => k + 1);
      setIsStamped(true);
    }, 40);
  };

  return (
    <footer
      ref={footerRef}
      className="w-full text-[#ede5da] rounded-t-[2rem] sm:rounded-t-[3rem] md:rounded-t-[4.5rem] px-5 sm:px-8 md:px-12 lg:px-16 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 flex flex-col justify-between shadow-[0_-22px_55px_rgba(0,0,0,0.35)] border-t border-white/10 relative z-20 mt-auto overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #44372c 0%, #342a21 48%, #271f18 100%)",
        backgroundColor: "#342a21",
      }}
    >
      <style>{`
        @keyframes stampSlam {
          0% {
            opacity: 0;
            transform: scale(2.6) rotate(-26deg) translateY(-40px);
            filter: blur(5px);
          }
          55% {
            opacity: 1;
            transform: scale(0.93) rotate(-9deg) translateY(0);
            filter: blur(0px);
          }
          75% {
            transform: scale(1.05) rotate(-6.5deg) translateY(0);
          }
          100% {
            opacity: 0.95;
            transform: scale(1) rotate(-7.5deg) translateY(0);
            filter: blur(0px);
          }
        }

        @keyframes inkShockwave {
          0% {
            opacity: 0.65;
            transform: scale(0.7) rotate(-7.5deg);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.2) rotate(-7.5deg);
          }
          100% {
            opacity: 0;
            transform: scale(1.45) rotate(-7.5deg);
          }
        }
        @keyframes revealLine {
          0% {
            opacity: 0;
            transform: translateY(115%);
          }
          100% {
            opacity: 1;
            transform: translateY(0%);
          }
        }
      `}</style>

      <div className="w-full max-w-[1600px] mx-auto">
        {/* Main Grid: Left side has headline + massive display title, Right side has contact + links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 pb-8 md:pb-12">
          
          {/* Left Column: Heading on top, Massive PRO PRODUCTION FILMS line-by-line at the bottom */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="mb-8 md:mb-12">
              <p className="font-secondary text-2xl sm:text-3xl md:text-4xl text-[#ede5da] font-medium leading-tight tracking-tight">
                Got a film in mind?<br />
                We&apos;re here to make it happen.
              </p>
            </div>

            <div className="select-none pt-4 lg:pt-0">
              <h2
                aria-label="PRO PRODUCTION FILMS"
                className="font-koulen text-[15.5vw] sm:text-[12.5vw] lg:text-[8.4vw] xl:text-[8.8vw] uppercase leading-[0.80] tracking-tighter text-[#ffffff] select-none"
              >
                {/* Line 1: PRO */}
                <div className="overflow-hidden pb-1 sm:pb-1.5">
                  <span
                    className="inline-block whitespace-nowrap will-change-transform"
                    style={
                      isStamped
                        ? {
                            animation:
                              "revealLine 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both",
                          }
                        : { opacity: 0, transform: "translateY(115%)" }
                    }
                  >
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">P</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">R</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">O</span>
                  </span>
                </div>

                {/* Line 2: PRODUCTION */}
                <div className="overflow-hidden pb-1 sm:pb-1.5">
                  <span
                    className="inline-block whitespace-nowrap will-change-transform"
                    style={
                      isStamped
                        ? {
                            animation:
                              "revealLine 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both",
                          }
                        : { opacity: 0, transform: "translateY(115%)" }
                    }
                  >
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">P</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">R</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">O</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">D</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">U</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">C</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">T</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">I</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">O</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">N</span>
                  </span>
                </div>

                {/* Line 3: FILMS */}
                <div className="overflow-hidden pb-1 sm:pb-1.5">
                  <span
                    className="inline-block whitespace-nowrap will-change-transform"
                    style={
                      isStamped
                        ? {
                            animation:
                              "revealLine 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.44s both",
                          }
                        : { opacity: 0, transform: "translateY(115%)" }
                    }
                  >
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">F</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">I</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">L</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">M</span>
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-1">S</span>
                  </span>
                </div>
              </h2>
            </div>
          </div>

          {/* Right Column: Contact details (top right) & Links + Connect (bottom) */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:pl-6 xl:pl-10">
            
            {/* Contact details: Right-aligned on desktop */}
            <div className="mb-10 lg:text-right flex flex-col items-start lg:items-end gap-2">
              <a
                href="mailto:connect@proproductionfilms.in"
                className="font-secondary text-xl sm:text-2xl md:text-3xl font-semibold text-[#ffffff] hover:text-[#c4a57b] transition-colors underline-offset-8 hover:underline block break-all sm:break-normal"
              >
                connect@proproductionfilms.in
              </a>

              <div className="flex flex-wrap items-center gap-2.5 pt-0.5 text-xs sm:text-sm text-[#9c9183]">
                <span className="font-secondary text-[10px] uppercase tracking-wider text-[#9c9183] font-semibold">
                  PHONE:
                </span>
                <a
                  href="tel:+918884567124"
                  className="font-koulen tracking-wider text-[#ede5da] hover:text-[#c4a57b] transition-colors inline-flex items-center gap-1 font-medium"
                >
                  <span>+91 88845 67124</span>
                </a>
                <span className="text-[#5e5447]">•</span>
                <a
                  href="tel:+918884561212"
                  className="font-koulen tracking-wider text-[#ede5da] hover:text-[#c4a57b] transition-colors inline-flex items-center gap-1 font-medium"
                >
                  <span>+91 88845 61212</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-0.5 text-xs sm:text-sm text-[#9c9183]">
                <span className="font-secondary text-[10px] uppercase tracking-wider text-[#9c9183] font-semibold">
                  WHATSAPP:
                </span>
                <a
                  href="https://wa.me/918884567124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-koulen tracking-wider text-[#ede5da] hover:text-[#25D366] transition-colors inline-flex items-center gap-1 font-medium"
                >
                  <span>+91 88845 67124</span>
                  <span className="text-[10px]">↗</span>
                </a>
                <span className="text-[#5e5447]">•</span>
                <a
                  href="https://wa.me/918884561212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-koulen tracking-wider text-[#ede5da] hover:text-[#25D366] transition-colors inline-flex items-center gap-1 font-medium"
                >
                  <span>+91 88845 61212</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>

            {/* Links and Connect Columns */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              
              {/* Column 1: Links */}
              <div>
                <span className="font-koulen text-xs uppercase tracking-[0.25em] text-[#9c9183] block mb-4">
                  LINKS
                </span>
                <nav className="flex flex-col gap-2.5 font-secondary text-sm md:text-base font-medium">
                  <Link className="text-[#d8cec0] hover:text-white transition-colors w-fit" href="/">
                    Home
                  </Link>
                  <Link className="text-[#d8cec0] hover:text-white transition-colors w-fit" href="/films">
                    Films
                  </Link>
                  <Link className="text-[#d8cec0] hover:text-white transition-colors w-fit" href="/events">
                    Events
                  </Link>
                  <Link className="text-[#d8cec0] hover:text-white transition-colors w-fit" href="/about">
                    About
                  </Link>
                  <Link className="text-[#d8cec0] hover:text-white transition-colors w-fit" href="/contact">
                    Contact
                  </Link>
                </nav>
              </div>

              {/* Column 2: Connect */}
              <div className="flex flex-col justify-start overflow-visible">
                {/* Stamp Logo with Dynamic Apply Animation - shifted left */}
                <div className="relative select-none overflow-visible -translate-x-4 sm:-translate-x-6 lg:-translate-x-10 xl:-translate-x-14">
                  <div
                    key={stampKey}
                    onClick={handleRestamp}
                    title="Pro Production Films (Click to stamp again)"
                    className={`relative inline-block cursor-pointer group ${
                      isStamped ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                  >
                    {/* Expanding ink shockwave upon stamp impact */}
                    {isStamped && (
                      <div
                        className="absolute inset-0 rounded-full border-2 border-white/20 pointer-events-none"
                        style={{
                          animation: "inkShockwave 0.65s cubic-bezier(0.18, 0.89, 0.32, 1) forwards",
                        }}
                      />
                    )}

                    {/* Larger Stamp Image with slamming stamp animation */}
                    <div
                      className="w-48 sm:w-56 md:w-64 lg:w-[275px] xl:w-[310px] h-auto transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                      style={
                        isStamped
                          ? {
                              animation:
                                "stampSlam 0.58s cubic-bezier(0.18, 0.89, 0.32, 1.25) forwards",
                              transformOrigin: "center center",
                            }
                          : {
                              opacity: 0,
                              transform: "scale(2.6) rotate(-26deg) translateY(-40px)",
                              filter: "blur(5px)",
                            }
                      }
                    >
                      <img
                        src="/stamp-logo-ink.png"
                        alt="Pro Production Films Stamp Logo"
                        className="w-full h-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] opacity-95 transition-opacity"
                        style={{
                          filter: "invert(1) brightness(0.95) contrast(1.1)",
                          mixBlendMode: "screen",
                        }}
                      />
                    </div>

                    {/* Interactive hint on hover */}
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#9c9183] opacity-0 group-hover:opacity-80 transition-opacity whitespace-nowrap pointer-events-none">
                      [ Click to Stamp ]
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Bar: Divider, Copyright & Location */}
        <div className="w-full pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 font-secondary text-xs text-[#9c9183]">
          <p>© {new Date().getFullYear()} PRO PRODUCTION FILMS · All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link className="hover:text-white transition-colors text-[#d8cec0]" href="/contact">
              Bengaluru, Karnataka, India
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
