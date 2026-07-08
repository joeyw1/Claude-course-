---
description: Push to GitHub, deploy/update GitHub Pages via Actions, write a professional README, update repo About + live link, and security-scan for leaked secrets
---

Run the full "ship this site" workflow for this repo, in this order. Do not skip the security scan — it must pass before anything is pushed.

## 0. Security scan (run first, before staging or pushing anything)

Before touching git, scan the working tree for anything that shouldn't be public:

- Run `git status` and `git diff` (and `git diff --staged` if anything is already staged) to see exactly what would be committed.
- Grep changed/untracked files for common secret patterns: API keys, tokens (`sk-`, `gho_`, `ghp_`, `AKIA`, `-----BEGIN`), passwords, `.env` files, connection strings, hardcoded credentials.
- Check for accidentally-included local/IDE state (e.g. `.claude/scheduled_tasks.lock`, `node_modules/`, `.env`, editor swap files) that should be gitignored rather than committed.
- If anything sensitive is found: **stop and tell the user** what was found and where, rather than committing it. Add it to `.gitignore` if it's local state, or ask the user how to handle real secrets (rotate + remove, use env vars/secrets store instead).
- Only proceed to the next steps once the diff is clean.

## 1. Push/update code to GitHub

- `git status` to see what's changed.
- Stage the relevant files by name (not `git add -A`) — review before staging.
- Commit with a message describing the actual change.
- Confirm with the user before pushing (per standing instructions on shared/visible actions), then `git push`.
- If push fails on auth, use `git credential fill` (protocol=https, host=github.com) to retrieve the cached token for API calls — never print the token value into chat output or logs.

## 2. Create/update GitHub Pages via GitHub Actions

- Ensure `.github/workflows/deploy-pages.yml` exists using `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages` (static site, no build step — `path: .`), triggered on push to `main`.
- Check whether Pages is configured for the "GitHub Actions" build type:
  `curl -s https://api.github.com/repos/<owner>/<repo>/pages`
  If it 404s, enable it via the API using the cached token:
  `POST /repos/<owner>/<repo>/pages` with `{"build_type":"workflow"}`
  (fall back to telling the user to flip Settings → Pages → Source → "GitHub Actions" manually if the API call fails, e.g. insufficient token scope).
- After pushing, poll the latest workflow run (`GET /repos/<owner>/<repo>/actions/runs`) until it completes; if it fails, fetch the job/steps to diagnose, fix, and re-trigger (`POST .../actions/runs/<id>/rerun`).
- Confirm the live URL responds 200: `curl -s -o /dev/null -w "%{http_code}" https://<owner>.github.io/<repo>/`.

## 3. Write/refresh a professional README

Keep it accurate to the actual code (don't invent features). Include:
- Project name and one-line description
- **Live site link** (from step 2)
- Feature list
- Project structure
- How to run locally
- Deployment note (GitHub Actions → Pages)
- Any noteworthy implementation detail worth calling out (e.g. where a TODO for a real backend lives)

## 4. Update the repo's About section

Via the API (PATCH `/repos/<owner>/<repo>`) using the cached token:
- `description`: a concise one-line summary
- `homepage`: the live Pages URL from step 2

Verify by re-reading the response (`description` / `homepage` fields).

## Report back

Summarize what changed, the live URL, and explicitly confirm the security scan passed clean (or what was excluded/flagged and why).
