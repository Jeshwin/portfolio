/**
 * Publish (or unpublish) a blog post without touching git:
 *
 *   PUBLISH_TOKEN=... node scripts/publish.mjs path/to/my-post.md
 *   PUBLISH_TOKEN=... node scripts/publish.mjs path/to/my-post.md --delete
 *
 * The filename is the slug (/blog/my-post). Images in a sibling `my-post/`
 * folder are uploaded first, same layout as content/blog/. The post can live
 * anywhere on disk. The site rebuilds itself in a few minutes.
 *
 * SITE overrides the target (e.g. SITE=http://127.0.0.1:7676 for local testing).
 */
import fs from "node:fs";
import path from "node:path";
import {IMAGE_FILE, SLUG} from "../compute-js/src/admin-routes.js";

const SITE = process.env.SITE ?? "https://jeshwinprince.com";
const token = process.env.PUBLISH_TOKEN;
const [file, flag] = process.argv.slice(2);

if (!token) fail("Set PUBLISH_TOKEN (the value you stored in the Fastly secret store).");
if (!file || !file.endsWith(".md")) fail("Usage: node scripts/publish.mjs path/to/post.md [--delete]");

const slug = path.basename(file, ".md");
if (!SLUG.test(slug)) fail(`"${slug}" is not a valid slug: use lowercase letters, digits and single dashes.`);

async function send(method, url, body) {
    const response = await fetch(`${SITE}${url}`, {
        method,
        body,
        headers: {Authorization: `Bearer ${token}`},
    });
    const text = (await response.text()).trim();
    console.log(`${method} ${url} -> ${response.status} ${text}`);
    if (!response.ok && response.status !== 502) process.exit(1);
}

if (flag === "--delete") {
    await send("DELETE", `/admin/posts/${slug}`);
} else {
    if (!fs.existsSync(file)) fail(`No such file: ${file}`);
    const imageDir = path.join(path.dirname(file), slug);
    if (fs.existsSync(imageDir)) {
        for (const image of fs.readdirSync(imageDir)) {
            if (!IMAGE_FILE.test(image)) continue;
            await send("PUT", `/admin/posts/${slug}/images/${image}`, fs.readFileSync(path.join(imageDir, image)));
        }
    }
    // Last, because this is the request that triggers the rebuild.
    await send("PUT", `/admin/posts/${slug}`, fs.readFileSync(file));
}

function fail(message) {
    console.error(message);
    process.exit(1);
}
