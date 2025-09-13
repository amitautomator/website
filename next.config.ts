// No issues found - this is a valid Next.js configuration file
// - Properly imports NextConfig type
// - Correctly configures image domains for next/image
// - TypeScript build errors are enabled (ignoreBuildErrors: false)
// - React strict mode is enabled for better development experience
// - SWC minification is enabled for better performance
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["assets.aceternity.com", "images.unsplash.com"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
