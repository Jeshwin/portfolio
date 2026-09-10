# SEO refactor: real routes behind the VS Code workspace

Status: **implemented.** All 14 pages prerender; sitemap and robots are
generated at build time. This document records *why* the design is shaped the
way it is — several of those reasons are non-obvious constraints found by
reading `node_modules` rather than anything visible in our own source.

See "Implementation notes" at the end for the three places the built code
deliberately diverges from the plan below.

## Context

The site is currently a single URL. [src/routes.tsx](../src/routes.tsx) declares exactly one route (`/`), and [src/App.tsx](../src/App.tsx) wraps the entire workspace in `<ClientOnly>`, so `dist/index.html`'s `#root` is an empty div. Crawlers see zero content, one title, one description. Blog posts, projects, About and Contact cannot appear as search results because they have no URLs and no HTML.

The goal is to give every page a real, crawlable, pre-rendered URL **without losing the react-layman workspace experience**. The approach: crawlers and humans get different presentations of the *same* URL. Each route pre-renders a styled, readable document; after hydration the workspace takes over and the address bar becomes a mirror of the focused tab.

This is mostly *restoration*, not new construction. `vite-react-ssg@0.9.2` is still installed, `npm run build` is already `vite-react-ssg build`, `getAllPostIds()`/`getAllProjectIds()` in [src/lib/content.ts](../src/lib/content.ts) are dead code left over from the old `getStaticPaths`, and [deploy/nginx.conf](../deploy/nginx.conf) already has `try_files $uri $uri/ $uri.html /index.html` with a comment documenting that it expects `dist/blog/<slug>/index.html`. The multi-route setup exists in git at `3ddeff7`; it was deliberately collapsed to one route in `9185131` when the layman workspace took over.

### Decisions

1. **Deep link entry** — landing on `/blog/x` hydrates the workspace with that page as a focused tab, alongside the default layout.
2. **Default layout changes** — no more split view with About on the side. A single window with just the Home tab; Home already has buttons to reach Projects/Blog/Contact.
3. **URL sync** — the address bar mirrors the focused tab via `replaceState` (not `pushState`), so Back isn't spammed. Closing the focused tab moves the URL to the next focused tab, or `/`.
4. **Pre-render** — a styled, readable no-JS document, not a hidden crawler payload. Serves crawlers, no-JS users, and paints before hydration instead of a blank screen.

### Four verified constraints that shape the design

Each was checked against `node_modules`, not assumed:

- **`ClientOnly` renders `fallback` on the SSG pass *and* the first client render**, swapping to `children()` only in a `useEffect`. So the static document is hydration-identical by construction — no mismatch is structurally possible, provided the fallback is deterministic. (`vite-react-ssg.CoMLbIiW.mjs:13-23`)
- **Page components cannot render outside `LaymanProvider`.** `useTabDrag` → react-dnd's `useDrag` → `invariant(dragDropManager != null, 'Expected drag drop context')` (`react-dnd/dist/hooks/useDragDropManager.js:8`). The only `DndProvider` is inside `LaymanProvider`. `BlogList`/`ProjectList` reach it via [src/components/post-entry.tsx](../src/components/post-entry.tsx) and [src/components/project-card.tsx](../src/components/project-card.tsx), so rendering them statically *throws during SSG*. Solved with an `InteractiveContext` flag.
- **`initialLayout` is ignored when localStorage has state.** The provider does `useReducer(reducer, {layout: initialLayout, ...}, (e) => loadState(storageKey, e))` — a lazy initializer, so localStorage wins outright and later prop changes are dead (`react-layman.js:555`). Also, `loadState`/`saveState` are **not** exported from react-layman (only `serializeLayout`/`deserializeLayout` are). We therefore manage persistence ourselves.
- **A `path: "*"` route is never pre-rendered** — `paths.filter(i => !i.includes(":") && !i.includes("*"))` (`vite-react-ssg.Ctg3mDmH.mjs:827`). Needs an explicit `/404` route.

Also confirmed: `getStaticPaths` only fires on records whose own path has a dynamic segment (`:411`), `dirStyle: "nested"` produces `<path>/index.html` (`:1057`), and `onFinished(outDir)` runs after all pages are written (`:1098`).

