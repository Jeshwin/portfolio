// next.config.js
require('dotenv').config()

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  // experimental: {
  //   mdxRs: true,
  // }
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

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig)
