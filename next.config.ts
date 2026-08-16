import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.idshopcase.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.susercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.shopee.co.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.shopeemobile.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.tokopedia.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.tokopedia.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
