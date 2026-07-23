import {useNavigate} from "react-router-dom";
import {
    Home,
    Notebook,
    FolderGit2,
    User,
    Mail,
    RotateCcw,
    Github,
    Linkedin,
    Youtube,
    type LucideIcon,
} from "lucide-react";
import {Button} from "./ui/button";
import {cn} from "@/lib/utils";
import {openLayoutTab} from "@/lib/layout-bus";

/**
 * localStorage key used by the react-layman <LaymanProvider> in
 * `LayoutPage.tsx`. Kept in sync here so the sidebar's "Reset layout"
 * action can wipe the persisted layout.
 */
export const LAYOUT_STORAGE_KEY = "portfolio-layout";

interface NavItem {
    id: string;
    label: string;
    /** Tab name understood by `renderPane` in `LayoutPage.tsx`. */
    tab: string;
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    {id: "home", label: "Home", tab: "Home", icon: Home},
    {id: "blog", label: "Blog", tab: "Blog", icon: Notebook},
    {id: "projects", label: "Projects", tab: "Projects", icon: FolderGit2},
    {id: "about", label: "About", tab: "About", icon: User},
    {id: "contact", label: "Contact", tab: "Contact", icon: Mail},
];

const contactLinks = [
    {link: "https://github.com/Jeshwin", icon: <Github />, label: "GitHub"},
    {
        link: "https://www.youtube.com/@math-a-magic9820",
        icon: <Youtube />,
        label: "YouTube",
    },
    {
        link: "https://www.linkedin.com/in/jeshwinprince/",
        icon: <Linkedin />,
        label: "LinkedIn",
    },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({isOpen, onClose}: SidebarProps) {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    // Only auto-close the sidebar on mobile, where it's an overlay. On desktop
    // it sits beside the layout and should stay put when interacting with it.
    const closeIfMobile = () => {
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(max-width: 767px)").matches
        ) {
            onClose();
        }
    };

    const openTab = (name: string) => {
        // Make sure the layout page is the active route so the tab has
        // somewhere to open; the layout bus flushes the request once mounted.
        navigate("/");
        openLayoutTab(name);
        closeIfMobile();
    };

    const resetLayout = () => {
        try {
            localStorage.removeItem(LAYOUT_STORAGE_KEY);
        } catch {
            /* ignore storage errors */
        }
        window.location.reload();
    };

    return (
        <>
            {/* Mobile-only dimming overlay behind the sidebar */}
            <div
                className={cn(
                    "md:hidden fixed inset-0 z-30 bg-black/50 transition-opacity duration-300",
                    isOpen
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                )}
                onClick={onClose}
                aria-hidden="true"
            />

            {/*
             * Sidebar.
             * - Mobile: `fixed` overlay that slides in from the left on top
             *   of the layout (with the dimming overlay above).
             * - Desktop (md+): a `relative` flex child that animates its
             *   width, sitting next to the layout page and pushing it over.
             */}
            <aside
                className={cn(
                    "fixed md:relative z-40 h-full shrink-0 bg-card border-r border-border transition-all duration-300 ease-out",
                    // mobile slide
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    // desktop: never translate, animate width instead
                    "md:translate-x-0 overflow-hidden",
                    isOpen ? "md:w-72" : "md:w-0"
                )}
            >
                <div className="flex h-full w-72 flex-col p-4">
                    {/* Nav options (leave room for the floating hamburger).
                     * Each opens its page as a tab in the layout instead of
                     * navigating to a separate route. */}
                    <nav className="mt-16 flex flex-col space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => openTab(item.tab)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-base font-medium transition-colors",
                                        "text-foreground hover:bg-muted hover:text-sky-500"
                                    )}
                                >
                                    <Icon className="size-5" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Reset layout */}
                    <div className="mt-4 border-t border-border pt-4">
                        <Button
                            variant="mantle"
                            className="w-full justify-start rounded-lg"
                            onClick={resetLayout}
                        >
                            <RotateCcw className="size-5" />
                            Reset layout
                        </Button>
                    </div>

                    {/* Footer content pinned to the bottom */}
                    <div className="mt-auto space-y-4 pt-4">
                        <div className="flex justify-center space-x-3">
                            {contactLinks.map((contact) => (
                                <a
                                    key={contact.label}
                                    href={contact.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={contact.label}
                                >
                                    <Button
                                        size="icon"
                                        variant="mantle"
                                        className="size-10 rounded-full bg-mantle"
                                    >
                                        {contact.icon}
                                    </Button>
                                </a>
                            ))}
                        </div>
                        <div className="text-center text-xs text-muted-foreground">
                            © {currentYear} Jeshwin Prince.
                            <br />
                            All rights reserved.
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
