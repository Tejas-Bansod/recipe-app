import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enable SWC minification by default
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['images.unsplash.com'], // Add any image domains you'll be using
    unoptimized: true, // Required for static exports
  },
  // Enable static export for static site generation
  output: 'export',
  // Optional: Add a trailing slash for better compatibility with static hosting
  trailingSlash: true,
  // Optional: Configure build output directory (defaults to '.next')
  distDir: 'out',
  // Generate source maps for production (optional)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
