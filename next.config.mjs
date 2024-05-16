/** @type {import('next').NextConfig} */

import path from 'path';

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@components"] = path.join(process.cwd(), "src/app/components");
    config.resolve.alias["@lib"] = path.join(process.cwd(), "lib");

    return config;
  },
};

export default nextConfig;
