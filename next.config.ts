import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
} satisfies NextConfig & Record<string, unknown>;

export default nextConfig;
