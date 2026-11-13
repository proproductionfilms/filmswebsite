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
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center gap-[11px] px-[clamp(16px,4vw,48px)] pt-[18px] pb-[48px] pointer-events-none text-center select-none">
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(240,236,226,.94), rgba(240,236,226,.7) 48%, rgba(240,236,226,0))",
          backdropFilter: "blur(14px) saturate(.95)",
          WebkitBackdropFilter: "blur(14px) saturate(.95)",
          maskImage: "linear-gradient(180deg, #000 46%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, #000 46%, transparent)",
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      />

      <Link
        href="/"
        className="pointer-events-auto font-serif text-[clamp(24px,2.4vw,30px)] tracking-[0.01em] leading-none whitespace-nowrap text-[#2b2721] hover:opacity-80 transition-opacity"
      >
        Pro Production Films
      </Link>

      <nav className="pointer-events-auto flex items-center justify-center gap-[clamp(14px,2vw,26px)] text-[15px] font-newsreader font-light tracking-[0.06em]">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`transition-colors duration-200 ${
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
