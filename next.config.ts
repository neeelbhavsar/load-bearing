import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project cover art is pulled from Unsplash; the portrait is local.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
