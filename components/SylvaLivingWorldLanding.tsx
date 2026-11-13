"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

interface SylvaLivingWorldLandingProps {
  onNavigate?: (path: string) => void
}

export default function SylvaLivingWorldLanding({ onNavigate }: SylvaLivingWorldLandingProps) {
  const router = useRouter()
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === "object" && event.data.type === "NAVIGATE") {
        const path = event.data.path
        if (onNavigate) {
          onNavigate(path)
        } else {
          router.push(path)
        }
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [router, onNavigate])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 10,
        overflow: "hidden",
        backgroundColor: "#383b34",
      }}
    >
      <iframe
        ref={iframeRef}
        title="Pro Production Films — Step into the living world"
        src="/sylva/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
          margin: 0,
          padding: 0,
        }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        loading="eager"
      />
    </div>
  )
}
