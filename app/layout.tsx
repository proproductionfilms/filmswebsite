import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@designcodeio/threeui/style.css";
import { GlobalNavigationBridge } from "@/components/GlobalNavigationBridge";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Pro Production Films",
  description: "Corporate Films / Industrial Documentaries / Institutional Stories",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ece7dc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Koulen&family=Work+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Lexend:wght@100..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#ece7dc] text-[#2b2721] font-sans antialiased m-0 p-0 overflow-x-hidden selection:bg-[#2b2721] selection:text-[#ece7dc]">
        <div className="paper-wash" aria-hidden="true" />
        <SmoothScroll />
        <GlobalNavigationBridge />
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
