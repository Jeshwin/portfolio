import {useEffect, useState} from "react";
import {Layman, LaymanLayout, LaymanProvider} from "react-layman";
import {
    focusOrInsertTab,
    makeTab,
    makeTabFor,
    renderPane,
    renderTab,
} from "@/lib/tabs";
import {pathFor, type PageId} from "@/lib/routes-map";
import {
    PersistLayout,
    UrlSync,
    readPersistedLayout,
} from "@/lib/use-url-sync";
import ActivityBar from "./activity-bar";
import Sidebar from "./sidebar";

function NullLayout() {
    return (
        <div className="grid h-full w-full place-content-center p-8 text-center text-muted-foreground">
            Nothing open. Pick a page from the sidebar, or drag one into place.
        </div>
    );
}

/**
 * A single window holding just Home. The old default was a split view with
 * About alongside, which fought with deep links (a post opening as a third
 * pane) - and Home already links to Projects, Blog and Contact.
 */
function defaultLayout(): LaymanLayout {
    return {tabs: [makeTab("Home", "home")], selectedIndex: 0};
}

/**
 * The interactive application: a react-layman workspace flanked by a VS Code
 * style activity bar and a collapsible sidebar. Mounts only inside
 * <ClientOnly> children, replacing the pre-rendered static document.
 *
 * `initialPage`/`initialSlug` come from the URL the visitor landed on.
 */
export default function Workspace({
    initialPage,
    initialSlug,
}: {
    initialPage: PageId;
    initialSlug?: string;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Open the sidebar by default on desktop; keep it closed on mobile so it
    // doesn't cover the workspace on first load.
    useEffect(() => {
        if (window.matchMedia("(min-width: 768px)").matches) {
            setSidebarOpen(true);
        }
    }, []);

    /*
     * Reconcile the entry URL with any persisted layout, synchronously, before
     * <LaymanProvider> mounts. A `useState` initializer is guaranteed to run
     * exactly once - `useMemo` offers no such guarantee - and the provider
     * seeds its reducer from this value on its first render only.
     *
     * `focusOrInsertTab` focuses a matching tab if the page is already open,
     * so reloading a deep link never duplicates a tab.
     */
    const [initialLayout] = useState<LaymanLayout>(() => {
        const base = readPersistedLayout() ?? defaultLayout();
        const path = pathFor(initialPage, initialSlug);
        // "/" is the default landing page; there's nothing to reconcile, and
        // forcing Home to the front would fight with a persisted layout.
        if (!path || path === "/") return base;
        return focusOrInsertTab(base, makeTabFor(initialPage, initialSlug));
    });

    return (
        <LaymanProvider
            initialLayout={initialLayout}
            renderPane={renderPane}
            renderTab={renderTab}
            renderNull={<NullLayout />}
            mutable
            toolbarButtons={["splitBottom", "splitRight", "maximize", "float"]}
            /*
             * Deliberately no `storageKey`: the provider would load its own
             * persisted state through a lazy reducer initializer, overriding
             * the layout computed above and breaking deep links. <PersistLayout>
             * handles saving instead. See lib/use-url-sync.tsx.
             */
            showTabs
            maxDepth={4}
        >
            <UrlSync />
            <PersistLayout />
            <div className="flex h-screen w-screen overflow-hidden">
                <ActivityBar
                    sidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen((open) => !open)}
                />
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
                <main className="relative min-w-0 flex-1 overflow-hidden">
                    <div className="relative h-full w-full bg-mantle">
                        <Layman />
                    </div>
                </main>
            </div>
        </LaymanProvider>
    );
}
