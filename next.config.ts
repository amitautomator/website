import type { NextConfig } from "next";

// The NextConfig object is correctly typed and structured
const nextConfig: NextConfig = {
  images: {
    domains: ["assets.aceternity.com"],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
