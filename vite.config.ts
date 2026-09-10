import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import {markdown} from "./vite-plugin-markdown";
import seoArtifacts from "./scripts/seo-artifacts.mjs";

export default defineConfig({
    // Prerender every route to its own directory.
    //
    // `dirStyle: "nested"` writes dist/blog/<slug>/index.html, which is exactly
    // the layout deploy/nginx.conf's `try_files $uri $uri/ $uri.html` already
    // expects - so no nginx change is needed beyond its 404 error page.
    //
    // `onFinished` runs after every page is written, which is when the sitemap
    // can be generated.
    ssgOptions: {
        dirStyle: "nested",
        onFinished: (outDir: string) => seoArtifacts(outDir),
    },
    // markdown() must run before @vitejs/plugin-react so .md files are fully
    // transformed into plain JS modules before anything else touches them.
    // With this in place, gray-matter/remark/js-yaml only ever execute inside
    // the Vite process (Node) - never in code shipped to the browser, so
    // there's no `Buffer is not defined` at runtime and no need for an
    // ssr.noExternal workaround for the markdown pipeline.
    plugins: [markdown(), react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    ssr: {
        // react-layman ships a bare `import "./index.css"`. During SSG the
        // route tree is imported in Node, which can't load `.css` files.
        // Bundling react-layman through Vite (instead of leaving it external)
        // lets Vite handle/strip the CSS import so prerendering works.
        noExternal: ["react-layman"],
    },
});
