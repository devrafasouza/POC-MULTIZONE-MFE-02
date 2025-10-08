/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/mfe-02', // publica tudo sob /login
  assetPrefix: '/mfe-02-static', // separa assets/_next desta zona
  images: { unoptimized: false },
};
module.exports = nextConfig;
