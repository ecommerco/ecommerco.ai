import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to enable API routes
  // API routes require server-side rendering
  images: {
    unoptimized: true,
  },
  // Use webpack explicitly to avoid Turbopack issues with face-api.js
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Empty turbopack config to silence the warning
  turbopack: {},
};

export default nextConfig;
