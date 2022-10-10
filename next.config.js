/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
const debug = process.env.NODE_ENV !== 'production'
const name = 'https://github.com/matty255/next-blog'

module.exports = {
  assetPrefix: !debug ? `/${name}/` : '',
  nextConfig,
  images: {
    unoptimized: true,
  },
}
