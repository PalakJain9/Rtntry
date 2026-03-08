/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      resourceQuery: /raw/, // *.md?raw
      type: 'asset/source',
      test: /\.md$/,
    });

    
    return config;
  },
  // Disable external version checks and telemetry
  experimental: {
    serverComponentsExternalPackages: ['next/font'],
  },
  // Configure allowed image domains for existing blog posts
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Disable image optimization for external images to avoid SSL issues
    unoptimized: true,
  },
};

module.exports = nextConfig;
