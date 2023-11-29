/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
    PUBLIC_SERVER_BASE_URL: process.env.PUBLIC_SERVER_BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    PUBLIC_SERVER_API_TOKEN: process.env.PUBLIC_SERVER_API_TOKEN,
    GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
  },
};

module.exports = nextConfig;
