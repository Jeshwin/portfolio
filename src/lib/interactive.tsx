import {createContext, useContext} from "react";

/**
 * Whether the tree being rendered lives inside the react-layman workspace.
 *
 * WHY THIS EXISTS: page components are shared between two very different
 * renders - the interactive workspace, and the static document baked into the
 * HTML for crawlers and no-JS visitors. In the workspace, entries like
 * <PostEntry> are drag sources (`useTabDrag` -> react-dnd's `useDrag`), and
 * react-dnd throws `invariant: Expected drag drop context` when there is no
 * <DndProvider> above it. The only DndProvider is the one inside
 * <LaymanProvider>, so rendering those components statically would crash SSG.
 *
 * The rules of hooks forbid calling `useDrag` conditionally, so the branch has
 * to happen at the *call site*: each affected component splits into a `*Tab`
 * variant (hooks, opens a layman tab) and a `*Link` variant (a plain anchor),
 * and picks one with `useInteractive()`. Both variants must emit identical
 * markup and classNames so the static HTML and the hydrated tree agree.
 *
 * Defaults to `true` so the workspace and any future consumer work untouched;
 * only <StaticDocument> provides `false`.
 */
export const InteractiveContext = createContext(true);

export function useInteractive(): boolean {
    return useContext(InteractiveContext);
}