---

## A. Route table

[src/routes.tsx](../src/routes.tsx) — nested children under `App` with `<Outlet/>`, matching the proven shape at `3ddeff7`. Drop `lazy`: `renderPane` statically imports all nine pages anyway, so a route-level chunk boundary buys nothing. Keep `entry` on the dynamic routes as a preload hint.

```tsx
export const routes: RouteRecord[] = [
    {
        path: "/", Component: App, entry: "src/App.tsx",
        children: [
            {index: true, element: <RouteShell page="home" />},
            {path: "about", element: <RouteShell page="about" />},
            {path: "contact", element: <RouteShell page="contact" />},
            {path: "blog", element: <RouteShell page="blog" />},
            {
                path: "blog/:postId", element: <RouteShell page="blog-post" />,
                entry: "src/pages/BlogPost.tsx",
                getStaticPaths: () => getAllPostIds().map((id) => `/blog/${id}`),
            },
            {path: "projects", element: <RouteShell page="projects" />},
            {
                path: "projects/:projectId", element: <RouteShell page="project" />,
                entry: "src/pages/Project.tsx",
                getStaticPaths: () => getAllProjectIds().map((id) => `/projects/${id}`),
            },
            // Explicit /404 — "*" alone is filtered out of prerendering.
            {path: "404", element: <RouteShell page="not-found" />},
            {path: "*", element: <RouteShell page="not-found" />},
        ],
    },
];
```

[vite.config.ts](../vite.config.ts) gains `ssgOptions: {dirStyle: "nested", onFinished}`. `dirStyle: "nested"` is what makes output match the nginx config already on disk — **no nginx change needed**, though add `error_page 404 /404/index.html;` for a correct status code.

## B. The dual-render shell

```
RouteShell (per route)
├─ <Seo page slug />                    ← always emitted into <head>
└─ ClientOnly
   ├─ fallback = <StaticDocument/>      ← baked into HTML; crawlers, no-JS, pre-hydration
   └─ children = () => <Workspace/>     ← the real app, one tick after mount
```

[src/App.tsx](../src/App.tsx) shrinks to `ThemeProvider` + `<Outlet/>`. New `src/components/route-shell.tsx` reads `useParams()`, resolves the slug, falls back to `not-found` when `PAGES[page].exists?.(slug) === false` (today `getPost`/`getProject` **throw** on a miss — this must be guarded before SSG hits an unknown slug), and renders the tree above.

New `src/components/static-document.tsx` renders a VS Code-ish chrome — a title bar showing the current path, a `<nav>` explorer, and `<main>` holding the actual page component — inside `<InteractiveContext.Provider value={false}>`. Its `StaticExplorer` emits real `<a href={pathFor(...)}>` links for Home, Blog, each post, Projects, each project, About and Contact. **This is what gives crawlers an internal link graph**; without it every pre-rendered page is an orphan reachable only via the sitemap.

**No CLS on the swap:** both roots are `h-screen w-screen overflow-hidden bg-background`, so the page box never resizes; the static rail is `w-64 md:block` matching the workspace sidebar's desktop default. Don't add a fade — it makes the swap more noticeable. The theme script already runs pre-paint, so the static doc paints in the right theme.

**Determinism (hydration-critical):** `toLocaleDateString(undefined, ...)` in [src/pages/BlogPost.tsx](../src/pages/BlogPost.tsx), [src/pages/Project.tsx](../src/pages/Project.tsx), post-entry and project-card uses the ambient locale — Node's ICU default and the browser's differ, producing a text mismatch. Replace all four with a shared `formatDate()` pinned to `"en-US"` / `timeZone: "UTC"`. (`new Date().getFullYear()` in sidebar.tsx is safe — it only renders inside `ClientOnly` children.)

