import {useEffect, useState} from "react";
import {Layman, LaymanLayout, LaymanProvider} from "react-layman";
import {makeTab, renderPane, renderTab} from "@/lib/tabs";
import ActivityBar from "./activity-bar";
import Sidebar, {LAYOUT_STORAGE_KEY} from "./sidebar";

function NullLayout() {
    return (
        <div className="grid h-full w-full place-content-center p-8 text-center text-muted-foreground">
            Nothing open. Pick a page from the sidebar, or drag one into place.
        </div>
    );
}

/**
 * The entire application: a react-layman workspace flanked by a VS Code-style
 * activity bar and a collapsible sidebar. There is no router anymore - every
 * "page" is opened as a tab and rendered by `renderPane`.
 *
 * The activity bar and sidebar are rendered as children of <LaymanProvider>,
 * so they share its context (dispatch) and its react-dnd provider - which is
 * what lets the sidebar add tabs directly and support drag-and-drop.
 */
export default function Workspace() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Open the sidebar by default on desktop; keep it closed on mobile so it
    // doesn't cover the workspace on first load.
    useEffect(() => {
        if (window.matchMedia("(min-width: 768px)").matches) {
            setSidebarOpen(true);
        }
    }, []);

    const initialLayout: LaymanLayout = {
        direction: "row",
        children: [
            {
                tabs: [makeTab("Home", "home")],
                selectedIndex: 0,
            },
            {
                direction: "column",
                children: [
                    {
                        tabs: [
                            makeTab("About", "about"),
                            makeTab("Contact", "contact"),
                        ],
                        selectedIndex: 0,
                    },
                    {
                        tabs: [
                            makeTab("Projects", "projects"),
                            makeTab("Blog", "blog"),
                        ],
                        selectedIndex: 1,
                    },
                ],
            },
        ],
    };

    return (
        <LaymanProvider
            initialLayout={initialLayout}
            renderPane={renderPane}
            renderTab={renderTab}
            renderNull={<NullLayout />}
            mutable
            toolbarButtons={["splitBottom", "splitRight", "maximize", "float"]}
            storageKey={LAYOUT_STORAGE_KEY}
            showTabs
            maxDepth={4}
        >
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
