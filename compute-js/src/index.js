/// <reference types="@fastly/js-compute" />
import {KVStore} from "fastly:kv-store";
import {SecretStore} from "fastly:secret-store";
import {PublisherServer} from "@fastly/compute-js-static-publish";
import rc from "../static-publish.rc.js";
import {
    MAX_IMAGE_BYTES,
    MAX_POST_BYTES,
    imageKey,
    imagePrefix,
    isAuthorized,
    parseAdminPath,
    postKey,
} from "./admin-routes.js";

const publisherServer = PublisherServer.fromStaticPublishRc(rc);

// Names match [setup] in fastly.toml.
const POSTS_STORE = "portfolio-posts";
const SECRETS_STORE = "portfolio-secrets";
const REBUILD_URL =
    "https://api.github.com/repos/Jeshwin/portfolio/actions/workflows/fastly.yml/dispatches";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event.request)));

async function handleRequest(request) {
    const url = new URL(request.url);

    if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
        return handleAdmin(request, url.pathname);
    }

    const response = await publisherServer.serveRequest(request);
    if (response == null) return new Response("Not found", {status: 404});
    return withSiteHeaders(response, url.pathname);
}

/** The headers deploy/nginx.conf used to add. */
function withSiteHeaders(response, pathname) {
    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-Frame-Options", "SAMEORIGIN");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    if (pathname.startsWith("/assets/")) {
        // Content-hashed by Vite.
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else if (pathname.startsWith("/images/")) {
        headers.set("Cache-Control", "public, max-age=2592000");
    } else if (
        !headers.has("Cache-Control") &&
        (headers.get("Content-Type") ?? "").startsWith("text/html")
    ) {
        // HTML points at the hashed bundles, so it must revalidate every deploy.
        headers.set("Cache-Control", "no-cache");
    }

    return new Response(response.body, {status: response.status, headers});
}

// ==================== /admin publishing API ====================

async function handleAdmin(request, pathname) {
    const secrets = new SecretStore(SECRETS_STORE);
    const publishToken = (await secrets.get("PUBLISH_TOKEN"))?.plaintext();
    if (!isAuthorized(request.headers.get("Authorization"), publishToken)) {
        return text(401, "Unauthorized");
    }

    const route = parseAdminPath(pathname);
    if (route == null) return text(400, "Bad path: use /admin/posts/<slug> or /admin/posts/<slug>/images/<file>");

    const posts = new KVStore(POSTS_STORE);
    const {slug, file} = route;

    if (file != null) {
        if (request.method !== "PUT") return text(405, "Use PUT for images");
        const body = await readBody(request, MAX_IMAGE_BYTES);
        if (body == null) return text(413, "Image too large");
        await posts.put(imageKey(slug, file), body);
        return text(200, `Stored image ${slug}/${file}`);
    }

    if (request.method === "PUT") {
        const body = await readBody(request, MAX_POST_BYTES);
        if (body == null) return text(413, "Post too large");
        if (body.byteLength === 0) return text(400, "Empty post");
        await posts.put(postKey(slug), body);
        return triggerRebuild(secrets, `Stored post ${slug}`);
    }

    if (request.method === "DELETE") {
        await posts.delete(postKey(slug));
        let cursor;
        do {
            const page = await posts.list({prefix: imagePrefix(slug), cursor});
            for (const key of page.list) await posts.delete(key);
            cursor = page.cursor;
        } while (cursor);
        return triggerRebuild(secrets, `Deleted post ${slug}`);
    }

    return text(405, "Use PUT or DELETE");
}

/** Reads the whole body, or returns null if it is larger than `limit`. */
async function readBody(request, limit) {
    const declared = Number(request.headers.get("Content-Length"));
    if (declared > limit) return null;
    const body = await request.arrayBuffer();
    return body.byteLength > limit ? null : body;
}

/** Starts the fastly.yml workflow, which pulls the posts store and redeploys. */
async function triggerRebuild(secrets, done) {
    const githubToken = (await secrets.get("GITHUB_TOKEN"))?.plaintext();
    const response = githubToken
        ? await fetch(REBUILD_URL, {
              method: "POST",
              backend: "github",
              headers: {
                  Authorization: `Bearer ${githubToken}`,
                  Accept: "application/vnd.github+json",
                  "X-GitHub-Api-Version": "2022-11-28",
                  "User-Agent": "portfolio-compute",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ref: "production"}),
          })
        : null;

    if (response?.status === 204) return text(202, `${done}. Rebuild started - live in a few minutes.`);
    const detail = response ? `GitHub said ${response.status}: ${await response.text()}` : "no GITHUB_TOKEN set";
    // The KV write already happened, so the post isn't lost - it ships with the next deploy.
    return text(502, `${done}, but the rebuild did not start (${detail}). Run the "Deploy to Fastly" workflow by hand.`);
}

function text(status, body) {
    return new Response(body + "\n", {
        status,
        headers: {"Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store"},
    });
}
