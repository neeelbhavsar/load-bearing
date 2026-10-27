import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project cover art is pulled from Unsplash; the portrait is local.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // Vercel already sends HSTS. These cover the rest of the baseline. No full
  // script/style CSP: Next's inline bootstrap and motion's inline styles would
  // need nonces, which forces every page dynamic. frame-ancestors is the part
  // of CSP that matters for a static site anyway.
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