**Resolving the dnd constraint:** new `src/lib/interactive.tsx` exports `InteractiveContext` (default `true`) and `useInteractive()`. Hook rules forbid conditionally calling `useDrag`, so branch at the *call site*: split `PostEntry` into `PostEntryTab` (uses `useOpenTab` + `useTabDrag`) and `PostEntryLink` (a plain `<a href>`), picked by `useInteractive()`. Both branches must emit identical markup and className strings, differing only in the outer element — keep them in one file sharing the inner content. Same for `project-card.tsx`, and for the buttons in `Home`/`NewTab`/`NotFound` via `<Button asChild><a href=…>` ([src/components/ui/button.tsx](../src/components/ui/button.tsx) already supports `asChild` through `@radix-ui/react-slot`). Bonus: this makes the static Home page link out to `/projects`, `/blog`, `/contact`.

## C. One `PageId ↔ URL` registry

New `src/lib/routes-map.tsx` collapses the three parallel switches in [src/lib/tabs.tsx](../src/lib/tabs.tsx) (`renderPane`, `tabIcon`, `tabIconColor`) into a single `PAGES: Record<PageId, PageDef>` where `PageDef = {label, icon, color, path, param, Component, exists?, labelFor?}`. Add `"not-found"` to `PageId`.

Exports `pathFor(page, slug)`, `pageForPath(pathname)`, `slugParamFor(page)`. Then `tabs.tsx` keeps `makeTab`/`tabKey`/`useOpenTab`/`useTabDrag`, turns the three switches into `PAGES[...]` lookups, and gains `tabForPath`, `pathForTab`, and the pure `focusOrInsertTab(layout, tab)`.

Consumers: `RouteShell`, `StaticDocument`/`StaticExplorer`, `Seo`, the URL-sync hook, [src/components/sidebar.tsx](../src/components/sidebar.tsx), and the sitemap script.

## D. URL sync hook

New `src/lib/use-url-sync.tsx`, called from a small `<UrlSync/>` rendered inside `LaymanProvider`.

`LaymanState` has no active-window concept, so resolve the URL-owning tab in this order: **(1)** `maximizedPath` if set; **(2)** never a floating window (auxiliary — simplest defensible rule, avoids `FloatingWindowAddress` branching); **(3)** the last-focused tiled `LaymanPath`, tracked in a ref updated on `selectTab`/`addTab`/`moveTab`/`removeTab`, if it still resolves; **(4)** the top-left window, matching the existing `"topleft"` heuristic. The owning tab is `window.tabs[window.selectedIndex ?? 0]`.

**Breaking the URL↔tab loop** is the key design point — it is one-directional after mount:

- *URL → tab* happens **exactly once**, synchronously, at `Workspace` mount (§E). There is no ongoing effect watching the URL, so there is nothing to feed back into.
- *tab → URL* uses raw `window.history.replaceState`, **not** `useNavigate`. React-router only re-matches on `popstate`, which `replaceState` does not fire — so the route stays matched to the entry URL, `RouteShell`'s props never change, `ClientOnly` never remounts `Workspace`. Pass `window.history.state` through unchanged (react-router stores `idx`/`key` there; clobbering it desyncs its stack). A `lastWritten` ref guards redundant writes.

Closing the focused tab works for free: `layout` changes → the active tab re-derives → the effect writes the new path, or `/` when `layout` becomes `undefined`.

Consequence to accept: since the route never re-matches, `<Seo>` also stops updating after hydration. That is correct — crawlers read the pre-rendered `<head>`, which is always right for the URL fetched. If you want the tab title to track (VS Code does), set `document.title` in the same effect; do **not** re-render `<Head>`.

## E. Entry reconciliation

[src/components/workspace.tsx](../src/components/workspace.tsx) takes `initialPage`/`initialSlug` and computes the layout **synchronously before the provider mounts**, in a `useState(() => …)` initializer (guaranteed once; `useMemo` is not):

```tsx
const [initialLayout] = useState<LaymanLayout>(() => {
    const base = readPersistedLayout() ?? defaultLayout();
    const target = tabForPath(pathFor(initialPage, initialSlug) ?? "/");
    return target ? focusOrInsertTab(base, target) : base;
});
```

`defaultLayout()` is decision #2: `{tabs: [makeTab("Home", "home")], selectedIndex: 0}` — a single window, no split. Bump `LAYOUT_STORAGE_KEY` to `"portfolio-layout-v3"` so returning visitors don't keep the old split layout, and move it from `sidebar.tsx` into `workspace.tsx`.

