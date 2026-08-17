import { PREFIX } from '@/constants/const';
import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  compress: true,
  output: 'export',
  basePath: PREFIX,
  assetPrefix: PREFIX,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  sassOptions: {
    loadPaths: [path.join(__dirname, 'src/styles').replace(/\\/g, '/')],
    prependData: `@use 'abstracts' as *;`,
  },
};

export default nextConfig;
