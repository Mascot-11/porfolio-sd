import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enable static export
  images: {
    unoptimized: true, // Disable image optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.credly.com",
      },
    ],
  },
};

export default nextConfig;
