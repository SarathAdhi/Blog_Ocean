/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
};

module.exports = nextConfig;
