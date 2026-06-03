# UROVO Product Documents Collaboration Guide

This repository contains local UROVO product source documents, generated markdown, and the `product-knowledge-vault/` used by the product expert.

## Core Principle

Local official PDFs are the primary source of truth for hard specifications.

Official UROVO web pages are auxiliary sources:

- Use them as extra context during Q&A and sync.
- Use them to detect possible freshness gaps or conflicts.
- Do not overwrite PDF-backed specs from web pages alone.

## Normal Sync Workflow

1. Start from the latest repository state.

   First-time setup:

   ```bash
   git clone <repo-url>
   cd product-documents
   ```

   Existing checkout:

   ```bash
   git checkout main
   git pull --ff-only
   ```

2. Create a working branch.

   Recommended branch name:

   ```bash
   git checkout -b codex/sync-product-docs-YYYY-MM-DD
   ```

   Use a new branch for each sync or product-document update so the diff is easy to review.

3. User edits files.

   Examples:

   - Add or update product PDFs/markdown.
   - Correct vault pages.
   - Resolve items in `USER_JUDGMENT_NEEDED.md`.
   - Mark or explain known web-vs-local conflicts.

4. User sends `SYNC_INSTRUCTION.md` to AI/Codex as the sync prompt.

   AI/Codex should:

   - Read current `git diff`.
   - Compare source PDFs, source markdown, vault pages, and official web sources.
   - Update affected vault pages.
   - Update `product-knowledge-vault/web-source.md`.
   - Update conflict and judgment files.
   - Run vault wiki-link checks.

5. User reviews the AI-generated diff.

   Check:

   - No unsupported specs were added.
   - PDF-backed values were not replaced by web-only values.
   - `WEB_VS_LOCAL_CONFLICTS.md` contains real conflicts, not formatting noise.
   - `USER_JUDGMENT_NEEDED.md` contains only decisions that need human judgment.
   - `product-knowledge-vault/web-source.md` contains only verified official URLs or blank entries.
   - Wiki links resolve correctly.

6. User commits after review.

   Recommended:

   ```bash
   git status --short
   git diff --stat
   git add <reviewed files>
   git commit -m "sync: product docs YYYY-MM-DD"
   git tag sync/YYYY-MM-DD
   ```

   If multiple syncs happen on the same day, use tags such as `sync/YYYY-MM-DD-01`.

7. Push the working branch.

   ```bash
   git push -u origin codex/sync-product-docs-YYYY-MM-DD
   ```

   After pushing, open a pull request or ask the repository owner to review and merge the branch.

## Important Files

| File | Purpose |
| --- | --- |
| `SYNC_INSTRUCTION.md` | Full prompt/instructions for future AI sync runs. |
| `product-knowledge-vault/SCHEMA.md` | Vault structure, source hierarchy, linking rules, and query workflow. |
| `product-knowledge-vault/web-source.md` | Verified official UROVO web pages by product. |
| `sync/web_conflicts.json` | Machine-readable web-vs-local conflict records for AI sync. |
| `WEB_VS_LOCAL_CONFLICTS.md` | Human-readable web-vs-local conflict summary. |
| `USER_JUDGMENT_NEEDED.md` | Root-level decisions the user must make before AI applies changes. |
| `SYNC_LOG.md` | Human-readable sync history, created/updated during sync runs. |

## Conflict Handling

When official web pages and local files disagree:

1. Keep PDF-backed specs unchanged unless the local source evidence supports the change.
2. Record machine-readable conflicts in `sync/web_conflicts.json`.
3. Record human-readable summaries in `WEB_VS_LOCAL_CONFLICTS.md`.
4. Put unresolved business/product-owner decisions in `USER_JUDGMENT_NEEDED.md`.
5. The next sync reads `git diff` to understand what the user decided and applies it.

Valid conflict statuses:

- `open`
- `user-decided`
- `fixed`
- `ignored-known-difference`

## Product Expert Query Behavior

For product Q&A, comparison, tender, and selection tasks, the product expert should:

1. Read `product-knowledge-vault/index.md`.
2. Read relevant `spec/`, `pb/`, category, comparison, matrix, feature, or technology pages.
3. Read `product-knowledge-vault/web-source.md` for the products in scope.
4. Use official web pages as auxiliary context when available.
5. For hard specs, verify against local PDF/source markdown before treating values as authoritative.
6. If web and local sources disagree, surface the discrepancy instead of silently merging values.

## Collaboration Rule

AI/Codex handles synchronization, checks, and conflict marking.

The user keeps final judgment and commit control.
