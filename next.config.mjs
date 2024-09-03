/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-headlessdev.pantheonsite.io',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;