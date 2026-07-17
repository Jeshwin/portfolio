# Contributing

This is the source for [jeshwinprince.com](https://jeshwinprince.com). It's a
Vite + React + `vite-react-ssg` static site. All content (blog posts, projects)
lives as Markdown in the `content/` directory, so publishing is just a git
commit away.

## Stack at a glance

| Layer            | Choice                                     |
| ---------------- | ------------------------------------------ |
| Build tool       | Vite 5                                     |
| Framework        | React 18 + React Router 6                  |
| Static rendering | `vite-react-ssg` (build-time SSG per route)|
| Styling          | Tailwind CSS 3 + shadcn/ui                 |
| Theming          | `next-themes`                              |
| Content          | Markdown with YAML frontmatter             |
| Deploy           | GitHub Actions → nginx on EC2              |

## Local dev

Requires Node 22 (LTS). The repo pins this via `.nvmrc` and `engines` in
`package.json`. Node 25 breaks server-side rendering — see the note in the
git history if you ever accidentally hit it again.

```bash
nvm use          # picks up .nvmrc
npm ci
npm run dev      # http://localhost:5173
```

Other scripts:

- `npm run build` — full SSG build to `dist/`.
- `npm run preview` — serves `dist/` locally to sanity-check a build.
- `npm run lint` — ESLint over `src/`.

## Repo layout

```
content/
  blog/<slug>.md              # blog posts
  projects/<slug>.md          # project entries
public/
  images/
    site/                     # profile photo, 404 art, SCU logo, etc.
    blog/<slug>/              # any inline images used in a blog post
    projects/<slug>/          # thumbnail + gallery images for a project
      thumbnail.<ext>
      ...
  favicon.ico
src/
  App.tsx                     # root layout: ThemeProvider + Navbar + Outlet + Footer
  main.tsx                    # ViteReactSSG entry
  routes.tsx                  # route tree consumed by vite-react-ssg
  pages/                      # one component per route
  components/
    ui/                       # shadcn primitives
    ...
  lib/
    content.ts                # loads/renders markdown at build time via import.meta.glob
    types.ts                  # Post / Project / *Frontmatter interfaces
    utils.ts
  styles/globals.css
deploy/
  nginx.conf                  # nginx server block used on the EC2 host
.github/workflows/aws.yml     # build + deploy to EC2 on push to `production`
```

## Adding a new blog post

1. Pick a URL slug — kebab-case, e.g. `learning-rust`. This becomes both the
   filename and the URL (`/blog/learning-rust`).

2. Create `content/blog/learning-rust.md`:

   ```md
   ---
   title: "Learning Rust"
   description: "A short blurb shown on the /blog index."
   created_at: 2026-07-20T12:00:00.000Z
   updated_at: 2026-07-20T12:00:00.000Z    # optional; omit if same as created_at
   tags:
     - rust
     - programming
   ---

   # Heading

   Regular markdown. **Bold**, _italic_, [links](https://example.com),
   `inline code`, fenced code blocks, images — all supported.
   ```

3. (Optional) If the post uses inline images, drop them under
   `public/images/blog/learning-rust/` and reference them with root-relative
   paths in the markdown:

   ```md
   ![Diagram](/images/blog/learning-rust/architecture.png)
   ```

4. `git add`, `git commit`, `git push`. Merge to `production` when you want
   it live — GitHub Actions handles the rest.

That's it. There is no database, no CSV index, no CMS. Directory listing is
implicit: `content.ts` finds every `.md` file at build time via
`import.meta.glob`.

## Adding a new project

1. Pick a slug (e.g. `my-cool-app`).

2. Create the image folder: `public/images/projects/my-cool-app/`. Drop in:

   - `thumbnail.<ext>` — required, used on the /projects grid.
   - Any gallery images. Name them descriptively (`landing-page.png`, not
     `IMG_2841.png`).

   Recommendation: compress images before committing. Something like:

   ```bash
   # PNG
   pngquant --quality=65-80 --strip -o out.png in.png
   # JPEG
   cjpeg -quality 82 -optimize -progressive in.jpg > out.jpg
   ```

3. Create `content/projects/my-cool-app.md`:

   ```md
   ---
   title: "My Cool App"
   description: "One-line summary for the card / meta description."
   created_at: 2026-07-20T12:00:00.000Z
   updated_at: 2026-07-20T12:00:00.000Z
   thumbnail: /images/projects/my-cool-app/thumbnail.png
   tags:
     - web
     - typescript
   links:
     - title: "Live site"
       url: "https://mycoolapp.example.com"
     - title: "Source Code"
       url: "https://github.com/Jeshwin/my-cool-app"
   artifacts:
     - type: image
       url: /images/projects/my-cool-app/landing-page.png
       alt: "The landing page"
     - type: image
       url: /images/projects/my-cool-app/dashboard.png
       alt: "Dashboard view"
   ---

   Long-form description in markdown. Multiple paragraphs, headings, code
   fences, links — same as blog posts.
   ```

4. `git add`, `git commit`, `git push`, merge to `production`.

### Adding an image to an existing project

1. Drop the file into `public/images/projects/<slug>/`.
2. Add an entry under `artifacts:` in that project's `.md`.
3. Commit and push.

## Editing / removing content

- Editing: change the `.md` file. Update `updated_at` if you want the "Updated"
  timestamp on the detail page to change.
- Removing: delete the `.md` file (and its image folder, if unused).
- Renaming (changing the slug): rename the `.md` file and any references. The
  slug is the filename stem.

## Deployment

Push to `production` (or run the workflow manually). The workflow:

1. `npm ci` on Node 22.
2. `npm run build` → produces `dist/` with one HTML file per route.
3. `scp` the tarball to the EC2 instance.
4. Extract into a timestamped release directory under
   `/var/www/jeshwinprince/releases/`, atomically swap the `dist` symlink,
   keep the last 5 releases for rollback.
5. `sudo nginx -t && sudo systemctl reload nginx`.

There is **no Node.js process running in production** — nginx serves the
static files directly. To roll back: SSH in, re-point `/var/www/jeshwinprince/dist`
to a previous release directory, `nginx -s reload`.

## First-time EC2 setup

One-time on the box:

```bash
sudo apt update && sudo apt install -y nginx
sudo mkdir -p /var/www/jeshwinprince/releases
sudo chown -R $USER:$USER /var/www/jeshwinprince

# Copy the nginx config from this repo, then:
sudo cp deploy/nginx.conf /etc/nginx/sites-available/jeshwinprince
sudo ln -sf /etc/nginx/sites-available/jeshwinprince /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# HTTPS
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d jeshwinprince.com -d www.jeshwinprince.com

# Allow the deploy user to reload nginx without a password prompt
echo "$USER ALL=(root) NOPASSWD: /usr/sbin/nginx, /bin/systemctl reload nginx" | \
    sudo tee /etc/sudoers.d/jeshwinprince-deploy
```

After that, GitHub Actions runs itself.
