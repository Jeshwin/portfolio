# Fastly migration runbook

Moves jeshwinprince.com off the EC2 + nginx box and onto Fastly Compute. Work
through it top to bottom and tick things off. Every step says how to check it
worked before you move on. Nothing here touches the live site until **step 7
(DNS)**, and until **step 9** you can undo everything by pointing DNS back.

State when this was written (2026-11-20): `jeshwinprince.com` and `www` both
resolve to `50.18.199.97` (the EC2 box, `Server: nginx`). DNS is hosted on
Google Cloud DNS (`ns-cloud-a1..a4.googledomains.com`).

## How it works now

```
push to production ─┐
Actions tab "Run" ──┼─> .github/workflows/fastly.yml
publish.mjs ────────┘     1. pull posts from KV "portfolio-posts" into content/blog/
   │                      2. npm run build  (same SSG build as before)
   │                      3. upload dist/ to KV "portfolio-site" (changed files only)
   ▼
compute-js/src/index.js   (JS compiled to Wasm, runs on Fastly's edge)
   /admin/posts/...   -> token check -> write KV "portfolio-posts" -> start the workflow
   everything else    -> serve dist/ from KV "portfolio-site" (+ the old nginx headers)
```

| Piece | What it is |
| --- | --- |
| `compute-js/` | The Fastly Compute app. `fastly.toml` creates the stores, secrets and GitHub backend on its first deploy. |
| `compute-js/publish-content.config.js` | The nginx `try_files`/404 rules, in static-publisher form. |
| `.github/workflows/fastly.yml` | Replaces `aws.yml`. |
| `scripts/publish.mjs` | Publishes a post from your laptop, without git. |
| `scripts/pull-kv-content.mjs` | CI step that turns published posts back into `content/blog/` files. |
| `public/play/sudoku/` | The Sudoku game (static files: page, 20 MB `.wasm`, font). |

---

## 1. Check your Fastly account and get an API token  ☐

You made the account through AWS Marketplace. That means **Fastly bills
through your AWS account**, so don't close the AWS account itself in step 10,
only the EC2 resources. Open AWS Console → *AWS Marketplace → Manage
subscriptions* → Fastly, and note which plan you're on and what it costs. Free
allowances may differ from Fastly's direct sign-up.

1. Log in at <https://manage.fastly.com>.
2. *Account → Personal profile → API tokens → Create token*. Scope: **Global
   API access**. Service access: all services. Save it in your password manager.
3. In a terminal:

   ```sh
   cd compute-js
   npm ci
   npx fastly profile create      # paste the token when asked
   npx fastly whoami              # ✅ prints your name / customer
   npx fastly service list        # see what (if anything) exists already
   ```

> **Use a token from your own login, not an automation token.** An automation
> token ("…@fastlyautomationaccount.com" in `whoami`) with the *engineer* role
> gets **403 on KV Stores and TLS**. `fastly:deploy` then fails with
> `403 Forbidden` right after the backend prompt, and rolls back the service.
> Check what a token can reach (KV and TLS must both be 200):
> ```sh
> T=$(npx fastly auth token); for u in /resources/stores/kv /tls/subscriptions; do
>   curl -s -o /dev/null -w "$u %{http_code}\n" -H "Fastly-Key: $T" https://api.fastly.com$u; done
> ```
> If KV is still 403 with your own superuser token, KV Store isn't enabled on
> the account yet. Check *Resources → KV Stores* in the web UI. For an AWS
> Marketplace account, you may have to ask Fastly support to enable it.

If `service list` shows a service you made while setting up through AWS, look
at it in the web UI. If it's an empty "CDN"/VCL service, leave it alone or
delete it; step 3 creates a separate **Compute** service. If a domain like
`jeshwinprince.com` is attached to it, **remove that domain from it**: one
domain can belong to only one service.

## 2. Make the two publishing secrets  ☐

You'll be asked for these during step 3.

- **PUBLISH_TOKEN**: the password for `/admin/posts`. Generate it:
  `openssl rand -hex 32`. Save it in your password manager.
- **GITHUB_TOKEN**: lets Fastly start the deploy workflow. On GitHub, go to
  *Settings → Developer settings → Fine-grained tokens → Generate*:
  - Repository access: **only `Jeshwin/portfolio`**
  - Permissions → Repository → **Actions: Read and write** (nothing else)
  - Expiration: up to a year. Put a reminder in your calendar, because publishing
    stops triggering rebuilds when it expires (step 8 explains the error).

## 3. First deploy of the Compute app  ☐

```sh
cd compute-js
npm run fastly:deploy
```

It builds `bin/main.wasm`, then asks a few questions:
- **Create a new service?** Yes. Name it `portfolio`.
- **Domain**: accept the suggested `something.edgecompute.app`. Your real domain
  comes in step 7.
- **Backends / stores**: it creates `portfolio-site`, `portfolio-posts`, the
  `github` backend and the `portfolio-secrets` store from `fastly.toml`. Accept
  the defaults.
