/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
const debug = process.env.NODE_ENV !== 'production'
const name = 'https://matty255.github.io/next-blog/'

module.exports = {
  assetPrefix: !debug ? `/${name}/` : '',
  nextConfig,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}
