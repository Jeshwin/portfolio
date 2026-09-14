import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Generates dist/sitemap.xml and dist/robots.txt after the SSG build.
 *
 * Invoked from `ssgOptions.onFinished(outDir)` in vite.config.ts rather than
 * chained onto the build script, so it can't be forgotten and receives the
 * real output directory.
 *
 * Content is re-read straight from content/**\/*.md with gray-matter instead of
 * importing src/lib/content.ts - that module depends on `import.meta.glob` and
 * the markdown Vite plugin, neither of which exists in plain Node.
 *
 * These are generated rather than checked into public/ so `lastmod` stays
 * honest as posts change.
 */

const SITE_ORIGIN = "https://jeshwinprince.com";
const ROOT = path.resolve(import.meta.dirname, "..");

/** Static routes, with the change cadence each one realistically has. */
const STATIC_ROUTES = [
    {path: "/", changefreq: "monthly", priority: "1.0"},
    {path: "/blog", changefreq: "weekly", priority: "0.9"},
    {path: "/projects", changefreq: "weekly", priority: "0.9"},
    {path: "/about", changefreq: "monthly", priority: "0.7"},
    {path: "/contact", changefreq: "yearly", priority: "0.5"},
];

function readContent(dir, urlPrefix) {
    const absolute = path.join(ROOT, "content", dir);
    if (!fs.existsSync(absolute)) return [];

    return fs
        .readdirSync(absolute)
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
            const {data, content} = matter(
                fs.readFileSync(path.join(absolute, file), "utf8")
            );
            return {file, data, content};
        })
        // Skip unpublished drafts, matching isPublishable in src/lib/content.ts
        // - those pages are never prerendered, so they must not be advertised.
        // The body check matters as much as the header one: frontmatter is
        // written first, so a file can look complete and still have nothing
        // under it. Keep this in step with content.ts; the two can't share code
        // because that module needs import.meta.glob and the markdown plugin.
        .filter(
            ({data, content}) =>
                data?.title &&
                data?.created_at &&
                !Number.isNaN(Date.parse(data.created_at)) &&
                content?.trim()
        )
        .map(({file, data}) => {
            const slug = file.replace(/\.md$/, "");
            const lastmod = data.updated_at ?? data.created_at;
            const parsed = new Date(lastmod);
            return {
                path: `${urlPrefix}/${slug}`,
                lastmod: Number.isNaN(parsed.getTime())
                    ? undefined
                    : parsed.toISOString(),
                changefreq: "yearly",
                priority: "0.8",
            };
        })
        .sort((a, b) => a.path.localeCompare(b.path));
}

function urlEntry({path: urlPath, lastmod, changefreq, priority}) {
    const lines = [
        `        <loc>${SITE_ORIGIN}${urlPath === "/" ? "/" : urlPath}</loc>`,
    ];
    if (lastmod) lines.push(`        <lastmod>${lastmod}</lastmod>`);
    if (changefreq) lines.push(`        <changefreq>${changefreq}</changefreq>`);
    if (priority) lines.push(`        <priority>${priority}</priority>`);
    return `    <url>\n${lines.join("\n")}\n    </url>`;
}

export default async function seoArtifacts(outDir) {
    const dist = outDir ?? path.join(ROOT, "dist");

    // /404 is deliberately excluded - it's noindex and disallowed below.
    const routes = [
        ...STATIC_ROUTES,
        ...readContent("blog", "/blog"),
        ...readContent("projects", "/projects"),
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(urlEntry).join("\n")}
</urlset>
`;

    const robots = `User-agent: *
Allow: /
Disallow: /404

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

    fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
    fs.writeFileSync(path.join(dist, "robots.txt"), robots);

    console.log(
        `[seo-artifacts] wrote sitemap.xml (${routes.length} urls) and robots.txt`
    );
}
