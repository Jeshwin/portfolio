import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {remark} from "remark";
import remarkHtml from "remark-html";
import {defaultSchema} from "hast-util-sanitize";
import {visit} from "unist-util-visit";
import type {Plugin} from "vite";

/**
 * Transforms `.md` file imports into plain JS modules containing:
 *   { frontmatter: <parsed YAML>, html: <rendered HTML string> }
 *
 * All heavy lifting (gray-matter, remark, js-yaml) happens here, inside the
 * Vite process (Node) - at dev-server-request time and at build time. None
 * of these Node-oriented packages (which reach for `Buffer`, etc.) ever end
 * up in the code that ships to the browser.
 *
 * Usage: `import post from "/content/blog/foo.md"` gives you
 * `{ frontmatter, html }` directly - no runtime markdown parsing needed
 * on the client.
 */

const CONTENT_BLOG_DIR = path.resolve(process.cwd(), "content/blog");
const PUBLIC_BLOG_IMAGES_DIR = path.resolve(
    process.cwd(),
    "public/images/blog"
);

const IMAGE_EXTENSIONS = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".webp",
    ".avif",
]);

function isImageFile(name: string): boolean {
    return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());
}

/**
 * Copy `content/blog/<slug>/*` into `public/images/blog/<slug>/`.
 *
 * Images are authored next to the post that uses them, but `content/` sits
 * outside both `src/` and `public/`, so nothing ever imports these files and
 * Vite never emits them. `public/` is the one directory Vite serves verbatim
 * in dev *and* copies into `dist/` on build, so staging them there is what
 * makes dev and production serve byte-identical files from identical URLs.
 *
 * The copies are gitignored; the originals under `content/` stay the tracked
 * ones. Runs from `buildStart`, which fires in both dev and build.
 */
function syncContentImages(): void {
    if (!fs.existsSync(CONTENT_BLOG_DIR)) return;

    for (const entry of fs.readdirSync(CONTENT_BLOG_DIR, {
        withFileTypes: true,
    })) {
        // Skip dotfiles (.DS_Store) and the `.md` files themselves.
        if (!entry.isDirectory() || entry.name.startsWith(".")) continue;

        const sourceDir = path.join(CONTENT_BLOG_DIR, entry.name);
        const targetDir = path.join(PUBLIC_BLOG_IMAGES_DIR, entry.name);

        for (const file of fs.readdirSync(sourceDir)) {
            if (file.startsWith(".") || !isImageFile(file)) continue;

            const source = path.join(sourceDir, file);
            const target = path.join(targetDir, file);

            // Only copy when the target is missing or stale, so restarting the
            // dev server doesn't rewrite every image every time.
            const sourceStat = fs.statSync(source);
            if (fs.existsSync(target)) {
                const targetStat = fs.statSync(target);
                if (
                    targetStat.size === sourceStat.size &&
                    targetStat.mtimeMs >= sourceStat.mtimeMs
                ) {
                    continue;
                }
            }

            fs.mkdirSync(targetDir, {recursive: true});
            fs.copyFileSync(source, target);
        }
    }
}

/**
 * `remark-html` sanitizes by default, and the default schema allows neither
 * `figure` nor `figcaption` - it silently drops the wrapper and the caption
 * element, leaving a bare `<img>` followed by loose caption text. Extend a
 * clone of the default schema instead of disabling sanitization outright, so
 * everything else stays locked down.
 */
const sanitizeSchema = structuredClone(defaultSchema);
sanitizeSchema.tagNames?.push("figure", "figcaption");

const CAPTION_PATTERN = /\s*\{caption="([^"]*)"\}\s*$/;

/**
 * Turn `![Alt{caption="..."}](path.png)` into a real figure with a caption,
 * and resolve the image's relative path to a URL the browser can fetch.
 *
 * Both halves have to happen at the mdast level. By the time remark-html has
 * produced a string, the caption's quotes are already entity-encoded
 * (`&#x22;`) and the `<img>` is nested inside a `<p>`, so unpicking it with a
 * regex - the way `demoteHeadings` rewrites tag names below - would be far
 * more fragile than reading structured nodes.
 *
 * Relative sources resolve to `/images/blog/<slug>/<file>`, matching where
 * `syncContentImages` stages them. Absolute and remote URLs pass through, so
 * a post can still point at `/images/site/...`.
 */
function remarkFigureCaptions(slug: string) {
    return () => (tree: any) => {
        visit(tree, "paragraph", (node: any, index, parent: any) => {
            if (!parent || index === undefined) return;
            // Only a paragraph that is nothing but an image becomes a figure;
            // an inline image in a sentence is left alone.
            if (node.children.length !== 1) return;
            if (node.children[0].type !== "image") return;

            const image = node.children[0];

            if (
                image.url &&
                !image.url.startsWith("/") &&
                !/^[a-z]+:\/\//i.test(image.url)
            ) {
                image.url = `/images/blog/${slug}/${path.basename(image.url)}`;
            }

            const match = CAPTION_PATTERN.exec(image.alt ?? "");
            if (!match) return;

            const caption = match[1];
            // Keep the cleaned alt text: it still describes the image if the
            // caption is ever dropped.
            image.alt = (image.alt ?? "").replace(CAPTION_PATTERN, "").trim();

            parent.children[index] = {
                type: "figure",
                data: {hName: "figure"},
                children: [
                    image,
                    {
                        type: "caption",
                        data: {hName: "figcaption"},
                        children: [{type: "text", value: caption}],
                    },
                ],
            };
        });
    };
}

/**
 * Demote every generated heading one level: h1 -> h2, h2 -> h3, ... h5 -> h6
 * (h6 is already the floor and stays put).
 *
 * The page title is the document's only <h1>, rendered by the page component.
 * Some content files use `# ` for their own section headings, which would
 * produce a second <h1> and muddle the document outline for crawlers. Fixing
 * it here rather than in the markdown means new content can't reintroduce the
 * problem. Iterating 5 -> 1 avoids cascading a heading down more than once.
 */
function demoteHeadings(html: string): string {
    let out = html;
    for (let level = 5; level >= 1; level--) {
        out = out.replace(
            new RegExp(`<(/?)h${level}(\\s|>)`, "g"),
            `<$1h${level + 1}$2`
        );
    }
    return out;
}

export function markdown(): Plugin {
    return {
        name: "portfolio-markdown-loader",
        enforce: "pre",
        buildStart() {
            syncContentImages();
        },
        transform(_code, id) {
            if (!id.endsWith(".md")) return null;

            const raw = fs.readFileSync(id, "utf8");
            const {data, content} = matter(raw);
            // The image subdirectory is named after the post, so the `.md`
            // filename is the slug that locates its images.
            const slug = path.basename(id, ".md");
            const html = demoteHeadings(
                remark()
                    .use(remarkFigureCaptions(slug))
                    .use(remarkHtml, {sanitize: sanitizeSchema})
                    .processSync(content)
                    .toString()
            );

            return {
                code: `export default ${JSON.stringify({
                    frontmatter: data,
                    html,
                })};`,
                map: null,
            };
        },
        // In dev, re-parse and full-reload when a content file changes.
        handleHotUpdate({file, server}) {
            if (file.endsWith(".md")) {
                server.ws.send({type: "full-reload"});
                return [];
            }
            // Images are copied once at startup, so an edit or a newly added
            // image needs re-staging before the reload can pick it up.
            if (file.startsWith(CONTENT_BLOG_DIR) && isImageFile(file)) {
                syncContentImages();
                server.ws.send({type: "full-reload"});
                return [];
            }
        },
    };
}
