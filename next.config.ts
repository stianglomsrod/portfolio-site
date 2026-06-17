import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from the local network IP (e.g. phone / other
  // device on the LAN). Without this, Next.js blocks cross-origin dev resources
  // such as the client JS bundle and HMR, which prevents hydration and makes the
  // page appear empty with a non-working mode toggle.
  allowedDevOrigins: ["192.168.1.2"],
};

export default nextConfig;
