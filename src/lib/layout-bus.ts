/**
 * Tiny event bus that lets the globally-mounted <Sidebar> (rendered in
 * `App.tsx`) open pages as tabs inside the react-layman layout that lives in
 * `LayoutPage.tsx`.
 *
 * The sidebar can't call react-layman's dispatch directly because it sits
 * outside the <LaymanProvider>. Instead, `LayoutPage` registers an "opener"
 * function here once its provider is mounted, and the sidebar calls
 * `openLayoutTab(name)`. If the layout isn't mounted yet (e.g. the user is on
 * a non-layout route), the request is queued and flushed as soon as the
 * layout registers its opener.
 */
export type LayoutTabName = string;

type Opener = (name: LayoutTabName) => void;

let opener: Opener | null = null;
let pending: LayoutTabName[] = [];

/** Called by LayoutPage to (de)register its tab opener. */
export function registerLayoutOpener(fn: Opener | null): void {
    opener = fn;
    if (fn && pending.length > 0) {
        const queued = pending;
        pending = [];
        queued.forEach((name) => fn(name));
    }
}

/** Called by the sidebar to open (or focus) a page as a tab. */
export function openLayoutTab(name: LayoutTabName): void {
    if (opener) {
        opener(name);
    } else {
        pending.push(name);
    }
}
