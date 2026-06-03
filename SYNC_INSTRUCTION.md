# Product Document Sync Instruction

Use this file as the instruction prompt for future AI/Codex sync runs.

## Objective

Keep the product markdown database as accurate as possible as source files are added, deleted, updated, or corrected.

The local official PDF files are the primary source of truth. Product markdown, vault spec pages, vault PB pages, categories, matrices, index pages, and summaries must be aligned to the PDFs or explicitly marked as needing user judgment.

Verified official web pages in `product-knowledge-vault/web-source.md` are auxiliary sources. They must be loaded during sync and query workflows as official context, but they must not overwrite local PDF-backed hard specifications by themselves.

Do not rely on prior chat memory. Inspect the current repository state, git history, and files.

## Core Rules

1. Treat official local PDFs as the source of truth.
2. Do not guess missing specs.
3. If a markdown value is not supported by any official PDF, remove it or leave it blank depending on context.
4. If PB PDF and SPEC PDF differ:
   - Source PB markdown should follow the paired PB PDF.
   - Source SPEC markdown and `product-knowledge-vault/spec/*.md` should follow the paired SPEC PDF.
   - `product-knowledge-vault/pb/*.md` may include same-product SPEC PDF details only if the detail is useful, but references must cite the exact PDF that contains the detail.
5. Do not treat formatting differences as factual conflicts:
   - `x`, `*`, and `×`
   - `BT5.0`, `BT 5.0`, and `Bluetooth v5.0`
   - `Android 13` and `Android 13.0`
   - `ISO 14443 A/B` and `ISO 14443 Type A and B`
   - unit spacing and temperature minus-sign extraction issues
6. For tender/spreadsheet work, fill only fields that have explicit references. Leave unsupported fields blank.
7. Do not edit unrelated files such as `.DS_Store`.
8. Preserve user changes. Never revert files unless explicitly asked.
9. Use official web pages to detect possible freshness gaps, retired pages, and web-vs-local conflicts.
10. If web and local sources disagree, record the conflict instead of guessing which source is correct.

## Recommended Baseline Data

If these files do not exist, create them during the next sync setup:

```text
SYNC_LOG.md
sync/source_manifest.json
sync/product_source_map.json
sync/user_decisions.md
sync/known_false_positives.json
sync/web_conflicts.json
WEB_VS_LOCAL_CONFLICTS.md
USER_JUDGMENT_NEEDED.md
outputs/markdown_pdf_audit/
```

Purpose:

- `SYNC_LOG.md`: human-readable history of each sync.
- `sync/source_manifest.json`: machine-readable list of products, PDFs, markdown files, hashes, and timestamps.
- `sync/product_source_map.json`: mapping from each vault/source markdown file to its source PDF(s).
- `sync/user_decisions.md`: policy decisions made by the user, such as whether PB pages may include SPEC-derived details.
- `sync/known_false_positives.json`: audit findings that were manually confirmed as non-conflicts.
- `sync/web_conflicts.json`: machine-readable official-web-vs-local conflicts for the next AI sync.
- `WEB_VS_LOCAL_CONFLICTS.md`: human-readable summary of official-web-vs-local conflicts.
- `USER_JUDGMENT_NEEDED.md`: root-level decisions the user must make before AI applies changes.
- `outputs/markdown_pdf_audit/`: raw and filtered audit outputs.

## First Step In Every Sync

Run:

```bash
git status --short
git log --oneline -10
git tag --list 'sync/*' --sort=-creatordate
```

Determine the last sync baseline using this priority:

1. Latest `sync/*` git tag.
2. Latest sync commit recorded in `SYNC_LOG.md`.
3. Latest commit whose message starts with `sync:`.
4. If none exists, use current repository state as the first baseline and create one after finishing.

Expected normal workflow: every sync starts from a clean committed state and ends with a commit plus a `sync/YYYY-MM-DD` tag.

## Detect What Changed

If a last sync commit or tag exists:

```bash
git diff --name-status <last-sync-ref>..HEAD
git diff --stat <last-sync-ref>..HEAD
```

Also inspect uncommitted changes:

```bash
git status --short
git diff --name-status
```

Classify changes:

