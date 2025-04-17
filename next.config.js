/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGE_HOSTNAME_S3,
      },
      {
        protocol: "https",
        hostname: process.env.IMAGE_HOSTNAME_UNSPLASH,
      },
      {
        protocol: "https",
        hostname: process.env.IMAGE_HOSTNAME_GOOGLE,
      },
    ],
  },
};

module.exports = nextConfig;