`readPersistedLayout()` reimplements `loadState` in ~10 lines (it isn't exported) using the exported `deserializeLayout`. It only runs client-side, since `Workspace` mounts only inside `ClientOnly` children.

`focusOrInsertTab` is pure: if a tab with the same `tabKey` exists, clone the tree with that window's `selectedIndex` pointing at it (deep-link to an open tab focuses, never duplicates); otherwise append to the top-left window and select it; if `layout` is `undefined`, return a single-tab window.

**Critical:** `LaymanProvider` would still call its own `loadState` and override our computed `initialLayout`. So pass **`storageKey={undefined}`** and handle persistence ourselves with a small `<PersistLayout/>` inside the provider that writes `{layout: serializeLayout(layout), floatingWindows: []}` on change (~20 lines, both serializers are exported). Since react-layman is our own library, a cleaner follow-up is adding a `resolveInitialState?: (persisted, fallback) => LaymanState` prop — but that couples this work to a library release, so do it separately.

## F. SEO surface + semantic HTML

New `src/components/seo.tsx` — a `<Seo page slug>` emitting via `<Head>`: title, description, `<link rel="canonical">`, OG (`type`, `site_name`, `title`, `description`, `url`, `image` — **absolute URL required**), `twitter:card=summary_large_image` + title/description/image, `noindex` on `not-found`, and JSON-LD:

| page | title | og:type | JSON-LD |
|---|---|---|---|
| `home` | `Jeshwin Prince — Software Engineer & CMU MCDS Student` | `profile` | `Person` + `WebSite` |
| `about` | `About — Jeshwin Prince` | `profile` | `Person` w/ `alumniOf`, `knowsAbout` |
| `contact` | `Contact — Jeshwin Prince` | `website` | `Person` w/ `email`, `sameAs` |
| `blog` | `Blog — Jeshwin Prince` | `website` | `Blog` w/ `blogPost[]` |
| `blog-post` | `${post.title} — Jeshwin Prince` | `article` | `BlogPosting`: `headline`, `datePublished`, `dateModified`, `author`, `keywords: post.tags`, `mainEntityOfPage` |
| `projects` | `Projects — Jeshwin Prince` | `website` | `CollectionPage` + `ItemList` |
| `project` | `${project.title} — Jeshwin Prince` | `article` | `SoftwareSourceCode` w/ `codeRepository`, `programmingLanguage` |

**Fix the discarded project description:** [src/lib/content.ts](../src/lib/content.ts) line ~85 overwrites `description` with `mod.html`, throwing away the frontmatter one-liner that is exactly what a meta description wants. Least-churn fix: keep `description` as the HTML body (so `Project.tsx` is untouched) and **add** `summary: fm.description`, with `summary?: string` added to `Project` in [src/lib/types.ts](../src/lib/types.ts). `Post` already carries both. Add a `metaDescription(html, max = 155)` helper that strips tags and truncates on a word boundary as fallback.

**Semantic headings.** There is currently not one `<h1>`–`<h6>` in `src/` — every title is a styled `div`. Tailwind's preflight resets headings to `font-size: inherit; font-weight: inherit; margin: 0`, so **swapping the tag while keeping the identical className is visually a no-op.** Apply across `src/pages/*.tsx`: `h1` for each page title (Home:19, About:117, Contact:16, BlogList:9, BlogPost:17, ProjectList:9, Project:26), `h2` for section titles (About's Education/Coursework/Experience/Skills; Project's Gallery/Description/Links), `h3` for CMU/SCU entries, plus `<article>`, `<section>`, and `<time dateTime={d.toISOString()}>` on dates. Add a visually-hidden `h1` to `NotFound`.

Two traps: `project-card.tsx` line ~27 nests a `div` inside what would become the `h2` — hoist "Last Updated" out as a sibling `<p>` first, since `div`-inside-`h2` is invalid. And **2 of 5 posts** (`making-my-website.md`, `bridgeide-my-experience.md`) use `# ` for section headings, which would collide with the page `h1` — fix in [vite-plugin-markdown.ts](../vite-plugin-markdown.ts) by demoting generated headings one level (`<h1>`→`<h2>`, …), which handles current and future content uniformly.

## G. sitemap.xml + robots.txt

New `scripts/seo-artifacts.mjs`, invoked from `ssgOptions.onFinished(outDir)` — better than a `package.json` `&&` chain because it can't be forgotten and receives `outDir`. It re-reads `content/**/*.md` directly with `gray-matter` (already a devDependency) rather than importing `content.ts`, which depends on `import.meta.glob` + the markdown plugin and won't load in plain Node. `lastmod` comes from `updated_at ?? created_at`. `/404` is excluded and disallowed. Don't put these in `public/` — generating them keeps `lastmod` honest.

## H. Task order

1. **Foundations** — `types.ts` (`summary`); `content.ts` (`summary: fm.description`); `utils.ts` (`formatDate`, `metaDescription`); replace all four `toLocaleDateString(undefined, …)` calls *(hydration-critical)*; `vite-plugin-markdown.ts` heading demotion.
2. **Registry** — new `routes-map.tsx`, new `interactive.tsx`; rewrite `tabs.tsx` around `PAGES` + add `tabForPath`/`pathForTab`/`focusOrInsertTab`.
3. **Static/interactive split** — `post-entry.tsx`, `project-card.tsx` (`*Link`/`*Tab`); `Home`/`NewTab`/`NotFound` buttons via `asChild`; semantic HTML pass across `src/pages/*.tsx`.
4. **Shell** — new `seo.tsx`, `static-document.tsx`, `route-shell.tsx`; rewrite `App.tsx` and `routes.tsx`; add `ssgOptions` to `vite.config.ts`.
5. **Workspace + URL sync** — `workspace.tsx` (props, `defaultLayout`, `readPersistedLayout`, drop `storageKey`, bump to v3); new `use-url-sync.tsx` (`resolveActiveTab`, `useSyncUrlToTab`, `PersistLayout`); `sidebar.tsx` rows become `<a href>` + `preventDefault` → `openTab`, so middle-click works.
6. **Build artifacts** — `scripts/seo-artifacts.mjs`; nginx `error_page 404 /404/index.html;`.

## Verification

**Crawlable output** — after `npm run build`:
```bash
ls dist/blog/ dist/projects/            # one directory per post/project
test -f dist/about/index.html && test -f dist/404/index.html
grep -c '<h1' dist/blog/making-my-website/index.html          # expect exactly 1
grep -o 'Node changed my whole paradigm' dist/blog/making-my-website/index.html
grep -o '<title>[^<]*' dist/blog/making-my-website/index.html # post title, not generic
grep -o 'rel="canonical" href="[^"]*"' dist/blog/making-my-website/index.html
grep -o 'BlogPosting' dist/blog/making-my-website/index.html
grep -o 'href="/projects/codenest"' dist/index.html           # internal link graph
cat dist/sitemap.xml dist/robots.txt
```
`#root` must no longer be `<div class="h-screen w-screen bg-background"></div>`.

**No-JS** — `npm run preview`, DevTools → Disable JavaScript, load `/blog/making-my-website`: styled document with a working left nav whose links navigate between pre-rendered pages. `curl -s localhost:4173/blog/making-my-website | wc -c` should be tens of KB, not ~2KB.

**URL sync** — with JS on, load `/blog/making-my-website`: workspace hydrates with that post focused *plus* the Home tab. Click Home → `/`. Click back → `/blog/making-my-website`. Press Back **once** → leaves the site, proving `replaceState` didn't spam history. Close the focused tab → URL moves to the next tab; close all → `/`. Reload on `/projects/codenest` with a persisted v3 layout → tab is focused, not duplicated.

**Hydration** — `npm run preview` on a production build, watch for `Hydration failed` / `Text content did not match`. Since `ClientOnly` renders the same fallback on both sides, any warning is a real determinism bug — most likely a date format. Note `TabData`'s constructor calls `crypto.randomUUID()`; verify `makeTab` never enters `StaticDocument`'s import closure.

**Rich results** — paste a built post's HTML into Google's Rich Results Test and the Facebook Sharing Debugger.

## Implementation notes

Three places where the built code diverges from the plan above, and one bug the
plan did not anticipate.

**1. Last-focused window is derived from the layout, not from `layoutDispatch`.**
§D proposed tracking focus in a ref updated on `selectTab`/`addTab`/`moveTab`/
`removeTab`. That requires intercepting dispatch, which does not work:
react-layman's own components destructure `layoutDispatch` out of context at
their own render time (`{ layoutDispatch: c, renderTab: l, mutable: u }` and
friends in `react-layman.js`), so a wrapper installed afterwards is never seen.
`useLastFocusedWindow` instead snapshots each window's selected `tabKey` and
diffs it across renders — the window whose selection changed is the one that
was just focused. This also catches selections layman makes internally, which a
dispatch wrapper would have missed either way.

**2. Deep-link reconciliation skips `/`.** `focusOrInsertTab` is not called when
the entry URL is `/`. Home is already in `defaultLayout()`, and forcing it to
the front on every plain visit would override a returning visitor's persisted
layout for no benefit.

**3. `document.title` keys on the tab label, not the tab object.** `TabData`
identity changes every render, so depending on the object would re-fire the
effect continuously.

**4. Unpublished drafts are filtered out of the content layer.** Not in the
plan, and found by the first build failing: an empty `content/blog/*.md` draft
parsed to an Invalid Date and crashed prerendering with `RangeError: Invalid
time value`. Under the old single-route setup a malformed file was harmless
because nothing rendered at build time; now one bad file fails the entire
build. `isPublishable()` in [content.ts](../src/lib/content.ts) skips files
lacking a title or a valid `created_at`, and `scripts/seo-artifacts.mjs`
applies the same filter so drafts never reach the sitemap.

### Verified against `node_modules` during implementation

All four constraints in §"Four verified constraints" held exactly as
documented, at the cited line numbers. Also confirmed while building:

- `onFinished` is typed `(dir: string) => Promise<void> | void` and is awaited
  after every page is written — the sitemap sees a complete `dist/`.
- `serializeLayout`/`deserializeLayout` are exported; `loadState`/`saveState`
  are not, as the plan said. `readPersistedLayout` reimplements the load half.
- `Children<T>` is a **tuple** of at least two elements, so `.map()` over
  `node.children` widens the type and breaks assignment. Hence `mapChildren` in
  [tabs.tsx](../src/lib/tabs.tsx).

### Verification results

Pure layout logic was exercised directly (deep-link to an open tab focuses
rather than duplicates; to a closed tab appends and selects; the input layout
is never mutated, which matters because it feeds a `useState` initializer; bad
slugs resolve to `not-found`; URLs round-trip including trailing slashes).

The date-pinning fix was confirmed to be load-bearing, not theoretical: for
`2023-08-03T21:58:54.645Z` the pinned formatter yields "Aug 3, 2023" under
every locale tested, while the old `toLocaleDateString(undefined, …)` yields
"Aug 4, 2023" in a Tokyo time zone — a guaranteed hydration mismatch for any
visitor east of UTC.

Build output: 14 pages at 17–28 KB each (was ~2 KB), exactly one `<h1>` per
page, `#root` server-rendered, per-page titles/canonicals/OG/JSON-LD, the full
internal link graph on every page, `noindex` on /404, and 13 sitemap URLs.

**Not yet verified** (needs a browser): live hydration warnings, and the
interactive URL-sync behaviour — Back leaving the site in one press, closing
the focused tab moving the URL, and reload-on-deep-link not duplicating a tab.
`vite preview` is not a substitute for nginx here: it serves the SPA fallback
for `/blog/<slug>` without a trailing slash, where nginx's `try_files
$uri $uri/` resolves the prerendered directory.

## Risks

- The `useInteractive` split is the highest-churn part and the easiest place to introduce a hydration mismatch; keep both branches in one file sharing inner content.
- `StaticExplorer` renders every post and project title on every page — fine at 5 posts / 4 projects, revisit past ~50.
- `beasties` critical-CSS inlining is on by default; with a much larger pre-rendered DOM it inlines more CSS. If page weight jumps, set `beastiesOptions: false` and measure.
