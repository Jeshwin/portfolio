import {useCallback, useContext, useEffect} from "react";
import {useDrag} from "react-dnd";
import {LaymanContext, LaymanLayout, LaymanPath, TabData} from "react-layman";
import {
    Home,
    User,
    Mail,
    FolderGit2,
    Notebook,
    FileText,
    Box,
    FilePlus2,
    FileQuestion,
    type LucideIcon,
} from "lucide-react";
import {Component as HomePage} from "@/pages/HomePage";
import {Component as AboutPage} from "@/pages/AboutPage";
import {Component as ContactPage} from "@/pages/ContactPage";
import {Component as ProjectListPage} from "@/pages/ProjectListPage";
import {Component as BlogListPage} from "@/pages/BlogListPage";
import {Component as BlogPostPage} from "@/pages/BlogPostPage";
import {Component as ProjectPage} from "@/pages/ProjectPage";
import {Component as NewTabPage} from "@/pages/NewTabPage";
import {Component as NotFoundPage} from "@/pages/NotFoundPage";

/**
 * Every "page" that used to be a route is now identified by a `page` id (and
 * an optional `slug` for the dynamic blog-post / project pages) stored in a
 * tab's `options`. This replaces react-router entirely - see `renderPane`.
 */
export type PageId =
    | "home"
    | "about"
    | "contact"
    | "projects"
    | "blog"
    | "blog-post"
    | "project"
    | "blank";

interface PageTabOptions {
    page?: PageId;
    slug?: string;
}

function tabOptions(tab: TabData): PageTabOptions {
    return tab.options as PageTabOptions;
}

/** Resolve a tab's page id, treating react-layman's own "blank" tab specially. */
function pageOf(tab: TabData): PageId | undefined {
    const {page} = tabOptions(tab);
    if (page) return page;
    if (tab.name === "blank") return "blank";
    return undefined;
}

/** Create a tab for a page, carrying its slug when relevant. */
export function makeTab(label: string, page: PageId, slug?: string): TabData {
    return new TabData(label, slug ? {page, slug} : {page});
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
    switch (pageOf(tab)) {
        case "home":
            return Home;
        case "about":
            return User;
        case "contact":
            return Mail;
        case "projects":
            return FolderGit2;
        case "blog":
            return Notebook;
        case "blog-post":
            return FileText;
        case "project":
            return Box;
        case "blank":
            return FilePlus2;
        default:
            return FileQuestion;
    }
}

/**
 * Maps a tab to the page it renders. This is the single place that decides
 * what shows inside a layman window - the former router's job. Dynamic pages
 * read their slug from the tab options.
 */
export function renderPane(tab: TabData): JSX.Element {
    const {slug} = tabOptions(tab);
    switch (pageOf(tab)) {
        case "home":
            return <HomePage />;
        case "about":
            return <AboutPage />;
        case "contact":
            return <ContactPage />;
        case "projects":
            return <ProjectListPage />;
        case "blog":
            return <BlogListPage />;
        case "blog-post":
            return <BlogPostPage postId={slug ?? ""} />;
        case "project":
            return <ProjectPage projectId={slug ?? ""} />;
        case "blank":
            return <NewTabPage />;
        default:
            return <NotFoundPage />;
    }
}

/** Tab title: icon + label. */
export function renderTab(tab: TabData): JSX.Element {
    const Icon = tabIcon(tab);
    return (
        <span className="flex items-center gap-1.5">
            <Icon className="size-4 shrink-0" />
            {tab.name}
        </span>
    );
}

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
