import {useContext, useEffect} from "react";
import {
    Layman,
    LaymanContext,
    LaymanLayout,
    LaymanProvider,
    LaymanPath,
    TabData,
} from "react-layman";
import {ClientOnly, Head} from "vite-react-ssg";
import {registerLayoutOpener} from "@/lib/layout-bus";
import {
    Home,
    User,
    Mail,
    FolderGit2,
    Notebook,
    Settings,
    FilePlus2,
    FileQuestion,
    type LucideIcon,
} from "lucide-react";
import {Component as HomePage} from "@/pages/HomePage";
import {Component as AboutPage} from "@/pages/AboutPage";
import {Component as ContactPage} from "@/pages/ContactPage";
import {Component as ProjectListPage} from "@/pages/ProjectListPage";
import {Component as BlogListPage} from "@/pages/BlogListPage";
import {Component as NewTabPage} from "@/pages/NewTabPage";
import {Component as NotFoundPage} from "@/pages/NotFoundPage";
import {LAYOUT_STORAGE_KEY} from "@/components/sidebar";

function NullLayout() {
    return <div>Hai :3</div>;
}

/**
 * Maps a tab name to a lucide icon. Mirrors the `renderPane` switch so every
 * tab shows an icon matching the page it renders. Unknown tab names get a
 * generic "question" icon, matching the `NotFoundPage` fallback.
 */
function tabIcon(name: string): LucideIcon {
    switch (name) {
        case "Home":
            return Home;
        case "About":
            return User;
        case "Contact":
            return Mail;
        case "Projects":
            return FolderGit2;
        case "Blog":
            return Notebook;
        case "Settings":
            return Settings;
        case "blank":
            return FilePlus2;
        default:
            return FileQuestion;
    }
}

/**
 * Maps a tab to one of the pages in `src/pages`, mirroring the path -> page
 * mapping declared in `routes.tsx`. The `"blank"` case handles tabs created
 * via react-layman's own "new tab" toolbar button. Any other tab whose name
 * doesn't match a known page (e.g. "Settings" below) falls through to the
 * `NotFoundPage`, just like an unmatched path does for the `"*"` route.
 */
function renderPane(tab: TabData): JSX.Element {
    switch (tab.name) {
        case "Home":
            return <HomePage />;
        case "About":
            return <AboutPage />;
        case "Contact":
            return <ContactPage />;
        case "Projects":
            return <ProjectListPage />;
        case "Blog":
            return <BlogListPage />;
        case "blank":
            return <NewTabPage />;
        default:
            return <NotFoundPage />;
    }
}

/**
 * Finds an existing tab by name anywhere in the layout tree, returning its
 * path and TabData so it can be focused instead of duplicated.
 */
function findTabByName(
    node: LaymanLayout,
    name: string,
    path: LaymanPath = []
): {path: LaymanPath; tab: TabData} | null {
    if (!node) return null;
    if ("tabs" in node) {
        const tab = node.tabs.find((t) => t.name === name);
        return tab ? {path, tab} : null;
    }
    for (let i = 0; i < node.children.length; i++) {
        const found = findTabByName(node.children[i], name, [...path, i]);
        if (found) return found;
    }
    return null;
}

/**
 * Lives inside <LaymanProvider> so it can access the layman dispatch, and
 * registers an "open tab" function on the layout bus. This is how the global
 * sidebar opens pages as tabs. If a tab with the requested name already
 * exists it is focused; otherwise a new tab is added to the top-left window.
 */
function LayoutOpenerBridge() {
    const {layout, layoutDispatch} = useContext(LaymanContext);

    useEffect(() => {
        registerLayoutOpener((name: string) => {
            const existing = findTabByName(layout, name);
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
                    tab: new TabData(name),
                });
            }
        });
        return () => registerLayoutOpener(null);
    }, [layout, layoutDispatch]);

    return null;
}

export function Component() {
    const initialLayout: LaymanLayout = {
        direction: "row",
        children: [
            {
                tabs: [new TabData("Home", {icon: "home-icon"})],
                selectedIndex: 0,
            },
            {
                direction: "column",
                children: [
                    {
                        tabs: [
                            new TabData("About", {icon: "about-icon"}),
                            new TabData("Contact", {icon: "contact-icon"}),
                        ],
                        selectedIndex: 0,
                    },
                    {
                        tabs: [
                            new TabData("Projects", {icon: "projects-icon"}),
                            new TabData("Blog", {icon: "blog-icon"}),
                        ],
                        selectedIndex: 1,
                    },
                ],
            },
        ],
    };
    const renderTab = (tab: TabData) => {
        const Icon = tabIcon(tab.name);
        return (
            <span className="flex items-center gap-1.5">
                <Icon className="size-4 shrink-0" />
                {tab.name}
            </span>
        );
    };

    const mutable = true;
    const showTabs = true;
    const maxDepth = 4;

    const storageKey = LAYOUT_STORAGE_KEY;
    return (
        <div className="w-full h-full">
            <Head>
                <title>Jeshwin&apos;s Portfolio</title>
            </Head>
            {/*
             * react-layman relies on browser-only APIs (getComputedStyle,
             * drag/drop, etc.) and cannot be server-rendered, so we render it
             * client-side only. During SSG/first paint we show a lightweight
             * fallback.
             */}
            <ClientOnly
                fallback={
                    <div className="w-full h-full grid place-content-center bg-[#0F0F0F]" />
                }
            >
                {() => (
                    <LaymanProvider
                        initialLayout={initialLayout}
                        renderPane={renderPane}
                        renderTab={renderTab}
                        renderNull={<NullLayout />}
                        mutable={mutable}
                        toolbarButtons={[
                            "splitBottom",
                            "splitRight",
                            "maximize",
                            "float",
                        ]}
                        storageKey={storageKey}
                        showTabs={showTabs}
                        maxDepth={maxDepth}
                    >
                        <LayoutOpenerBridge />
                        <div className="relative w-full h-full bg-[#0F0F0F]">
                            <Layman />
                        </div>
                    </LaymanProvider>
                )}
            </ClientOnly>
        </div>
    );
}
