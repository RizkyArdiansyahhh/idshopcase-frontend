import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "api.idshopcase.com",
        pathname: "/api/images/**",
      },
    ],
  },
};

export default nextConfig;
