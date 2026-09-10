import {Head} from "vite-react-ssg";
import {getPost, getPosts, getProject, getProjects} from "@/lib/content";
import {pathFor, type PageId} from "@/lib/routes-map";
import {metaDescription} from "@/lib/utils";

/** Absolute origin. Open Graph and JSON-LD require absolute URLs. */
export const SITE_ORIGIN = "https://jeshwinprince.com";
const SITE_NAME = "Jeshwin Prince";
const AUTHOR = "Jeshwin Prince";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/images/site/profile.jpg`;
const DEFAULT_DESCRIPTION =
    "Jeshwin Prince is a Carnegie Mellon MCDS student. Read his blog, browse his projects, and get in touch.";

const SAME_AS = [
    "https://github.com/Jeshwin",
    "https://www.linkedin.com/in/jeshwinprince/",
    "https://www.youtube.com/@math-a-magic9820",
];

export function absoluteUrl(path: string | undefined): string {
    if (!path) return SITE_ORIGIN;
    return `${SITE_ORIGIN}${path === "/" ? "" : path}`;
}

interface Meta {
    title: string;
    description: string;
    ogType: "website" | "article" | "profile";
    image: string;
    /** JSON-LD graph nodes for this page. */
    jsonLd: Record<string, unknown>[];
    noindex?: boolean;
    /** Article timestamps, emitted as OG article:* tags. */
    published?: string;
    modified?: string;
}

const PERSON = {
    "@type": "Person",
    "@id": `${SITE_ORIGIN}/#person`,
    name: AUTHOR,
    url: SITE_ORIGIN,
    image: DEFAULT_IMAGE,
    sameAs: SAME_AS,
};

const WEBSITE = {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    publisher: {"@id": `${SITE_ORIGIN}/#person`},
};

/**
 * Resolve every piece of metadata for a page. Kept as one pure function so the
 * whole SEO surface for the site is readable in a single place.
 */
