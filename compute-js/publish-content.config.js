/*
 * Publish-time and server settings. Re-read on every `npm run fastly:publish`,
 * no Wasm redeploy needed. Mirrors what deploy/nginx.conf did on EC2.
 */

/** @type {import('@fastly/compute-js-static-publish').PublishContentConfig} */
const config = {
  rootDir: "../dist",

  server: {
    // Vite content-hashes everything in /assets/, so it gets a 1-year TTL.
    staticItems: ["/assets/"],
    allowedEncodings: ["br", "gzip"],
    // Every route is prerendered (dist/blog/<slug>/index.html), so this is a
    // real 404 page served with a 404 status - not an SPA fallback.
    spaFile: false,
    notFoundPageFile: "/404/index.html",
    autoExt: [".html"],
    autoIndex: ["index.html"],
  },
};

export default config;
