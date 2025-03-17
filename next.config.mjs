/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  eslint: {
    // This will allow the build to complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
