const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@designcodeio/threeui/style.css$": path.resolve(__dirname, "src/shaders/threeui.css"),
      "@designcodeio/threeui$": path.resolve(__dirname, "src/shaders/landing-pages/LandingPages.tsx"),
    };
    config.module.rules.push({
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;
