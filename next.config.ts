import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  outputFileTracingIncludes: {
    "/api/chat": ["./src/semantic/**/*.yml", "./data/oss-data-analyst.db"],
  },
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      // Include font files in the server bundle
      config.module.rules.push({
        test: /\.(ttf|ttc|otf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name][ext]",
        },
      });

      // Handle native .node files from resvg-js
      config.module.rules.push({
        test: /\.node$/,
        loader: "node-loader",
      });

      // Externalize native modules
      config.externals = config.externals || [];
      config.externals.push({
        "@resvg/resvg-js": "@resvg/resvg-js",
        "better-sqlite3": "commonjs better-sqlite3",
      });
    }
    return config;
  },
};

export default nextConfig;
