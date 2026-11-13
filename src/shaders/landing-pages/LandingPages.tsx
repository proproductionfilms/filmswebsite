"use client";

import React from "react";
import {
  LandingPageFrame,
  type LandingPageFrameProps,
  type LandingPageProps,
  applyBackgroundPresentation,
} from "./LandingPageFrame";
export { LandingPageFrame, applyBackgroundPresentation };
export type { LandingPageFrameProps, LandingPageProps };

import {
  type PageTypographyProps,
  splitTypographyProps,
  usePageTypography,
} from "./pageTypography";
import {
  BESTSELLERS_TYPOGRAPHY,
  COMPLETE_SHELF_TYPOGRAPHY,
  KAGE_TYPOGRAPHY,
  MENG_TO_SKETCHBOOK_TYPOGRAPHY,
  SYLVA_TYPOGRAPHY,
} from "./pageRecipes";

export function MengToSketchbookLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(MENG_TO_SKETCHBOOK_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Pro Production Films"
      sourceUrl="/landing-pages/meng-to-sketchbook.html"
    />
  );
}

export function KageLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Kage — Where stillness reveals the unseen"
      sourceUrl="/landing-pages/kage.html"
    />
  );
}

export function CompleteShelfLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(COMPLETE_SHELF_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Working Volumes — Seven Tools for Making"
      sourceUrl="/landing-pages/complete-shelf-v2.html"
    />
  );
}

export function BestsellersBookShowcase(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(BESTSELLERS_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Field Manuals — Tools for Thought"
      sourceUrl="/landing-pages/bestsellers-book-showcase.html"
    />
  );
}

export function SylvaHero(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(SYLVA_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Sylva — Into the living world"
      sourceUrl="/landing-pages/inner-green-3d.html"
    />
  );
}

export { AshenPress } from "../ashen-press/AshenPress";
export type { AshenPressProps } from "../ashen-press/AshenPress";

