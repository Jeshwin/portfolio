import {useCallback, useContext, useEffect} from "react";
import {useDrag} from "react-dnd";
import {
    Children,
    LaymanContext,
    LaymanLayout,
    LaymanPath,
    LaymanWindow,
    TabData,
} from "react-layman";
import type {LucideIcon} from "lucide-react";
import {
    PAGES,
    labelFor,
    pageForPath,
    pathFor,
    type PageId,
} from "./routes-map";

export type {PageId};

/**
 * Tabs carry their page id (and slug, for dynamic pages) in `options`. All
 * per-page knowledge - icon, color, component, URL - lives in the PAGES
 * registry in routes-map.tsx; this module is only about tabs and layouts.
 */
interface PageTabOptions {
    page?: PageId;
    slug?: string;
}

function tabOptions(tab: TabData): PageTabOptions {
    return tab.options as PageTabOptions;
}

/** Resolve a tab's page id, treating react-layman's own "blank" tab specially. */
function pageOf(tab: TabData): PageId {
    const {page} = tabOptions(tab);
    if (page) return page;
    if (tab.name === "blank") return "blank";
    return "not-found";
}

/** Create a tab for a page, carrying its slug when relevant. */
export function makeTab(label: string, page: PageId, slug?: string): TabData {
    return new TabData(label, slug ? {page, slug} : {page});
}

/** Create a tab straight from a page id, using the registry for its label. */
export function makeTabFor(page: PageId, slug?: string): TabData {
    return makeTab(labelFor(page, slug), page, slug);
}

/**
 * Stable identity for a tab so we never open two tabs for the same page.
 * Dynamic pages are distinguished by their slug.
 */
export function tabKey(tab: TabData): string {
    const {page, slug} = tabOptions(tab);
    const id = page ?? tab.name;
    return slug ? `${id}:${slug}` : id;
}

/** Icon shown in the tab title (and reusable elsewhere), keyed off the page. */
export function tabIcon(tab: TabData): LucideIcon {
    return PAGES[pageOf(tab)].icon;
}

/** Icon color shown in the tab title, matching the sidebar's per-page colors. */
export function tabIconColor(tab: TabData): string | undefined {
    return PAGES[pageOf(tab)].color;
}

/**
 * Maps a tab to the page it renders - the former router's job. Dynamic pages
 * read their slug from the tab options.
 */
export function renderPane(tab: TabData): JSX.Element {
    const {slug} = tabOptions(tab);
    return PAGES[pageOf(tab)].render(slug);
}

/** Tab title: icon + label. */
export function renderTab(tab: TabData): JSX.Element {
    const Icon = tabIcon(tab);
    const color = tabIconColor(tab);
    return (
        <span className="flex items-center gap-1.5 min-w-0">
            <Icon className="size-4 shrink-0" style={{color}} />
            <span className="truncate">{tab.name}</span>
        </span>
    );
}

// ==================== Tab <-> URL ====================

/** The URL a tab should put in the address bar, if it has one. */
export function pathForTab(tab: TabData): string | undefined {
    const {slug} = tabOptions(tab);
    return pathFor(pageOf(tab), slug);
}

/** The tab a URL should open. */
export function tabForPath(pathname: string): TabData {
    const {page, slug} = pageForPath(pathname);
    return makeTabFor(page, slug);
}

// ==================== Layout helpers ====================

function findTab(
    node: LaymanLayout,
    key: string,
    path: LaymanPath = []
): {path: LaymanPath; tab: TabData} | null {
    if (!node) return null;
    if ("tabs" in node) {
        const tab = node.tabs.find((t) => tabKey(t) === key);
        return tab ? {path, tab} : null;
    }
    for (let i = 0; i < node.children.length; i++) {
        const found = findTab(node.children[i], key, [...path, i]);
        if (found) return found;
    }
    return null;
}

/**
 * `Children<T>` is a tuple of at least two elements, and `Array.map` widens it
 * back to a plain array - so every structural rewrite below goes through this
 * helper to keep the tuple type.
 */
function mapChildren(
    children: Children<LaymanLayout>,
    fn: (child: LaymanLayout, index: number) => LaymanLayout
): Children<LaymanLayout> {
    return children.map(fn) as Children<LaymanLayout>;
}

