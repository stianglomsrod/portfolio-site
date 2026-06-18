import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.2",
    "192.168.100.8",
  ],
};

export default nextConfig;