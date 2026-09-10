import {useContext, useEffect, useRef} from "react";
import {
    LaymanContext,
    LaymanLayout,
    LaymanPath,
    TabData,
    deserializeLayout,
    serializeLayout,
} from "react-layman";
import {pathForTab, tabKey, topLeftWindow, windowAt} from "./tabs";

/**
 * Which tab owns the address bar.
 *
 * `LaymanState` has no notion of an "active window", so we resolve one:
 *   1. the maximized window, if any - it's the only thing on screen;
 *   2. never a floating window (they're auxiliary; this avoids branching on
 *      FloatingWindowAddress and is the simplest defensible rule);
 *   3. the last-focused tiled window, if that path still resolves;
 *   4. the top-left window, matching layman's own "topleft" heuristic.
 */
export function resolveActiveTab(
    layout: LaymanLayout,
    maximizedPath: LaymanPath | null,
    lastFocused: LaymanPath | null
): TabData | undefined {
    const candidates = [maximizedPath, lastFocused];
    for (const path of candidates) {
        if (!path) continue;
        const found = windowAt(layout, path);
        if (found) return found.tabs[found.selectedIndex ?? 0];
    }
    const fallback = topLeftWindow(layout);
    return fallback?.tabs[fallback.selectedIndex ?? 0];
}

const STORAGE_KEY = "portfolio-layout-v3";

/**
 * Persist the layout ourselves.
 *
 * We can't use <LaymanProvider storageKey=…>: the provider seeds its reducer
 * through a lazy initializer that reads localStorage, so a stored layout would
 * win outright over the layout we compute for the entry URL, and a deep link
 * would open the wrong page. Passing no storageKey disables both its load and
 * its save, leaving persistence to us.
 *
 * This reimplements the library's own (unexported) `loadState` on top of the
 * exported `deserializeLayout`. Only ever called client-side: <Workspace>
 * mounts inside <ClientOnly> children.
 */
export function readPersistedLayout(): LaymanLayout | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.layout) return null;
        return deserializeLayout(parsed.layout) ?? null;
    } catch {
        // Corrupt or unreadable state should never block startup - fall back
        // to the default layout instead.
        return null;
    }
}

export function writePersistedLayout(layout: LaymanLayout): void {
    try {
        window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                layout: serializeLayout(layout),
                floatingWindows: [],
            })
        );
    } catch {
        /* private mode, quota, etc. - persistence is best-effort */
    }
}

export {STORAGE_KEY as LAYOUT_STORAGE_KEY};

/**
 * Mirror the focused tab into the address bar.
 *
 * BREAKING THE URL <-> TAB LOOP is the whole design here, and it works because
 * the relationship is one-directional after mount:
 *
 *  - URL -> tab happens exactly once, synchronously, when <Workspace> computes
 *    its initial layout. Nothing watches the URL afterwards, so there is no
 *    feedback path.
 *  - tab -> URL uses raw `history.replaceState`, never `useNavigate`.
 *    React-router only re-matches routes on `popstate`, which `replaceState`
 *    does not fire - so the route stays matched to the entry URL, RouteShell's
 *    props never change, and <ClientOnly> never remounts the workspace.
 *
 * `replaceState` (not `pushState`) also keeps the Back button meaningful: it
 * leaves the site rather than unwinding a stack of tab switches.
 */
export function useSyncUrlToTab(lastFocused: LaymanPath | null) {
    const {layout, maximizedPath} = useContext(LaymanContext);
    const lastWritten = useRef<string | null>(null);

    // `maximizedPath` may be a FloatingWindowAddress, which we deliberately
    // ignore (rule 2 above) - only tiled windows own the URL.
    const tiledMaximized = Array.isArray(maximizedPath) ? maximizedPath : null;

    const activeTab = resolveActiveTab(layout, tiledMaximized, lastFocused);
    // An empty workspace, or a tab with no URL of its own, falls back to "/".
    const target = (activeTab ? pathForTab(activeTab) : undefined) ?? "/";
    const title = activeTab?.name;

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (lastWritten.current === target) return;
        if (window.location.pathname === target) {
            lastWritten.current = target;
            return;
        }
        // Pass the existing history state through untouched: react-router
        // stores its own `idx`/`key` there, and clobbering it desyncs its
        // internal history stack.
        window.history.replaceState(
            window.history.state,
            "",
            target + window.location.search + window.location.hash
        );
        lastWritten.current = target;
    }, [target]);

    // The route no longer re-matches, so <Seo> can't update the title after
    // hydration. Keep it current here, the way VS Code retitles its window.
    // Keyed on the label, not the tab object - that identity changes every
    // render and would re-fire this constantly.
    useEffect(() => {
        if (title) document.title = `${title} — Jeshwin Prince`;
    }, [title]);
}

/** Writes the layout to localStorage whenever it changes. */
export function PersistLayout() {
    const {layout} = useContext(LaymanContext);
    useEffect(() => {
        writePersistedLayout(layout);
    }, [layout]);
    return null;
}

/**
 * Tracks which tiled window the user last interacted with, by watching the
 * layout for the window whose selection actually changed.
 *
 * `LaymanState` has no active-window concept, and the obvious alternative -
 * wrapping `layoutDispatch` to observe `selectTab`/`addTab` - does not work:
 * layman's own components destructure `layoutDispatch` out of context at their
 * own render time, so a wrapper installed later is simply not seen. Selection
 * changes are already visible in `layout`, so we diff that instead. This also
 * catches selections the library makes internally, which a dispatch wrapper
 * would miss.
 */
function useLastFocusedWindow(layout: LaymanLayout): LaymanPath | null {
    const previous = useRef<Map<string, string> | null>(null);
    const lastFocused = useRef<LaymanPath | null>(null);

    // Snapshot every window's selected tab, keyed by its layman path.
    const snapshot = new Map<string, string>();
    const walk = (node: LaymanLayout, path: LaymanPath) => {
        if (!node) return;
        if ("tabs" in node) {
            const selected = node.tabs[node.selectedIndex ?? 0];
            if (selected) snapshot.set(path.join("."), tabKey(selected));
            return;
        }
        node.children.forEach((child, i) => walk(child, [...path, i]));
    };
    walk(layout, []);

    const before = previous.current;
    if (before) {
        for (const [key, value] of snapshot) {
            // A window that changed its selected tab is the one just focused.
            if (before.has(key) && before.get(key) !== value) {
                lastFocused.current = key === "" ? [] : key.split(".").map(Number);
                break;
            }
        }
    }
    previous.current = snapshot;

    return lastFocused.current;
}

/** Mounted inside <LaymanProvider> so it can read the layman context. */
export function UrlSync() {
    const {layout} = useContext(LaymanContext);
    const lastFocused = useLastFocusedWindow(layout);
    useSyncUrlToTab(lastFocused);
    return null;
}
