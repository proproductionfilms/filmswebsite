import "@designcodeio/threeui";

declare module "@designcodeio/threeui" {
  export interface PageTypographyProps {
    variant?: string;
    headingFont?: string;
    bodyFont?: string;
    headingWeight?: string;
    bodyWeight?: string;
    primaryColor?: string;
    headingSize?: number;
    bodySize?: number;
    headingLetterSpacing?: number;
  }

  export interface LandingPageProps {
    className?: string;
    style?: React.CSSProperties;
    srcDoc?: string;
    variant?: string;
  }

  export interface AshenPressProps {
    className?: string;
    style?: React.CSSProperties;
  }

  export const AshenPress: React.ComponentType<AshenPressProps>;

  export const SylvaHero: React.ComponentType<
    LandingPageProps & PageTypographyProps & { variant?: string }
  >;
}
