import {useState} from "react";
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
    ChevronRight,
    FileText,
    Box,
    type LucideIcon,
} from "lucide-react";
import {Button} from "./ui/button";
import {cn} from "@/lib/utils";
import {makeTab, useOpenTab, useTabDrag, type PageId} from "@/lib/tabs";
import {getPosts, getProjects} from "@/lib/content";

/**
 * localStorage key used by the react-layman <LaymanProvider>. Bumped to v2
 * when the tab schema moved to `options.page`, so any stale layout from the
 * old name-based scheme is discarded on first load. The "Reset layout" button
 * wipes this key.
 */
export const LAYOUT_STORAGE_KEY = "portfolio-layout-v2";

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

/**
 * A single explorer row. It is both a react-dnd drag source (drag it into a
 * layman window) and a button (click to open/focus it as a tab). `leading`
 * holds the folder chevron (or a spacer so leaf rows stay aligned).
 */
function TreeRow({
    icon: Icon,
    label,
    indent = 0,
    leading,
    makeDragTab,
    onClick,
}: {
    icon: LucideIcon;
    label: string;
    indent?: number;
    leading?: React.ReactNode;
    makeDragTab: () => ReturnType<typeof makeTab>;
    onClick: () => void;
}) {
    const dragRef = useTabDrag(makeDragTab);
    return (
        <button
            ref={dragRef}
            onClick={onClick}
            title={label}
            style={{paddingLeft: `${8 + indent * 14}px`}}
            className={cn(
                "flex w-full cursor-grab items-center gap-1.5 py-1 pr-2 text-left text-sm transition-colors active:cursor-grabbing",
                "text-foreground hover:bg-muted hover:text-primary"
            )}
        >
            {leading ?? <span className="size-4 shrink-0" />}
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{label}</span>
        </button>
    );
}

/**
 * An expandable folder (Blog / Projects). Clicking toggles it open; dragging
 * the folder itself opens the corresponding list page. Each nested child opens
 * that specific post/project - by click or by drag.
 */
function SidebarFolder({
    label,
    page,
    icon,
    itemPage,
    itemIcon,
    items,
    onOpenChild,
}: {
    label: string;
    page: PageId;
    icon: LucideIcon;
    itemPage: PageId;
    itemIcon: LucideIcon;
    items: {id: string; title: string}[];
    onOpenChild: () => void;
}) {
    const [open, setOpen] = useState(false);
    const openTab = useOpenTab();

    return (
        <div>
            <TreeRow
                icon={icon}
                label={label}
                leading={
                    <ChevronRight
                        className={cn(
                            "size-4 shrink-0 transition-transform",
                            open && "rotate-90"
                        )}
                    />
                }
                makeDragTab={() => makeTab(label, page)}
                onClick={() => setOpen((o) => !o)}
            />
            {open &&
                (items.length === 0 ? (
                    <div
                        className="py-1 pr-2 text-sm text-muted-foreground"
                        style={{paddingLeft: `${8 + 1 * 14 + 22}px`}}
                    >
                        Nothing here yet.
                    </div>
                ) : (
                    items.map((item) => (
                        <TreeRow
                            key={item.id}
                            icon={itemIcon}
                            label={item.title}
                            indent={1}
                            makeDragTab={() =>
                                makeTab(item.title, itemPage, item.id)
                            }
                            onClick={() => {
                                openTab(
                                    makeTab(item.title, itemPage, item.id)
                                );
                                onOpenChild();
                            }}
                        />
                    ))
                ))}
        </div>
    );
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({isOpen, onClose}: SidebarProps) {
    const openTab = useOpenTab();
    const currentYear = new Date().getFullYear();
    const posts = getPosts();
    const projects = getProjects();

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

    const openLeaf = (label: string, page: PageId) => {
        openTab(makeTab(label, page));
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
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                )}
                onClick={onClose}
                aria-hidden="true"
            />

            {/*
             * Sidebar.
             * - Mobile: `fixed` overlay that slides in on top of the layout.
             * - Desktop (md+): a `relative` flex child that animates its width,
             *   sitting next to the workspace and pushing it over.
             */}
            <aside
                className={cn(
                    "fixed left-12 md:left-0 md:relative z-40 h-full shrink-0 bg-card border-r border-border transition-all duration-300 ease-out",
                    // mobile slide
                    isOpen ? "translate-x-0" : "-translate-x-[200%]",
                    // desktop: never translate, animate width instead
                    "md:translate-x-0 overflow-hidden",
                    isOpen ? "md:w-64" : "md:w-0"
                )}
            >
                <div className="flex h-full w-64 flex-col px-2 py-4">
                    {/* Reset layout */}
                    <div className="shrink-0 px-4 pb-2">
                        <Button
                            className="h-8 w-full justify-center rounded text-sm font-normal"
                            onClick={resetLayout}
                        >
                            <RotateCcw className="size-4" />
                            Reset layout
                        </Button>
                    </div>

                    {/* Explorer - click to open a tab, or drag into a window */}
                    <nav className="mt-2 flex min-h-0 flex-1 flex-col overflow-y-auto">
                        <TreeRow
                            icon={Home}
                            label="Home"
                            makeDragTab={() => makeTab("Home", "home")}
                            onClick={() => openLeaf("Home", "home")}
                        />
                        <SidebarFolder
                            label="Blog"
                            page="blog"
                            icon={Notebook}
                            itemPage="blog-post"
                            itemIcon={FileText}
                            items={posts}
                            onOpenChild={closeIfMobile}
                        />
                        <SidebarFolder
                            label="Projects"
                            page="projects"
                            icon={FolderGit2}
                            itemPage="project"
                            itemIcon={Box}
                            items={projects}
                            onOpenChild={closeIfMobile}
                        />
                        <TreeRow
                            icon={User}
                            label="About"
                            makeDragTab={() => makeTab("About", "about")}
                            onClick={() => openLeaf("About", "about")}
                        />
                        <TreeRow
                            icon={Mail}
                            label="Contact"
                            makeDragTab={() => makeTab("Contact", "contact")}
                            onClick={() => openLeaf("Contact", "contact")}
                        />
                    </nav>

                    {/* Footer content pinned to the bottom */}
                    <div className="shrink-0 space-y-4 pt-4">
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
