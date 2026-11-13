"use client";

import * as React from "react";
import { TidyKineticRibbon } from "./TidyKineticRibbon";

export function TidyHero() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none m-0 p-0"
      style={{
        background:
          "radial-gradient(ellipse 95% 85% at 50% 50%, #dcdde1 0%, #d1d2d7 60%, #c5c6cc 100%)",
      }}
    >
      <TidyKineticRibbon />
    </div>
  );
}

export default TidyHero;
