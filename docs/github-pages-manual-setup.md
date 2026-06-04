# GitHub Pages — manual setup

Complete these steps in GitHub after the deployment code is merged to `main`. The repository workflow (`.github/workflows/deploy-pages.yml`) handles build and publish automatically.

## Prerequisites

- The repository is on GitHub (this project: `automated-payroll-wireframe`).
- You have permission to change **Settings** and run **Actions** for the repo.
- For the free GitHub plan, the repo is usually **public** so Pages is available without extra org configuration. If the repo is private, confirm your org allows GitHub Pages for private repositories.

## 1. Enable GitHub Pages (GitHub Actions source)

1. Open the repository on GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).

No branch or folder selection is needed when using the workflow.

## 2. Trigger the first deployment

1. Merge or push the deployment changes to the **`main`** branch.
2. Open the **Actions** tab.
3. Select the **Deploy Pages** workflow run for the latest `main` commit.
4. Wait until both jobs (**build** and **deploy**) finish successfully.

You can also run the workflow manually: **Actions** → **Deploy Pages** → **Run workflow**.

## 3. Verify the live site

1. On the successful workflow run, open the **deploy** job and note the **github-pages** environment URL (or use **Settings** → **Pages** after the first deploy).
2. Open:

   `https://<your-github-username>.github.io/automated-payroll-wireframe/auth/login`

3. Confirm:
   - Login screen loads with styles (no blank page).
   - Sidebar / bottom nav moves between modules.
   - Auth footer links (sign up, forgot password) work.

Demo login (reference):

- Email: `admin@wireframe.local`
- Password: `Wireframe1!`

## 4. If the workflow is blocked

Check the following in GitHub:

| Issue | What to do |
| ----- | ---------- |
| Actions disabled | **Settings** → **Actions** → **General** → allow actions for this repository. |
| Workflow not listed under Pages | Confirm **Settings** → **Pages** → **Source** = **GitHub Actions**. |
| Environment approval pending | **Settings** → **Environments** → **github-pages** → review required reviewers / approve the deployment in the Actions run. |
| Permission errors on deploy | **Settings** → **Actions** → **General** → Workflow permissions: prefer **Read and write permissions** (or ensure `GITHUB_TOKEN` can write Pages per org policy). |
| **Deploy Pages** fails at **Setup Node** (~12s) | `actions/setup-node` with `cache: pnpm` needs `pnpm-lock.yaml` in the repo | Ensure `pnpm-lock.yaml` is committed (not gitignored); re-run the workflow. |
| Site shows the **README** instead of the wireframe | An old Jekyll/branch deploy is still live; **Deploy Pages** never succeeded | Fix the workflow, run **Deploy Pages** to completion, then hard-refresh the demo URL. |

## 5. If you rename the repository

The workflow sets `BASE_PATH` from the repository name automatically. After a rename:

1. Re-run or push to `main` to redeploy.
2. Update bookmarks to `https://<user>.github.io/<new-repo-name>/`.
3. Confirm **Settings** → **Pages** shows the new URL.

No code change is required for a rename unless you hard-coded the old URL elsewhere.

## 6. Troubleshooting

| Symptom | Likely cause | What to check |
| ------- | ------------- | ------------- |
| Blank page, no styles | Wrong base path or failed build | Actions **build** log; URL must include `/automated-payroll-wireframe/` for a project site. |
| 404 on refresh or direct URL | Missing SPA fallback | Workflow copies `index.html` to `404.html`; confirm that step ran. |
| Links go to `github.io/auth/...` (missing repo segment) | Base path not applied to links | Redeploy latest `main`; report if internal links omit `/automated-payroll-wireframe`. |
| Old content after deploy | CDN cache | Hard refresh; wait a few minutes; check deployment time in Actions. |

## What you do not need to do manually

- Run `pnpm build` on your machine to publish (CI does this).
- Create a `gh-pages` branch.
- Upload the `wireframe/build` folder by hand.

For local verification only, see the root **README** (`pnpm build:pages`, `pnpm preview:pages`).
