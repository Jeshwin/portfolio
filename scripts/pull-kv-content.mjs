/**
 * CI step before `npm run build`: copies posts published through the Compute
 * /admin API out of the `portfolio-posts` KV Store into content/blog/, so the
 * normal build (content.ts, prerendering, sitemap) picks them up unchanged.
 *
 *   post/<slug>.md       -> content/blog/<slug>.md
 *   img/<slug>/<file>    -> content/blog/<slug>/<file>
 *
 * A KV post overwrites a git post with the same slug. Needs FASTLY_API_TOKEN
 * (read access to KV Stores).
 */
import fs from "node:fs";
import path from "node:path";
import {contentPathForKey} from "../compute-js/src/admin-routes.js";

const STORE_NAME = "portfolio-posts";
const API = "https://api.fastly.com/resources/stores/kv";
const BLOG_DIR = path.resolve(import.meta.dirname, "../content/blog");

const token = process.env.FASTLY_API_TOKEN;
if (!token) throw new Error("FASTLY_API_TOKEN is not set");

async function api(url) {
    const response = await fetch(url, {headers: {"Fastly-Key": token}});
    if (!response.ok) {
        throw new Error(`${response.status} from ${url}: ${await response.text()}`);
    }
    return response;
}

/** Follows `meta.next_cursor` through every page of a list endpoint. */
async function listAll(url) {
    const items = [];
    let cursor = "";
    do {
        const sep = url.includes("?") ? "&" : "?";
        const page = await (await api(`${url}${sep}limit=1000${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`)).json();
        items.push(...page.data);
        cursor = page.meta?.next_cursor ?? "";
    } while (cursor);
    return items;
}

const store = (await listAll(API)).find((s) => s.name === STORE_NAME);
if (!store) throw new Error(`KV Store "${STORE_NAME}" not found - has the Compute app been deployed?`);

let pulled = 0;
for (const key of await listAll(`${API}/${store.id}/keys`)) {
    const target = contentPathForKey(key);
    if (!target) {
        console.warn(`[pull-kv-content] skipping unexpected key: ${key}`);
        continue;
    }
    const body = Buffer.from(await (await api(`${API}/${store.id}/keys/${encodeURIComponent(key)}`)).arrayBuffer());
    const file = path.join(BLOG_DIR, target);
    fs.mkdirSync(path.dirname(file), {recursive: true});
    fs.writeFileSync(file, body);
    pulled++;
}
console.log(`[pull-kv-content] wrote ${pulled} file(s) from KV Store "${STORE_NAME}"`);