- New product folder
- Deleted product folder
- New PDF
- Updated PDF
- New source markdown
- Updated source markdown
- Vault/spec changes
- Vault/pb changes
- Category/matrix/index/overview changes
- Official web source changes
- User decisions in `USER_JUDGMENT_NEEDED.md`

## Build Or Update Baseline Metadata

Generate or update `sync/source_manifest.json` with at least:

```json
{
  "generated_at": "YYYY-MM-DDTHH:MM:SSZ",
  "git_commit": "commit hash if available",
  "products": [
    {
      "product": "DT610",
      "folder": "DT610",
      "pdfs": [
        {
          "path": "DT610/DT610 Product Spec Sheet.pdf",
          "sha256": "...",
          "mtime": "..."
        }
      ],
      "markdown": [
        {
          "path": "DT610/DT610 Product Spec Sheet.md",
          "sha256": "...",
          "mtime": "..."
        }
      ],
      "vault_files": [
        "product-knowledge-vault/spec/DT610.md",
        "product-knowledge-vault/pb/DT610.md"
      ]
    }
  ]
}
```

Generate or update `sync/product_source_map.json` with at least:

```json
{
  "product-knowledge-vault/spec/DT610.md": {
    "product": "DT610",
    "primary_pdf": "DT610/DT610 Product Spec Sheet.pdf",
    "source_markdown": "DT610/DT610 Product Spec Sheet.md",
    "source_type": "SPEC"
  }
}
```

## Audit Workflow

1. Pair source markdown files with same-folder PDFs.
2. Pair vault spec pages with the product's SPEC PDF.
3. Pair vault PB pages with the product's PB PDF when present; otherwise map them to the most relevant official PDF and mark that mapping.
4. Extract PDF text.
5. Compare hard spec fields:
   - OS
   - CPU / memory
   - display
   - dimensions / weight
   - battery
   - printer speed / paper width / media width
   - scanner / camera
   - payment features
   - Wi-Fi / Bluetooth / cellular / NFC / RFID
   - IP rating / drop / temperature
6. Ignore known formatting-only differences.
7. For any possible conflict, inspect the PDF text manually before editing.
8. If the finding is a real mismatch, correct:
   - source markdown
   - `product-knowledge-vault/spec/*.md`
   - `product-knowledge-vault/pb/*.md`
   - categories
   - matrices
   - index / overview / synthesis / feature pages
9. If the finding is not a conflict, add it to `sync/known_false_positives.json` or the filtered audit report.
10. If the evidence is ambiguous, add it to `outputs/markdown_pdf_audit/user_judgment_needed.md`.

## Official Web Source Workflow

Every sync must include an official web source pass:

1. Read `product-knowledge-vault/web-source.md`.
2. For existing URLs, verify that the URL still resolves and the page still clearly maps to the product or product series.
3. For new products, search official UROVO domains for a product page first, then a category page, then a news page.
4. Fill a URL only when it is real and product-specific enough to be useful.
5. Leave the URL blank when no verified official page exists. Do not guess URL slugs.
6. Update `web-source.md` with `Page Type`, `Verification Method`, and useful notes.
7. Compare only hard specification fields against local PDF/vault data:
   - OS
   - CPU / memory
   - display
   - dimensions / weight
   - battery
   - printer speed / paper width / media width
   - scanner / camera
   - payment features
   - Wi-Fi / Bluetooth / cellular / NFC / RFID
   - IP rating / drop / temperature
8. Ignore marketing phrasing, launch-date copy, ordering differences, and formatting-only differences.
9. If official web and local PDF/vault data differ on a hard field:
   - Add a machine-readable item to `sync/web_conflicts.json`.
   - Add a human-readable item to `WEB_VS_LOCAL_CONFLICTS.md`.
   - Do not change product pages unless local PDF/source evidence supports the change.
10. If the conflict cannot be resolved without business/product-owner judgment, add it to root-level `USER_JUDGMENT_NEEDED.md`.

`sync/web_conflicts.json` entries must use this shape:

```json
{
  "product": "DT610",
  "field": "Bluetooth",
  "local_value": "BT 6.0",
  "web_value": "Bluetooth 6.0",
  "local_source": "product-knowledge-vault/spec/DT610.md",
  "web_url": "https://en.urovo.com/products/rfid-data/DT610-.html",
  "severity": "info",
  "status": "ignored-known-difference",
  "detected_at": "YYYY-MM-DD",
  "notes": "Formatting-only difference."
}
```