function metaFor(page: PageId, slug?: string, url = SITE_ORIGIN): Meta {
    switch (page) {
        case "home":
            return {
                title: `${AUTHOR} — Software Engineer & CMU MCDS Student`,
                description: DEFAULT_DESCRIPTION,
                ogType: "profile",
                image: DEFAULT_IMAGE,
                jsonLd: [{...PERSON, jobTitle: "Software Engineer"}, WEBSITE],
            };

        case "about":
            return {
                title: `About — ${AUTHOR}`,
                description:
                    "Jeshwin Prince's education, experience and skills: a Master of Computational Data Science at Carnegie Mellon and a BS in Computer Science and Engineering from Santa Clara University.",
                ogType: "profile",
                image: DEFAULT_IMAGE,
                jsonLd: [
                    {
                        ...PERSON,
                        alumniOf: [
                            {
                                "@type": "CollegeOrUniversity",
                                name: "Carnegie Mellon University",
                            },
                            {
                                "@type": "CollegeOrUniversity",
                                name: "Santa Clara University",
                            },
                        ],
                        knowsAbout: [
                            "Software Engineering",
                            "Computational Data Science",
                            "Machine Learning",
                            "Web Development",
                        ],
                    },
                ],
            };

        case "contact":
            return {
                title: `Contact — ${AUTHOR}`,
                description:
                    "Get in touch with Jeshwin Prince by email or on LinkedIn.",
                ogType: "website",
                image: DEFAULT_IMAGE,
                jsonLd: [{...PERSON, email: "mailto:jeshwinjprince@gmail.com"}],
            };

        case "blog":
            return {
                title: `Blog — ${AUTHOR}`,
                description:
                    "Essays and notes by Jeshwin Prince on programming, mathematics, and the tools he builds.",
                ogType: "website",
                image: DEFAULT_IMAGE,
                jsonLd: [
                    {
                        "@type": "Blog",
                        "@id": absoluteUrl(pathFor("blog")) + "#blog",
                        name: `Blog — ${AUTHOR}`,
                        url: absoluteUrl(pathFor("blog")),
                        author: {"@id": `${SITE_ORIGIN}/#person`},
                        blogPost: getPosts().map((post) => ({
                            "@type": "BlogPosting",
                            headline: post.title,
                            url: absoluteUrl(pathFor("blog-post", post.id)),
                            datePublished: post.createdAt.toISOString(),
                            author: {"@id": `${SITE_ORIGIN}/#person`},
                        })),
                    },
                ],
            };

        case "blog-post": {
            const post = getPost(slug ?? "");
            const description =
                post.description ||
                metaDescription(post.body) ||
                DEFAULT_DESCRIPTION;
            const published = post.createdAt.toISOString();
            const modified = (post.updatedAt ?? post.createdAt).toISOString();
            return {
                title: `${post.title} — ${AUTHOR}`,
                description,
                ogType: "article",
                image: DEFAULT_IMAGE,
                published,
                modified,
                jsonLd: [
                    {
                        "@type": "BlogPosting",
                        headline: post.title,
                        description,
                        datePublished: published,
                        dateModified: modified,
                        author: {"@id": `${SITE_ORIGIN}/#person`},
                        publisher: {"@id": `${SITE_ORIGIN}/#person`},
                        keywords: post.tags,
                        mainEntityOfPage: {"@type": "WebPage", "@id": url},
                        url,
                    },
                ],
            };
        }

        case "projects":
            return {
                title: `Projects — ${AUTHOR}`,
                description:
                    "Software, design and engineering projects built by Jeshwin Prince.",
                ogType: "website",
                image: DEFAULT_IMAGE,
                jsonLd: [
                    {
                        "@type": "CollectionPage",
                        name: `Projects — ${AUTHOR}`,
                        url: absoluteUrl(pathFor("projects")),
                        mainEntity: {
                            "@type": "ItemList",
                            itemListElement: getProjects().map(
                                (project, index) => ({
                                    "@type": "ListItem",
                                    position: index + 1,
                                    name: project.title,
                                    url: absoluteUrl(
                                        pathFor("project", project.id)
                                    ),
                                })
                            ),
                        },
                    },
                ],
            };

        case "project": {
            const project = getProject(slug ?? "");
            const description =
                project.summary ||
                metaDescription(project.description) ||
                DEFAULT_DESCRIPTION;
            return {
                title: `${project.title} — ${AUTHOR}`,
                description,
                ogType: "article",
                image: absoluteUrl(project.thumbnail),
                published: project.createdAt.toISOString(),
                modified: project.updatedAt.toISOString(),
                jsonLd: [
                    {
                        "@type": "SoftwareSourceCode",
                        name: project.title,
                        description,
                        url,
                        image: absoluteUrl(project.thumbnail),
                        dateCreated: project.createdAt.toISOString(),
                        dateModified: project.updatedAt.toISOString(),
                        author: {"@id": `${SITE_ORIGIN}/#person`},
                        keywords: project.tags,
                        programmingLanguage: project.tags,
                        codeRepository: project.links?.find((link) =>
                            link.url.includes("github.com")
                        )?.url,
                    },
                ],
            };
        }

        default:
            return {
                title: `Page not found — ${AUTHOR}`,
                description: "This page does not exist.",
                ogType: "website",
                image: DEFAULT_IMAGE,
                noindex: true,
                jsonLd: [],
            };
    }
}

/**
 * Emits the full <head> surface for a route: title, description, canonical,
 * Open Graph, Twitter card and JSON-LD.
 *
 * This renders on the SSG pass, which is the only pass that matters - crawlers
 * read the pre-rendered HTML. After hydration the route never re-matches (the
 * URL is updated with `replaceState`, which react-router doesn't observe), so
 * this component does not update in the browser; <UrlSync> keeps
 * `document.title` current instead. See docs/seo-refactor.md §D.
 */
export default function Seo({page, slug}: {page: PageId; slug?: string}) {
    const url = absoluteUrl(pathFor(page, slug));
    const meta = metaFor(page, slug, url);

    const jsonLd =
        meta.jsonLd.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@graph": meta.jsonLd,
              }
            : null;

    return (
        <Head>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <link rel="canonical" href={url} />
            {meta.noindex && <meta name="robots" content="noindex, follow" />}

            <meta property="og:type" content={meta.ogType} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={meta.image} />
            {meta.published && (
                <meta
                    property="article:published_time"
                    content={meta.published}
                />
            )}
            {meta.modified && (
                <meta
                    property="article:modified_time"
                    content={meta.modified}
                />
            )}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={meta.image} />

            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Head>
    );
}
