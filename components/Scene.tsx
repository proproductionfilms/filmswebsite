"use client";

import * as React from "react";

export function Scene() {
  return (
    <div className="relative w-full h-full min-h-[420px] pointer-events-auto bg-transparent flex items-center justify-center">
      <iframe
        src="/landing-pages/ashen-press.html?v=1792051200"
        title="Pro Production — Film Shelf"
        sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
        loading="eager"
        className="w-full h-full border-0 bg-transparent block"
        style={{
          width: "100%",
          height: "100%",
          border: 0,
          background: "transparent",
        }}
      />
    </div>
  );
}

export default Scene;
