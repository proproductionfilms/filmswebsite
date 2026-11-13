"use client"

import * as React from "react"

export type SylvaLivingWorldSceneProps = {
  variant?: "living-green" | "sakura-sunset" | "maple-autumn" | "sequoia-mist"
  className?: string
  style?: React.CSSProperties
}

export function SylvaLivingWorldScene({
  variant = "living-green",
  className = "",
  style,
}: SylvaLivingWorldSceneProps) {
  return (
    <div
      className={`threeui-background sylva-living-world-scene ${className}`}
      role="img"
      aria-label="Sylva Living Green with ferns, flowers, pollen, and a butterfly"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#4a4d44",
        pointerEvents: "auto",
        overflow: "hidden",
        ...style,
      }}
    >
      <iframe
        title="Sylva Living Green"
        src="/sylva-scene/index.html"
        sandbox="allow-scripts"
        loading="eager"
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          background: "#4a4d44",
        }}
      />
    </div>
  )
}

export default SylvaLivingWorldScene
