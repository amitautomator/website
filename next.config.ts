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
