import {useParams} from "react-router-dom";
import {ClientOnly} from "vite-react-ssg";
import Seo from "./seo";
import StaticDocument from "./static-document";
import Workspace from "./workspace";
import {PAGES, slugParamFor, type PageId} from "@/lib/routes-map";

/**
 * Every route renders through here. One URL, two presentations:
 *
 *   <Seo>            always emitted into <head>
 *   <ClientOnly>
 *     fallback  -> <StaticDocument>  baked into the HTML
 *     children  -> <Workspace>       the real app, one tick after mount
 *
 * `ClientOnly` renders `fallback` on the SSG pass *and* on the first client
 * render, swapping to `children()` inside an effect - so the static document
 * is hydration-identical by construction, as long as it renders
 * deterministically (hence the pinned date formatting in lib/utils.ts).
 */
export default function RouteShell({page}: {page: PageId}) {
    const params = useParams();
    const param = slugParamFor(page);
    const rawSlug = param ? params[param] : undefined;

    // `getPost`/`getProject` throw on an unknown id, which would abort the SSG
    // build and 500 a visitor who typed a bad URL. Resolve to the not-found
    // page here instead, before any page component runs.
    const missing = Boolean(
        param && (!rawSlug || PAGES[page].exists?.(rawSlug) === false)
    );
    const resolvedPage: PageId = missing ? "not-found" : page;
    const slug = missing ? undefined : rawSlug;

    return (
        <>
            <Seo page={resolvedPage} slug={slug} />
            <ClientOnly
                fallback={<StaticDocument page={resolvedPage} slug={slug} />}
            >
                {() => <Workspace initialPage={resolvedPage} initialSlug={slug} />}
            </ClientOnly>
        </>
    );
}