- **PUBLISH_TOKEN / GITHUB_TOKEN**: paste the values from step 2.

✅ It finishes with a URL like `https://something.edgecompute.app`. Opening it
now gives an error, because there's no content yet. That's expected.

The CLI has written `service_id = "..."` into `compute-js/fastly.toml`. **Commit that
change.**

## 4. Upload the site and test it on the edgecompute.app URL  ☐

```sh
cd ..                       # repo root
npm run build
cd compute-js
FASTLY_API_TOKEN=<token from step 1> npm run fastly:publish
```

✅ Ends with `🎉 Completed.` Now run this check (replace the URL):

```sh
B=https://something.edgecompute.app
for p in / /blog/making-my-website /projects/sudoku /nope /sitemap.xml /play/sudoku/ /play/sudoku/pkg/demo_bg.wasm; do
  printf "%-32s " "$p"; curl -s -o /dev/null -H 'Accept: text/html' -w "%{http_code} %{content_type}\n" "$B$p"
done
curl -sI "$B/" | grep -i -E "cache-control|x-frame|x-served-by"
```

Expected:

```
/                                200 text/html
/blog/making-my-website          200 text/html
/projects/sudoku                 200 text/html
/nope                            404 text/html        <- must be 404, not 200
/sitemap.xml                     200 application/xml
/play/sudoku/                    200 text/html
/play/sudoku/pkg/demo_bg.wasm    200 application/wasm
cache-control: no-cache
x-frame-options: SAMEORIGIN
x-served-by: cache-...
```

Then check in a browser:
- Click through home → blog → a post → projects.
- Drag a tab in the workspace to check that the React app hydrated.
- Toggle dark mode.
- Open `/play/sudoku/` and play a few moves. The first load is slow, because it's 20 MB.

Compare against the live site. Links in the sitemap and canonical tags still
say `https://jeshwinprince.com`, which is correct.

## 5. Let GitHub Actions deploy  ☐

1. GitHub repo → *Settings → Secrets and variables → Actions → New repository
   secret*: `FASTLY_API_TOKEN` = the token from step 1.
2. Commit everything (including `fastly.toml` with its `service_id`) and get it
   onto **both `main` and `production`**. GitHub only accepts API-triggered runs
   for a workflow that exists on the default branch.
3. The push to `production` runs **both** workflows: `aws.yml` keeps EC2
   updated, and `fastly.yml` deploys to Fastly. That's intended until the cutover.

✅ The *Actions → Deploy to Fastly* run is green. Its "Pull posts" step says
`wrote 0 file(s)`, which is right because you haven't published anything yet.

## 6. Test publishing without git  ☐

Write a throwaway post anywhere, e.g. `~/test-post.md`:

```md
---
title: "Test post"
description: "Delete me"
created_at: 2026-11-20T12:00:00.000Z
---

Hello from the edge.
```

```sh
read -s PUBLISH_TOKEN && export PUBLISH_TOKEN      # paste; keeps it out of shell history
SITE=https://something.edgecompute.app node scripts/publish.mjs ~/test-post.md
```

✅ `PUT /admin/posts/test-post -> 202 Stored post test-post. Rebuild started`.
A new *Deploy to Fastly* run appears in Actions. When it's done, check:
- `/blog/test-post` loads.
- The post is listed on `/blog`.
- `/sitemap.xml` contains it.

Images: put them in a folder named after the post (`~/test-post/pic.png`) and
reference them as `![Alt](pic.png)`, exactly like `content/blog/`.

Check that the lock works:

```sh
curl -s -o /dev/null -w "%{http_code}\n" -X PUT https://something.edgecompute.app/admin/posts/x -d hi   # 401
```

Clean up: `SITE=... node scripts/publish.mjs ~/test-post.md --delete` → after the
rebuild, `/blog/test-post` is a 404.

## 7. Point jeshwinprince.com at Fastly (the actual cutover)  ☐

**A day before:** in your DNS console, lower the TTL of the `@` and `www`
records to 300 seconds, so a rollback takes effect quickly. Your nameservers are
`ns-cloud-*.googledomains.com`, which is Google Cloud DNS. Look for the zone in
<https://console.cloud.google.com/net-services/dns>. If the domain was a
Google Domains one that moved to Squarespace, check
<https://account.squarespace.com/domains>.

1. **Add the domains to the service.** In the Fastly UI: your `portfolio` service → *Domains*
   → add `jeshwinprince.com` and `www.jeshwinprince.com` → activate the new
   version.
2. **TLS certificate.** Go to *Secure → TLS management → Get started / Add certificate* → *Use certificates Fastly
   obtains for you*, for both names. Fastly shows **DNS records to prove you
   own the domain** (an ACME `_acme-challenge` CNAME). Add them in your DNS
   console and wait until Fastly shows the certificate as *Issued*. Leave the
   challenge records in place so renewals keep working.
