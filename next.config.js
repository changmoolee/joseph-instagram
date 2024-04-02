/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGE_HOSTNAME,
      },
    ],
  },
};

module.exports = nextConfig;
