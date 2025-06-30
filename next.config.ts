import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  baseUrl: "src/",
  paths: {
    "@/components/*": ["components/*"],
    "@/lib/*": ["lib/*"],
  },
}

export default nextConfig