/** Point a window's `selectedIndex` at one of its tabs, by layman path. */
function selectTabAt(
    node: LaymanLayout,
    path: LaymanPath,
    index: number
): LaymanLayout {
    if (!node) return node;
    if ("tabs" in node) return {...node, selectedIndex: index};
    const [head, ...rest] = path;
    return {
        ...node,
        children: mapChildren(node.children, (child, i) =>
            i === head ? selectTabAt(child, rest, index) : child
        ),
    };
}

/** Append `tab` to the first (top-left) window and select it. */
function appendToTopLeft(node: LaymanLayout, tab: TabData): LaymanLayout {
    if (!node) return {tabs: [tab], selectedIndex: 0};
    if ("tabs" in node) {
        return {
            ...node,
            tabs: [...node.tabs, tab],
            selectedIndex: node.tabs.length,
        };
    }
    return {
        ...node,
        children: mapChildren(node.children, (child, i) =>
            i === 0 ? appendToTopLeft(child, tab) : child
        ),
    };
}

/**
 * Pure: return a layout in which `tab`'s page is open and focused.
 *
 * If a tab with the same key already exists, that window's `selectedIndex` is
 * pointed at it - so deep-linking to an already-open page focuses it and never
 * duplicates it. Otherwise the tab is appended to the top-left window. An
 * empty layout becomes a single window holding just this tab.
 */
export function focusOrInsertTab(
    layout: LaymanLayout,
    tab: TabData
): LaymanLayout {
    if (!layout) return {tabs: [tab], selectedIndex: 0};
    const existing = findTab(layout, tabKey(tab));
    if (existing) {
        const window = windowAt(layout, existing.path);
        const index =
            window?.tabs.findIndex((t) => tabKey(t) === tabKey(tab)) ?? 0;
        return selectTabAt(layout, existing.path, Math.max(index, 0));
    }
    return appendToTopLeft(layout, tab);
}

/** Resolve a layman path to the window it addresses, if it still exists. */
export function windowAt(
    node: LaymanLayout,
    path: LaymanPath
): LaymanWindow | null {
    let current: LaymanLayout = node;
    for (const index of path) {
        if (!current || "tabs" in current) return null;
        current = current.children[index];
    }
    if (!current || !("tabs" in current)) return null;
    return current;
}

/** The first (top-left) window in a layout, depth-first. */
export function topLeftWindow(node: LaymanLayout): LaymanWindow | null {
    if (!node) return null;
    if ("tabs" in node) return node;
    return topLeftWindow(node.children[0]);
}

/**
 * Returns an `openTab` function that focuses an existing tab for the same page
 * or, if none exists, adds a new one to the top-left window. Usable anywhere
 * inside the <LaymanProvider> (sidebar, list pages, etc.).
 */
export function useOpenTab() {
    const {layout, layoutDispatch} = useContext(LaymanContext);
    return useCallback(
        (tab: TabData) => {
            const existing = findTab(layout, tabKey(tab));
            if (existing) {
                layoutDispatch({
                    type: "selectTab",
                    path: existing.path,
                    tab: existing.tab,
                });
            } else {
                layoutDispatch({
                    type: "addTabWithHeuristic",
                    heuristic: "topleft",
                    tab,
                });
            }
        },
        [layout, layoutDispatch]
    );
}

/**
 * Makes an element a react-dnd drag source that drops a brand-new tab into
 * whichever layman window the user releases over. Mirrors react-layman's own
 * tab drag: an item of type "TAB" with no `path` becomes a new tab, and we
 * flip the provider's `globalDragging` flag so the drop zones light up.
 */
export function useTabDrag(makeDragTab: () => TabData) {
    const {setGlobalDragging} = useContext(LaymanContext);
    const [{isDragging}, dragRef] = useDrag(
        () => ({
            type: "TAB",
            item: () => ({tab: makeDragTab()}),
            collect: (monitor) => ({isDragging: monitor.isDragging()}),
        }),
        [makeDragTab]
    );
    useEffect(() => {
        setGlobalDragging(isDragging);
    }, [isDragging, setGlobalDragging]);
    return dragRef;
}
