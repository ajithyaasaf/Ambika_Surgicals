import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/product',
        destination: '/products',
      },
      {
        source: '/product/:slug',
        destination: '/products/:slug',
      },
    ];
  },
};

export default nextConfig;