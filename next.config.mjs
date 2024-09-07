/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dgalywyr863hv.cloudfront.net',
        pathname: '/**', // Allows all paths under this hostname; modify as needed
      },
    ],
  },
};

export default nextConfig;

