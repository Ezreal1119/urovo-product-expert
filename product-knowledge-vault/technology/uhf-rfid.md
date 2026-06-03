# UHF RFID Technology

Ultra-High Frequency RFID (840–960 MHz) is deployed across UROVO's product line from handhelds to fixed infrastructure readers.

## Technology Stack

| Layer | Specification |
| --- | --- |
| Chipset | Impinj E710 ([[entity/impinj-e710|details]]) |
| Protocol | ISO18000-6C (EPC Class1 Gen2) |
| Frequency | 840–960 MHz (region-adjustable) |
| Power | Up to 33 dBm |
| Gen2X | Enhanced read algorithms on latest models |

## Implementation Matrix

| Product | Form Factor | Range | Tags/sec | Antenna | Gen2X |
| --- | --- | --- | --- | --- | --- |
| [[spec/DT50P|DT50P]] | Pistol grip | 20 m | 1,300+ | 5 dBi int. | — |
| [[spec/DT50P-Lite|DT50P Lite]] | Pistol grip | 15 m | 1,300+ | Int. | ✓ |
| [[spec/DT50D|DT50D]] | Handheld | 1.5 m | — | Int. | — |
| [[spec/DT610|DT610]] | Smartphone | 1.5 m | 50+ | Int. | ✓ |
| [[spec/DT610-Pro|DT610 Pro]] | Smartphone | 1.5 m | 50+ | Int. | ✓ |
| [[spec/RFG91|RFG91]] | Sled | 15 m+ | 1,300+ | Int. | ✓ |
| [[spec/FR1000|FR1000]] | Fixed box | Ext. | 1,300+ | 8× SMA ext. | — |
| [[spec/FR2000|FR2000]] | Desktop pad | <50 cm | — | Built-in | — |
| [[spec/FR7000-Series|FR7000 Series]] | Fixed antenna | 7–12 m | 1,300+ | 6/9 dBi ext. | — |
| [[spec/D81R-Series|D81R Series]] | Desktop printer | — | — | Int. | — |

## Range Tiers

| Tier | Range | Products | Use Case |
| --- | --- | --- | --- |
| Close-proximity | <50 cm | FR2000 | Item checkout/count |
| Short-range | 1.5 m | DT50D, DT610, DT610 Pro | Handheld inventory |
| Mid-range | 7–12 m | FR7000, DT50P Lite | Warehouse portals |
| Long-range | 15–20 m | DT50P, RFG91 | Asset tracking, yard mgmt |

## HF vs UHF

UROVO also supports HF/NFC (13.56 MHz) on many handhelds. Some products like [[spec/DT50P-Lite|DT50P Lite]] offer dual HF+UHF.

## Related Pages

- [[entity/impinj-e710|Impinj E710 Chipset]]
- [[categories/desktop-printer|Fixed RFID Readers]]
- [[categories/desktop-printer|Desktop Printers & Fixed RFID]]
