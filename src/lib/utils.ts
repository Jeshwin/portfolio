import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a date for display. HYDRATION-CRITICAL: the locale and time zone are
 * both pinned.
 *
 * Every page is pre-rendered in Node and then hydrated in the browser. A bare
 * `toLocaleDateString(undefined, ...)` resolves `undefined` against the
 * ambient locale, and Node's ICU default rarely matches the visitor's browser
 * - so the server would emit "Jan 5, 2025" where the client renders
 * "5 Jan 2025" and React reports a text-content mismatch. Likewise an
 * unpinned time zone can shift a UTC-midnight date across a day boundary.
 *
 * Use this everywhere a content date is rendered; never call
 * `toLocaleDateString` directly in a component.
 */
export function formatDate(date: Date | string | number): string {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });
}

/** Machine-readable date for `<time dateTime=…>`, e.g. "2025-01-05". */
export function isoDate(date: Date | string | number): string {
    return new Date(date).toISOString().slice(0, 10);
}

/** True when two dates fall on different UTC days. */
export function isDifferentDay(
    a: Date | string | number,
    b: Date | string | number
): boolean {
    return isoDate(a) !== isoDate(b);
}

/**
 * Derive a meta description from rendered HTML: strip tags, collapse
 * whitespace, decode the handful of entities remark emits, then truncate on a
 * word boundary. Only a fallback - a hand-written frontmatter description is
 * always better.
 */
export function metaDescription(html: string | undefined, max = 155): string {
    if (!html) return "";
    const text = html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#3[49];/g, "'")
        .replace(/\s+/g, " ")
        .trim();
    if (text.length <= max) return text;
    const clipped = text.slice(0, max);
    const lastSpace = clipped.lastIndexOf(" ");
    return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).replace(/[.,;:!?-]+$/, "")}…`;
}