3. **Switch traffic.** The same TLS page shows the records to point at Fastly:
   - **`www`**: a `CNAME` to the hostname Fastly gives you.
   - **apex `@`**: `A` records with the IPs Fastly gives you. An apex can't be a
     CNAME, so these are specific anycast IPs.

   Replace the old `A 50.18.199.97` records with these. Use exactly what
   Fastly shows. Don't copy IPs from anywhere else.

✅ Verify (DNS can take a few minutes):

```sh
dig +short jeshwinprince.com A          # Fastly IPs, NOT 50.18.199.97
dig +short www.jeshwinprince.com        # Fastly hostname / IPs
curl -sI https://jeshwinprince.com | grep -i -E "^(HTTP|server|x-served-by)"
#   HTTP/2 200
#   x-served-by: cache-...              (and no "server: nginx")
```

Then run the step 4 loop again with `B=https://jeshwinprince.com` and
`B=https://www.jeshwinprince.com`. Also open the site in a private window and
on your phone, to rule out a cached result.

**Rollback (any time before step 9):** set the `@`/`www` records back to
`A 50.18.199.97`.

## 8. Live with it for a week  ☐

- Publish for real: `node scripts/publish.mjs content/blog/<post>.md`. With no
  `SITE` set, it targets `https://jeshwinprince.com`.
- If publishing prints **502 … rebuild did not start**, the post **is saved**.
  The usual cause is an expired or wrong GitHub token. Run *Actions → Deploy to
  Fastly → Run workflow* by hand. To replace the token:
  `npx fastly secret-store-entry create --recreate --store-id=<id> --name=GITHUB_TOKEN`
  (store ID from `npx fastly secret-store list`).
- Keep an eye on *Fastly → Billing* and the AWS Marketplace charge.

## 9. Shut down AWS  ☐

Only once step 7 has been solid for about a week. In the AWS console,
**region us-west-1 (N. California)**, which is where `50.18.199.97` lives:

1. **EC2 → Instances** → the portfolio instance → *Instance state → Stop*.
   (Stop, not terminate. You can still start it again.) ✅ The site still works,
   which proves nothing depends on the box.
2. A few days later: **Terminate** it.
3. **EC2 → Elastic IPs**: if `50.18.199.97` is listed, *Release* it. An Elastic
   IP that isn't attached to a running instance is billed hourly. After this,
   rollback to EC2 is no longer possible.
4. **EC2 → Volumes**: delete any volume left in state `available`.
   **EC2 → Snapshots / AMIs**: delete the ones you made for this box.
5. Also check these for leftovers: **Route 53** hosted zones (your DNS is at
   Google, so there probably aren't any), **CloudWatch** alarms, **S3** buckets
   (the README mentions S3 images from an older version of the site), and
   **Security groups / key pairs** used only by this instance.
6. GitHub: delete the `EC2_HOST`, `EC2_USERNAME`, `EC2_SSH_KEY`, `EC2_SSH_PORT`
   secrets.
7. In the repo: `git rm .github/workflows/aws.yml deploy/nginx.conf`. Delete
   the EC2 sections of `CONTRIBUTING.md`, then commit and push.
8. Next month: **Billing → Bills**. There should be no EC2/EBS/EIP lines, only
   the Fastly Marketplace charge (if any).

## Day-to-day reference

| Task | Command |
| --- | --- |
| Publish / update a post (no git) | `node scripts/publish.mjs path/to/slug.md` |
| Unpublish a post published that way | `node scripts/publish.mjs path/to/slug.md --delete` |
| Deploy a code or git-content change | push to `production` (as before) |
| Change `compute-js/src` or `static-publish.rc.js` | `cd compute-js && npm run fastly:deploy` (then push) |
| Run the Compute app locally | `npm run build`, then `cd compute-js && npm run dev:publish && npm run dev:start` → <http://127.0.0.1:7676> (local publish token: `local-dev-token`) |
| Update the Sudoku game | `wasm-pack build --target web --out-name demo` in `rust_sudoku`, then copy `pkg/demo.js`, `pkg/demo_bg.wasm` into `public/play/sudoku/pkg/` |
| Add another browser game/app | build output into `public/play/<name>/` + a `content/projects/<name>.md` linking to it |

## Things to know

- **Posts published with `publish.mjs` are not in git.** The KV store holds the
  only server-side copy, so keep your local `.md` files. A KV post with the same
  slug as a file in `content/blog/` replaces it on the site. `--delete` only
  removes the KV copy.
- `public/play/sudoku/pkg/demo_bg.wasm` is a 20 MB file committed to git.
  Running `wasm-opt -Oz` (or adding `opt-level = "z"` + `lto = true` to the
  release profile) in the Rust project would shrink it a lot.
- The site's pages aren't cached at Fastly's edge beyond the KV reads, which
  are fast. If you want, the static publisher can add a response cache
  (`publisherServer.setResponseCache`). That needs a purge after each publish, so
  it was left out.
