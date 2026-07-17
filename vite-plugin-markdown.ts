import fs from "node:fs";
import matter from "gray-matter";
import {remark} from "remark";
import remarkHtml from "remark-html";
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
export function markdown(): Plugin {
    return {
        name: "portfolio-markdown-loader",
        enforce: "pre",
        transform(_code, id) {
            if (!id.endsWith(".md")) return null;

            const raw = fs.readFileSync(id, "utf8");
            const {data, content} = matter(raw);
            const html = remark()
                .use(remarkHtml)
                .processSync(content)
                .toString();

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
        },
    };
}
