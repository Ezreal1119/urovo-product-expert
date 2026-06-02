# CLAUDE.md — Product Knowledge Vault Schema

This file defines the wiki structure, conventions, and workflows for the UROVO Product Knowledge Base.

## Directory Structure

```
product-knowledge-vault/
├── CLAUDE.md          — this schema
├── index.md           — master catalog of all pages
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
7. Append to log.md

### Query
- Read index.md first to locate relevant pages
- Drill into specific pages for detailed answers
- For cross-product questions, use comparison pages and matrices
- All substantive answers may be filed back as new wiki pages

## Link Format
Use relative wiki links: `[[spec/CT48|CT48 Specification]]` or `[CT48](spec/CT48.md)`.

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
