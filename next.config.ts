import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "mo-lms.t3.storage.dev",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
