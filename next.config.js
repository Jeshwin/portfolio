// next.config.js
require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ]
  }
}

module.exports = nextConfig
