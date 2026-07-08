/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.252.112.194', 'localhost:3000'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;