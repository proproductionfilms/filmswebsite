"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/films", label: "Films" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function TopHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center gap-1.5 sm:gap-[11px] px-3 sm:px-[clamp(16px,4vw,48px)] pt-3 sm:pt-[18px] pb-4 sm:pb-[48px] pointer-events-none text-center select-none">
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(240,236,226,.96), rgba(240,236,226,.78) 55%, rgba(240,236,226,0))",
          backdropFilter: "blur(14px) saturate(.95)",
          WebkitBackdropFilter: "blur(14px) saturate(.95)",
          maskImage: "linear-gradient(180deg, #000 50%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, #000 50%, transparent)",
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      />

      <Link
        href="/"
        className="pointer-events-auto font-serif text-[21px] sm:text-[clamp(24px,2.4vw,30px)] tracking-[0.01em] leading-none whitespace-nowrap text-[#2b2721] hover:opacity-80 transition-opacity"
      >
        Pro Production Films
      </Link>

      <nav className="pointer-events-auto flex items-center justify-center gap-2.5 sm:gap-[clamp(14px,2vw,26px)] text-[13.5px] sm:text-[15px] font-newsreader font-light tracking-[0.04em] sm:tracking-[0.06em] max-w-full px-1">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`py-0.5 px-1 sm:px-0 transition-colors duration-200 ${
                isActive
                  ? "text-[#2b2721] font-normal"
                  : "text-[#2b2721]/58 hover:text-[#2b2721]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
