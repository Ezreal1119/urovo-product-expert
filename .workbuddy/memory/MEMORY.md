# Project Memory - Product Documents

## Workspace Structure
- 46 product folders under `/Users/patrickxu/product-documents/`
- Each folder = one product (CT48, DT50, i9000S, K329, etc.)
- Each folder contains original PDF/PPTX + corresponding .md file
- Some folders also have `images/` subfolder with extracted images

## Document Types
- **SPEC** (specification): Detailed parameter tables (OS, CPU, display, battery, network, etc.)
- **PB** (product brochure): Marketing-oriented, visual layouts with feature highlights
- **Product Spec Sheet**: A hybrid — no bordered tables, uses text+layout grids (DT50-Pro, DT610/Pro, DT630, K389, RFG91, SR5750, UPad)

## Conversion Method (v4 - Final)
- **Primary**: PyMuPDF `find_tables()` for table extraction (best spacing + merged cell handling)
- **Fallback**: Text extraction via PyMuPDF `get_text()` for borderless-grid Spec Sheets
- **OCR**: Tesseract at 150 DPI for pure-image PDFs (6 files)
- **PPTX**: python-pptx for direct extraction

## Semantic Optimization (v5 - Manual, all 82 files)
- Each file individually read, understood, and rewritten
- Section organization: logical product categories (Performance → Physical → Display → Power → Data Capture → Connectivity → Durability → Accessories)
- Fragmented content merged, empty columns removed, boilerplate stripped
- Product highlights and key features added where source content permitted

## Key Products (by actual category)
- **Handheld Terminals**: CT48/48C, CT58/58C/58S, DT40, DT50/50D/50P/50P Lite, DT66, RT30, RT40S, i5300/5300L
- **Enterprise Smartphones**: DT50-Pro, DT610, DT610 Pro, DT630
- **Wearable Computers**: U2S, SR5750
- **Wearable Scanners**: SR5600, SR5600 V2
- **Barcode Scanners**: K180 (wireless ring), K200 (wired), K220 (wireless with base), S710 (desktop)
- **POS Terminals**: i9000S, i9100, i9200, i9600, K388 Pro (labeling)
- **Mobile Printers**: K329, K389, K419
- **Desktop Printers**: D8100 plus (thermal transfer), D81R Series (RFID thermal transfer)
- **Fixed RFID Readers**: FR1000 (box), FR2000 (desktop pad), FR7000 Series (antenna)
- **RFID Sled**: RFG91
- **Enterprise Tablets**: P8100 4G, P8100P 4G/5G, UPad
- **Price Checker**: U100
