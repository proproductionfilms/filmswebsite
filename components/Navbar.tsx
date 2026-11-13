"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "home", label: "HOME", href: "/" },
  { id: "films", label: "FILMS", href: "/films" },
  { id: "about", label: "ABOUT", href: "/about" },
  { id: "contact", label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const dockRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

  const [activeRect, setActiveRect] = React.useState<{ left: number; width: number } | null>(null);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  // Determine active index based on route
  const activeIdx = NAV_ITEMS.findIndex(
    (item) =>
      pathname === item.href ||
      (item.href !== "/" && pathname.startsWith(item.href))
  );

  const currentIdx = activeIdx >= 0 ? activeIdx : 0;

  // Measure active pill position
  const updateActiveRect = React.useCallback(() => {
    const el = itemRefs.current[currentIdx];
    const parent = dockRef.current;
    if (el && parent) {
      const parentRect = parent.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setActiveRect({
        left: elRect.left - parentRect.left,
        width: elRect.width,
      });
    }
  }, [currentIdx]);

  React.useEffect(() => {
    updateActiveRect();
    const timer = setTimeout(updateActiveRect, 50);
    window.addEventListener("resize", updateActiveRect);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateActiveRect);
    };
  }, [updateActiveRect, pathname]);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <nav
        ref={dockRef}
        onMouseLeave={() => setHoveredIdx(null)}
        className="pointer-events-auto relative flex items-center gap-[4px] p-[5px] rounded-[16px] border border-white/[0.12] shadow-[0_12px_32px_rgba(10,14,8,0.45),inset_0_1px_rgba(255,255,255,0.08)] isolate select-none"
        style={{
          height: "48px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 45%), rgba(32,38,30,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Smooth Sliding Active Pill Indicator */}
        {activeRect && (
          <div
            className="absolute pointer-events-none rounded-[11px] border border-white/[0.18] bg-[#1c2219] shadow-[0_10px_25px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)] z-0 -translate-y-[1.5px]"
            style={{
              left: `${activeRect.left}px`,
              top: "5px",
              width: `${activeRect.width}px`,
              height: "38px",
              transition: "left 280ms cubic-bezier(0.16, 1, 0.3, 1), width 280ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        )}

        {NAV_ITEMS.map((item, idx) => {
          const isActive = idx === currentIdx;
          const isHovered = hoveredIdx === idx;
          const isFirstItem = idx === 0;

          return (
            <Link
              key={item.id}
              href={item.href}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onClick={() => setHoveredIdx(null)}
              className={`relative inline-flex items-center justify-center px-4 rounded-[11px] text-[11.5px] font-medium tracking-[0.16em] font-sans no-underline whitespace-nowrap z-10 transition-all duration-200 ${
                isHovered
                  ? "text-white bg-[#1c2219]/90 border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.5)] -translate-y-1 scale-[1.03]"
                  : isActive
                  ? "text-white font-medium drop-shadow-sm"
                  : isFirstItem
                  ? "text-white/60 hover:text-white border border-white/[0.12] rounded-[11px] bg-transparent"
                  : "text-white/55 hover:text-white bg-transparent border border-transparent"
              }`}
              style={{
                height: "38px",
              }}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
