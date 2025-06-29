import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      resourceQuery: /raw/, // *.md?raw
      type: 'asset/source',
      test: /\.md$/,
    });
    return config;
  },
};

export default nextConfig;



// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
