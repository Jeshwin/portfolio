# Implementation Plan: In-Site Authoring for Blog + Portfolio

## Guiding principles

- Reuse what works: keep Next.js App Router on EC2/PM2. We add a backend inside Next.js (Route Handlers + Server Actions) — no separate server.
- Public site stays public and fast. Only /admin/\* and write APIs are gated.
- One source of truth = Postgres. S3 demotes to "asset bucket" (images/PDFs only), no longer holding CSV/MD/YAML.

## 1. Data model (Postgres)

Your old migrating/setup.sql is 90% of the way there. Changes from it:

blog_posts — keep as-is. Body stays markdown (TEXT). (Note: your old seed stored HTML in body; we'll standardize on markdown going forward and convert the 3 old posts during migration.)

projects — replace the description/artifacts/links columns with a single blocks JSONB column (the block-based model you chose). Keep title, thumbnail, timestamps.

Tags — recommend simplifying from the 3-table junction setup (tags + blog_post_tags + project_tags) to a plain tags TEXT[] column on each table. You're a single author; normalized tags add a lot of query/CRUD complexity for no real benefit. (If you'd rather keep normalized tags for a future tag-filter UI, say so and I'll keep the junctions.)

Add slug (VARCHAR UNIQUE) to both tables. Right now URLs use the S3 filename as the ID (/blog/making-my-website). A slug column preserves those human-readable URLs while the primary key stays a serial/uuid. Keeps existing links from breaking.

### Block model (portfolio blocks JSONB)

An ordered array; each block is a discriminated union:

```typescript
type Block =
    | {type: "paragraph"; markdown: string}
    | {type: "heading"; level: 2 | 3; text: string}
    | {type: "image"; url: string; alt: string; caption?: string}
    | {type: "gallery"; images: {url: string; alt: string; caption?: string}[]}
    | {type: "links"; links: {title: string; url: string}[]}
    | {type: "embed"; embedType: "pdf" | "iframe"; url: string; title?: string};
```

This directly models "lots of images with associated text + a main paragraph + relevant links," and is trivial to render and to edit in a form.

## 2. Database access layer

- Add a DB client. Recommend Drizzle ORM (drizzle-orm + pg) — TypeScript-first, lightweight, gives typed queries and migrations without Prisma's heaviness. (Plain pg with hand-written SQL is the simpler-but-less-safe alternative.)
- Rewrite src/lib/s3.ts → src/lib/content.ts (or split into lib/db.ts + lib/queries.ts). Same exported function signatures (getPosts, getPost, getProjects, getProject, getAllPostIds, getAllProjectIds) so the public pages barely change. They just query Postgres instead of fetching S3 CSV/MD/YAML.
- src/lib/types.ts: update Project to carry blocks: Block[] and add the Block union; add slug.

## 3. Authentication (Auth.js + GitHub OAuth, allowlisted to you)

- Add next-auth@beta (Auth.js v5) — the App-Router-native version.
- GitHub provider. Create a GitHub OAuth App (callback https://yourdomain/api/auth/callback/github).
- Allowlist: in the signIn callback, reject anyone whose GitHub numeric user ID isn't yours. Using the numeric ID (not username) prevents a username-change/takeover bypass.
- auth.ts config + src/app/api/auth/[...nextauth]/route.ts.
- middleware.ts guarding /admin/:path* and /api/admin/:path* → redirect unauthenticated users to sign-in. Plus a defense-in-depth auth() check inside every Server Action / write route (middleware alone is not a sufficient security boundary).
- Session strategy: JWT cookie (you already intended a JWT_SECRET; Auth.js uses AUTH_SECRET).

## 4. Image / file uploads to S3

- Add @aws-sdk/client-s3 + @aws-sdk/s3-request-presigner (server-side only).
- Protected route POST /api/admin/upload → returns a presigned PUT URL; the browser uploads the file directly to S3. Scales to large images, keeps your server light.
- S3 bucket reconfig:
- content/ stays for old assets; new uploads go to assets/images/... and assets/files/... with a random key (keep your existing nanoid-style naming).
- Public-read on the asset prefixes (bucket policy), no public write.
- CORS rule allowing PUT from your domain (needed for presigned uploads).
- A new IAM user with a least-privilege policy: s3:PutObject (+ GetObject) on arn:.../assets/\* only. We then delete the broad keys currently in your env and use these scoped ones.
- next.config.js already allows the S3 host in images.remotePatterns — good.

## 5. Admin UI (/admin)

New route group, all behind auth:

- `/admin` — dashboard: lists posts + projects with edit/delete, "New post" / "New project" buttons.
- `/admin/blog/new` and `/admin/blog/[id]/edit` — markdown editor (recommend @uiw/react-md-editor) with live preview, title/description/tags/slug fields, image-insert button (uploads → S3 → inserts markdown image).
- `/admin/projects/new` and `/admin/projects/[id]/edit` — block editor: add/reorder/delete blocks (paragraph, image, gallery, links, embed), with drag-and-drop image upload per block, plus title/thumbnail/tags/slug.
- Writes go through Server Actions (createPost, updatePost, deletePost, and project equivalents) that re-validate auth, write to Postgres, and call revalidatePath() for the affected public pages.
- A small "Edit" affordance on public pages, shown only when logged in, linking straight to the editor.

## 6. Public rendering changes

- Pages currently use `generateStaticParams()` + ISR against S3. With DB-backed content you can either:
- (Recommended) keep generateStaticParams() for initial build but switch to on-demand revalidation — Server Actions call `revalidatePath('/blog')`, `revalidatePath('/blog/[slug]')`, etc. after each save, so edits appear immediately. Best of both: static speed + instant updates.
- Or make them fully dynamic SSR (simplest; fine on EC2).
- Markdown rendering for blog stays (remark + DOMPurify). For projects, render the block array with a `<ProjectBlocks>` component; reuse your existing ProjectGallery (Embla) for gallery blocks. Markdown inside paragraph blocks goes through the same remark+sanitize path.
- dangerouslySetInnerHTML stays sanitized via DOMPurify (already in place).

## . Migration of existing content (one-time)

- Script scripts/migrate-content.ts that:

1. Reads the current S3 posts.csv/\_.md and projects.csv/\_.yaml (or the copies in migrating/content/).
2. Inserts blog posts (convert old HTML bodies → markdown with turndown; new posts are markdown natively).
3. Converts each project YAML into the new blocks array (description → paragraph, artifacts → gallery/image/embed, links → links).
4. Preserves created_at/updated_at and sets slug = old filename id (so URLs don't break).

- Run once against the DB, verify the public site matches, then retire the S3 CSV/MD/YAML (assets stay).

## 8. Deployment & infra changes

- Postgres: two options —
- Managed (recommend for low ops): Neon/Supabase free tier. Just a connection string.
- On EC2: install Postgres locally (no network egress, but you maintain backups/upgrades).
- GitHub Actions (aws.yml): add a build step to run DB migrations on deploy (drizzle-kit migrate), and ensure new env vars are present in the EC2 .env.production (symlinked already at `/var/www/config/jeshwinprince/.env.production`).
- Secrets: add GitHub OAuth + DB + new S3 creds + AUTH_SECRET to that production env file and to GitHub Actions secrets where needed.
- migrating/ folder can be deleted after migration succeeds.

## 9. Security checklist

- Rotate/revoke the AWS keys currently in `.env.development.local` — replace with the scoped upload-only IAM user.
- Allowlist by GitHub numeric ID, not username.
- Auth re-checked inside every write action (not just middleware).
- Bucket: public-read assets only, no public write; presigned PUTs are short-lived.
- Keep DOMPurify sanitization on all rendered user/markdown HTML.
- AUTH_SECRET is a fresh random value.

## 10. New dependencies

`next-auth@beta, drizzle-orm, drizzle-kit, pg, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, @uiw/react-md-editor, turndown (migration only), @types/pg / @types/turndown (dev)`.

## 11. Phased build order (each phase independently testable, on dev branch)

1. DB + data layer: schema/migrations, Drizzle setup, rewrite queries, migrate content, point public pages at DB. Site looks identical, now DB-backed.
2. Auth: Auth.js + GitHub OAuth + allowlist + middleware + protected empty /admin.
3. Uploads: IAM user, bucket policy/CORS, presigned upload route, reusable uploader component.
4. Blog editor: create/edit/delete + revalidation.
5. Portfolio block editor: create/edit/delete + block rendering on public pages.
6. Polish: inline "Edit" buttons, deploy workflow migration step, delete migrating/, docs.

### Env vars you'll need to add (you manage these — I won't touch env files)

- DATABASE_URL — Postgres connection string
- AUTH_SECRET — random 32+ byte secret (openssl rand -base64 32)
- AUTH_GITHUB_ID / AUTH_GITHUB_SECRET — from the GitHub OAuth App
- AUTH_URL — your site's base URL (prod) / http://localhost:3000 (dev)
- ADMIN_GITHUB_ID — your GitHub numeric user ID (the allowlist)
- S3_UPLOAD_ACCESS_KEY_ID / S3_UPLOAD_SECRET_ACCESS_KEY — new scoped IAM user
- S3_BUCKET_NAME / S3_REGION — e.g. jeshwin-portfolio-bucket / us-west-1
  And remove the old broad AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / JWT_SECRET_KEY once migrated.

A few open decisions before I start Phase 1 — defaults in bold are what I'll assume if you don't object:

1. Tags: simple TEXT[] vs normalized junction tables?
2. Postgres: managed (Neon/Supabase) vs on-EC2?
3. ORM: Drizzle vs plain pg SQL?
4. Blog body going forward: markdown (convert old HTML) vs keep HTML?
