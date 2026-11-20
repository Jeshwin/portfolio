// Pure helpers for the /admin publishing API. No `fastly:*` imports, so this
// file runs under plain Node for `npm test`.

// Same shape as the filenames in content/blog/ ("making-my-website").
export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Extensions match IMAGE_EXTENSIONS in vite-plugin-markdown.ts.
export const IMAGE_FILE = /^[A-Za-z0-9_-][A-Za-z0-9._-]*\.(?:png|jpe?g|gif|svg|webp|avif)$/i;

export const MAX_POST_BYTES = 1024 * 1024;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

/**
 * "/admin/posts/<slug>"                -> {slug, file: null}
 * "/admin/posts/<slug>/images/<file>"  -> {slug, file}
 * anything else                        -> null
 */
export function parseAdminPath(pathname) {
    const parts = pathname.split("/");
    // ["", "admin", "posts", slug, ("images", file)?]
    if (parts[1] !== "admin" || parts[2] !== "posts") return null;
    const slug = parts[3];
    if (!SLUG.test(slug ?? "")) return null;
    if (parts.length === 4) return {slug, file: null};
    if (parts.length === 6 && parts[4] === "images" && IMAGE_FILE.test(parts[5])) {
        return {slug, file: parts[5]};
    }
    return null;
}

export const postKey = (slug) => `post/${slug}.md`;
export const imageKey = (slug, file) => `img/${slug}/${file}`;
export const imagePrefix = (slug) => `img/${slug}/`;

/** Inverse of postKey/imageKey: the path under content/blog/, or null for any other key. */
export function contentPathForKey(key) {
    const [kind, ...rest] = key.split("/");
    if (kind === "post" && rest.length === 1 && rest[0].endsWith(".md")) {
        const slug = rest[0].slice(0, -3);
        if (SLUG.test(slug)) return `${slug}.md`;
    }
    if (kind === "img" && rest.length === 2 && SLUG.test(rest[0]) && IMAGE_FILE.test(rest[1])) {
        return `${rest[0]}/${rest[1]}`;
    }
    return null;
}

/**
 * Constant-time check of an `Authorization: Bearer <token>` header.
 * Fails closed: an empty or missing configured token never matches.
 */
export function isAuthorized(authorizationHeader, expectedToken) {
    if (!expectedToken) return false;
    const match = /^Bearer (.+)$/.exec(authorizationHeader ?? "");
    if (!match) return false;
    const a = new TextEncoder().encode(match[1]);
    const b = new TextEncoder().encode(expectedToken);
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
    return diff === 0;
}
