import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.2",
    "192.168.100.8",
    "10.5.0.2:3000",
  ],
  async redirects() {
    // The game is titled "Skamløs Pitch", so /skamlos-pitch is an easy guess —
    // alias it to the real route.
    return [
      {
        source: "/skamlos-pitch",
        destination: "/skamlos-rpg",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;