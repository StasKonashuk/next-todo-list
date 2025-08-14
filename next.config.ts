import type { NextConfig } from 'next';
import dotenv from 'dotenv-flow';

const dotenvConfig = dotenv.config({
  node_env: process.env.NEXT_PUBLIC_APP_ENV,
  silent: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: dotenvConfig.parsed,
};

export default nextConfig;
