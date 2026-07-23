import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {ThemeProvider} from "next-themes";
import {Head} from "vite-react-ssg";
import {Menu} from "lucide-react";
import Sidebar from "@/components/sidebar";
import ThemeToggle from "@/components/theme-toggle";
import {Button} from "@/components/ui/button";

/**
 * Root layout for every route. Provides theming (next-themes) and the
 * persistent chrome.
 *
 * The old fixed Navbar/Footer have been replaced by a collapsible Sidebar
 * (see `components/sidebar.tsx`). On desktop the sidebar sits next to the
 * routed content and pushes it over; on mobile it slides in on top of the
 * content behind a dimming overlay. A floating hamburger toggles it from the
 * top-left corner, and the theme toggle floats in the top-right corner.
 *
 * Head management (title / meta) is handled per-page with vite-react-ssg's
 * built-in <Head> component - no provider needed at the root.
 */
export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Open the sidebar by default on desktop-sized viewports; keep it closed
    // on mobile so it doesn't cover the content on first load.
    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(min-width: 768px)").matches
        ) {
            setSidebarOpen(true);
        }
    }, []);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {/* Site-wide defaults - per-page <Head> in each route overrides
             * these when duplicate keys are present (title, description, etc.) */}
            <Head>
                <title>Jeshwin&apos;s Portfolio</title>
                <meta
                    name="description"
                    content="Jeshwin Prince's portfolio website"
                />
            </Head>

            <div className="flex h-screen w-screen overflow-hidden">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
                <main className="relative min-w-0 flex-1 overflow-hidden">
                    <Outlet />
                </main>
            </div>

            {/* Floating hamburger (top-left) */}
            <Button
                size="icon"
                variant="mantle"
                onClick={() => setSidebarOpen((open) => !open)}
                aria-label="Toggle sidebar"
                className="fixed left-4 top-4 z-50 size-10 rounded-full bg-mantle shadow"
            >
                <Menu />
            </Button>

            {/* Floating theme toggle (top-right) */}
            <div className="fixed right-4 top-4 z-50">
                <ThemeToggle />
            </div>
        </ThemeProvider>
    );
}
