import {getPosts, getProjects} from "@/lib/content";
import {InteractiveContext} from "@/lib/interactive";
import {PAGES, labelFor, pathFor, type PageId} from "@/lib/routes-map";
import {cn} from "@/lib/utils";

interface NavItem {
    page: PageId;
    slug?: string;
    indent?: boolean;
}

/** One explorer row: an icon plus a real link. */
function NavLink({page, slug, indent, current}: NavItem & {current: boolean}) {
    const def = PAGES[page];
    const Icon = def.icon;
    const href = pathFor(page, slug);
    const label = labelFor(page, slug);

    return (
        <li>
            <a
                href={href}
                aria-current={current ? "page" : undefined}
                style={{paddingLeft: `${8 + (indent ? 14 : 0)}px`}}
                className={cn(
                    "flex w-full items-center gap-1.5 py-1 pr-2 text-left text-sm",
                    "text-foreground hover:bg-muted hover:text-primary",
                    current && "bg-muted text-primary"
                )}
            >
                <span className="size-4 shrink-0" />
                <Icon className="size-4 shrink-0" style={{color: def.color}} />
                <span className="truncate">{label}</span>
            </a>
        </li>
    );
}

/**
 * The static explorer. This is what gives crawlers an internal link graph:
 * every pre-rendered page links to every other one, so no page is an orphan
 * reachable only through the sitemap.
 */
function StaticExplorer({page, slug}: {page: PageId; slug?: string}) {
    const items: NavItem[] = [
        {page: "home"},
        {page: "blog"},
        ...getPosts().map(
            (post): NavItem => ({
                page: "blog-post",
                slug: post.id,
                indent: true,
            })
        ),
        {page: "projects"},
        ...getProjects().map(
            (project): NavItem => ({
                page: "project",
                slug: project.id,
                indent: true,
            })
        ),
        {page: "about"},
        {page: "contact"},
    ];

    return (
        <nav
            aria-label="Site"
            className="hidden w-64 shrink-0 overflow-y-auto border-r border-border bg-card py-4 md:block"
        >
            <ul>
                {items.map((item) => (
                    <NavLink
                        key={`${item.page}:${item.slug ?? ""}`}
                        {...item}
                        current={item.page === page && item.slug === slug}
                    />
                ))}
            </ul>
        </nav>
    );
}

/**
 * The pre-hydration document: a styled, readable page rather than a hidden
 * crawler payload. It serves three audiences at once - search engines, no-JS
 * visitors, and everyone else for the moment before the workspace mounts.
 *
 * Two things make the swap to <Workspace/> invisible:
 *  - the outer box matches the workspace's exactly (h-screen/w-screen, no
 *    scroll, same background), so nothing reflows;
 *  - the nav rail is `w-64 md:block`, matching the sidebar's desktop default.
 *
 * Everything here renders with InteractiveContext=false, which switches
 * drag-and-drop entries over to plain links - without that, react-dnd throws
 * during SSG. See src/lib/interactive.tsx.
 */
export default function StaticDocument({
    page,
    slug,
}: {
    page: PageId;
    slug?: string;
}) {
    const path = pathFor(page, slug) ?? "/";

    return (
        <InteractiveContext.Provider value={false}>
            <div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
                {/* Title bar, mirroring the workspace's VS Code chrome. */}
                <div className="flex h-9 shrink-0 items-center justify-center border-b border-border bg-card px-4 text-xs text-muted-foreground">
                    {path}
                </div>
                <div className="flex min-h-0 flex-1">
                    <StaticExplorer page={page} slug={slug} />
                    <main className="relative min-w-0 flex-1 overflow-hidden bg-mantle">
                        {PAGES[page].render(slug)}
                    </main>
                </div>
            </div>
        </InteractiveContext.Provider>
    );
}
