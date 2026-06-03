# SCHEMA.md — Product Knowledge Vault Schema

This file defines the wiki structure, conventions, and workflows for the UROVO Product Knowledge Base.

## Directory Structure

```
product-knowledge-vault/
├── SCHEMA.md          — this schema
├── index.md           — master catalog of all pages
├── web-source.md      — verified official UROVO web pages by product
├── log.md             — chronological operation log (append-only)
├── overview.md        — high-level synthesis of the entire product portfolio
├── synthesis.md       — key patterns, insights, and cross-product observations
├── spec/              — one specification page per product
├── pb/                — one brochure/marketing page per product
├── categories/        — product category overview pages
├── comparisons/       — comparative analysis across products
├── features/          — cross-cutting feature dimension pages
├── matrices/          — quantitative comparison matrices
├── technology/        — technology-specific deep-dive pages
└── entity/            — entity pages for key components (chipsets, scan engines, etc.)
```

## Page Naming Conventions

- Product pages: `spec/<ProductName>.md`, `pb/<ProductName>.md`
- Category pages: `categories/<category-name>.md`
- Comparison pages: `comparisons/<group-name>-comparison.md`
- Feature pages: `features/<feature-name>.md`
- Technology pages: `technology/<tech-name>.md`
- Entity pages: `entity/<entity-name>.md`

## Page Content Standards

### Product Spec Pages (spec/)

Format:

```markdown
# <Product Name> — <Type Tagline>

## Overview

[One-paragraph summary of the product's purpose and key positioning]

## Specifications

[Structured tables organized by: Performance → Physical → Display → Power → Data Capture → Connectivity → Durability → Accessories]

## Key Differentiators

[What makes this product unique in its category]

## Target Industries

[Industries this product serves]

## Related Products

[Links to comparison pages or sibling products]
```

### Product Brochure Pages (pb/)

Format:

```markdown
# <Product Name>

## Product Highlights

[Tagline bar with key stats]

## Key Features

[Feature sections with descriptive paragraphs]

## Specifications

[Essential specs table]

## Accessories

[Accessories list if applicable]

## Target Industries
```

### Category Pages

Format:

```markdown
# <Category Name>

## Overview

[What defines this category, typical use cases]

## Products in this Category

[Table with models, generations, key differences]

## Key Technologies

[Technologies prevalent in this category]

## Cross-Reference

[Links to comparison pages, feature pages]
```

## Operations

### Ingest

When a new product document is added to the raw sources, the LLM should:

1. Read the source document
2. Create/update spec/[product].md and pb/[product].md
3. Update the relevant category page
4. Update any comparison pages that include this product
5. Update feature pages if the product introduces new capabilities
6. Update index.md with the new pages
7. Update web-source.md if an official UROVO web page can be verified
8. Append to log.md

### Query

- Read index.md first to locate relevant pages
- Drill into specific pages for detailed answers
- For cross-product questions, use comparison pages and matrices
- Read web-source.md for products in scope and include verified official web pages as auxiliary context when answering.
- For hard specifications, tender language, and precise product comparisons, verify against the relevant local PDF/source markdown before treating a value as authoritative.
- If a verified official web page differs from local PDF/vault data, do not silently merge the values. Mention the discrepancy when relevant and record it through the sync conflict workflow.
- All substantive answers may be filed back as new wiki pages

### Official Web Sources

`web-source.md` is the vault's index of verified official UROVO product web pages.

Format:

```markdown
| Product | Official URL | Page Type | Verification Method | Notes |
| --- | --- | --- | --- | --- |
| DT610 | https://en.urovo.com/products/rfid-data/DT610-.html | product-page | Opened official page | Official URL includes trailing hyphen before `.html`. |
```

Allowed page types:

- `product-page`: independent product or product-series page.
- `category-page`: official category/listing page that clearly contains the product.
- `news-page`: official UROVO news page that explicitly names the product.

Source hierarchy:

1. Local official PDFs and paired source markdown are the primary source of truth.
2. Vault pages summarize the local source documents.
3. Official web pages are auxiliary context and conflict-detection sources.

When web and local sources disagree:

- Do not overwrite PDF-backed values from a web page alone.
- Record the machine-readable finding in `sync/web_conflicts.json`.
- Record the human-readable summary in `WEB_VS_LOCAL_CONFLICTS.md`.
- Put unresolved policy or product-owner questions in root-level `USER_JUDGMENT_NEEDED.md`.

## Link Format

Use relative wiki links: `[[spec/CT48|CT48 Specification]]` or `[CT48](spec/CT48.md)`.

Wiki links must point to real markdown pages in `product-knowledge-vault/`. Use the actual filename, including hyphens and case:

- Correct: `[[spec/DT50P-Lite|DT50P Lite]]`
- Incorrect target text: `spec/DT50P Lite`

When a specific category page does not exist, link to the closest existing aggregate page instead of inventing a broken page. For example, enterprise tablets, wearables, RFID sleds, and price checkers currently link to `[[categories/other-devices|Other Devices]]`.

## Frontmatter

Optional YAML frontmatter on key pages for metadata:

```yaml
---
category: handheld-terminal
generation: current
os: Android 12
rfid: HF/NFC
ip_rating: IP67
---
```
