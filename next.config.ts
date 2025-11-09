import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "monistically-exopathic-maida.ngrok-free.dev",
        pathname: "/api/images/**",
      },
    ],
  },
};

export default nextConfig;