Valid `status` values:

- `open`
- `user-decided`
- `fixed`
- `ignored-known-difference`

Valid `severity` values:

- `info`
- `low`
- `medium`
- `high`

## User Judgment Workflow

Use root-level `USER_JUDGMENT_NEEDED.md` for decisions the user must make. Do not bury these decisions only inside audit output folders.

Workflow:

1. AI/Codex writes only unresolved decisions to `USER_JUDGMENT_NEEDED.md`.
2. The user edits that file directly.
3. The next sync reads `git diff` from the last sync baseline and applies decisions that the user recorded.
4. After applying a decision, move it to `sync/user_decisions.md` or mark the relevant conflict as `user-decided`.

Do not ask the user to judge formatting-only differences.

## Vault Link Audit

Every sync must scan wiki links in `product-knowledge-vault/**/*.md`.

Rules:

- Wiki links must point to existing markdown pages.
- Use actual filenames, including hyphens and case.
- Fix deterministic filename mismatches, such as `[[spec/DT50P Lite|...]]` to `[[spec/DT50P-Lite|...]]`.
- If a target page does not exist and should not be created, point to the closest existing aggregate page or remove the link.
- Report unresolved broken links in `SYNC_LOG.md`.

## Required Sync Outputs

At the end of each sync, produce:

```text
outputs/markdown_pdf_audit/markdown_pdf_audit.md
outputs/markdown_pdf_audit/audit_issues.json
outputs/markdown_pdf_audit/user_judgment_needed.md
outputs/markdown_pdf_audit/manual_confirmed_findings.md
```

Also update:

```text
SYNC_LOG.md
sync/source_manifest.json
sync/product_source_map.json
sync/user_decisions.md
sync/known_false_positives.json
sync/web_conflicts.json
WEB_VS_LOCAL_CONFLICTS.md
USER_JUDGMENT_NEEDED.md
```

## SYNC_LOG.md Format

Append one entry per sync:

```md
## Sync YYYY-MM-DD

- Sync commit: `<commit hash>`
- Sync tag: `sync/YYYY-MM-DD`
- Base ref: `<previous sync ref>`
- Operator: `AI/Codex`
- Scope:
  - New products:
  - Deleted products:
  - Updated products:
  - Vault files updated:
- Confirmed corrections:
  - Product: field changed from `old` to `new`, source PDF: `path`
- User decisions:
  - Decision:
- Remaining judgment needed:
  - `outputs/markdown_pdf_audit/user_judgment_needed.md`
- Known false positives added:
  - Pattern:
```

## User Judgment Policy

If a PB markdown includes details that only appear in the same product's SPEC PDF, do not call it wrong automatically.

Ask the user to choose one policy:

1. Strict paired-PDF policy:
   - PB markdown only uses PB PDF details.
   - SPEC-only details are removed from PB markdown.
2. Product-level official-PDF policy:
   - PB markdown may include useful details from same-product SPEC PDF.
   - References must cite the SPEC PDF for those details.

Recommended default: Product-level official-PDF policy.

## Final Verification Before Commit

Run:

```bash
git status --short
git diff --stat
```

Check:

- No unsupported hard specs remain in corrected files.
- Vault spec/PB/category/matrix/index pages are synchronized.
- `user_judgment_needed.md` contains only real policy/ambiguity items, not formatting noise.
- `USER_JUDGMENT_NEEDED.md` contains only current user decisions, not resolved audit noise.
- `web-source.md` contains only verified official UROVO pages or blank URLs.
- Wiki links in `product-knowledge-vault/**/*.md` resolve to existing markdown files.
- `.DS_Store` and unrelated files were not touched intentionally.

## Commit And Tag

After user approval, commit:

```bash
git add <changed files>
git commit -m "sync: product docs YYYY-MM-DD"
git tag sync/YYYY-MM-DD
```

If multiple syncs happen in one day, use:

```bash
git tag sync/YYYY-MM-DD-01
git tag sync/YYYY-MM-DD-02
```

## Final Response To User

Report only:

- What changed.
- Which products were corrected.
- Which files were updated.
- Remaining user-judgment items.
- Audit summary.
- Commit/tag created, if applicable.

Do not dump raw audit noise unless asked.
