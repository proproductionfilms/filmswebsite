"use client";

import * as React from "react";

/**
 * SmoothScroll provides butter-smooth inertia scrolling for discrete mouse wheel devices
 * while preserving native high-precision trackpad and touch physics untouched.
 */
export function SmoothScroll() {
  React.useEffect(() => {
    // Only run on client with window
    if (typeof window === "undefined") return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId: number | null = null;
    let isMoving = false;

    // Helper to find scrollable parent
    const isScrollable = (element: HTMLElement | null): boolean => {
      let current = element;
      while (current && current !== document.body && current !== document.documentElement) {
        const style = window.getComputedStyle(current);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          current.scrollHeight > current.clientHeight
        ) {
          return true;
        }
        current = current.parentElement;
      }
      return false;
    };

    const clamp = (val: number, min: number, max: number) => {
      return Math.max(min, Math.min(max, val));
    };

    const getMaxScroll = () => {
      return (
        document.documentElement.scrollHeight - window.innerHeight
      );
    };

    const updateScroll = () => {
      const maxScroll = getMaxScroll();
      targetY = clamp(targetY, 0, maxScroll);
      
      const diff = targetY - currentY;
      
      // If close enough, snap and stop loop
      if (Math.abs(diff) < 0.5) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isMoving = false;
        rafId = null;
        return;
      }

      // Smooth lerp (0.12 provides responsive yet silky feel)
      currentY += diff * 0.12;
      window.scrollTo(0, Math.round(currentY * 10) / 10);
      rafId = requestAnimationFrame(updateScroll);
    };

    const onWheel = (e: WheelEvent) => {
      // If modal or dialog is open, do not handle
      if (
        document.body.style.overflow === "hidden" ||
        document.documentElement.style.overflow === "hidden"
      ) {
        return;
      }

      // If scrolling inside an internal scrollable container, allow native scroll
      if (isScrollable(e.target as HTMLElement)) {
        return;
      }

      // Detect discrete notched mouse wheel:
      // deltaMode !== 0 (line/page mode) OR high magnitude deltas typical of mouse wheels
      const isDiscreteWheel =
        e.deltaMode !== 0 ||
        Math.abs(e.deltaY) >= 40 ||
        (Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 20);

      // Preserve native trackpad physics (small fractional deltas)
      if (!isDiscreteWheel) {
        // Sync our targets with native trackpad position
        targetY = window.scrollY;
        currentY = window.scrollY;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
          isMoving = false;
        }
        return;
      }

      // Handle mouse wheel with buttery smooth inertia
      e.preventDefault();

      if (!isMoving) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }

      // Multiply line scroll mode for consistent speed
      const multiplier = e.deltaMode === 1 ? 30 : 1;
      targetY += e.deltaY * multiplier;

      const maxScroll = getMaxScroll();
      targetY = clamp(targetY, 0, maxScroll);

      if (!isMoving) {
        isMoving = true;
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    // Synchronize target if user resizes, drags native scrollbar, or uses keyboard
    const onScroll = () => {
      if (!isMoving) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Space, PageUp, PageDown, End, Home, ArrowUp, ArrowDown
      if (["Space", "PageUp", "PageDown", "End", "Home", "ArrowUp", "ArrowDown"].includes(e.code)) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
          isMoving = false;
        }
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
