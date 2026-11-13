"use client";

import * as React from "react";
import TopHeader from "@/components/TopHeader";
import ContactWithGlobe from "@/components/ui/contact-with-globe";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-transparent">
      <TopHeader />
      <div className="relative z-10 w-full pt-[115px] sm:pt-[125px] md:pt-[135px] pb-12 sm:pb-16 flex-1 flex items-center justify-center">
        <ContactWithGlobe />
      </div>
      <Footer />
    </main>
  );
}
