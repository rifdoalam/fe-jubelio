import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Mengizinkan semua domain
      },
      {
        protocol: "http",
        hostname: "**", // Jika perlu mendukung HTTP juga
      },
    ],
  },
};

export default nextConfig;
