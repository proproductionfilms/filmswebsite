"use client";

import * as React from "react";
import { MengToSketchbookLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

const MengLandingPage = MengToSketchbookLandingPage as React.ComponentType<any>;

function Scene() {
  return (
    <div className="shader-frame">
      <MengLandingPage
        headingFont="instrument-serif"
        bodyFont="newsreader"
        headingWeight="400"
        bodyWeight="400"
        primaryColor="#2b2721"
        headingSize={30}
        bodySize={20}
        headingLetterSpacing={0.01}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="w-screen h-screen overflow-hidden m-0 p-0">
      <Scene />
    </main>
  );
}
