import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import {markdown} from "./vite-plugin-markdown";

export default defineConfig({
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
});
