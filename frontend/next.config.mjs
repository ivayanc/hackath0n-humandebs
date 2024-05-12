// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TypeScript errors during build
    // Warning: This allows the build to pass even with TypeScript errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
