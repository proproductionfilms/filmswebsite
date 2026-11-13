"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export function GlobalNavigationBridge() {
  const router = useRouter();

  React.useEffect(() => {
    // Pre-warm / prefetch routes for instant transitions
    router.prefetch("/films");
    router.prefetch("/events");
    router.prefetch("/about");
    router.prefetch("/contact");
    router.prefetch("/");

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        typeof event.data === "object" &&
        (event.data.type === "threeui-navigate" || event.data.type === "navigate") &&
        typeof event.data.href === "string"
      ) {
        const dest = event.data.href;
        if (!dest || dest === "#" || dest.startsWith("#")) return;

        try {
          router.push(dest);
        } catch {
          window.location.href = dest;
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  return null;
}
