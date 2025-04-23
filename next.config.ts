import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [new URL("https://app-product-image-bucket.s3.amazonaws.com/")],
  },
}

const nextConfig: NextConfig = {
  /* config options here */
  distDir: "build",
};

export default nextConfig;
