import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath =
  "/Users/patrickxu/Library/Containers/com.tencent.WeWorkMac/Data/Documents/Profiles/F832916775EB1B5F9EC73AE338B3F95D/Caches/Files/2026-06/bcf7b1ef17349cf146c46f529477a0f2/New POS_Hardware Requirement V.02 - Mobility.xlsx";
const outputDir = "/Users/patrickxu/product-documents/outputs/mobile_pos_tor";
const outputPath = `${outputDir}/New POS_Hardware Requirement V.02 - Mobility_UROVO_response.xlsx`;

const CS = "Comply-Standard";
const CO = "Comply-Other (Please Explain)";
const NC = "Not-Comply";

const modular = [
  [5, CS, "Proposed equipment is commercial/enterprise class: UROVO DT66 rugged mobile computer, K329 mobile thermal printer, and K180 wireless barcode scanner."],
  [6, CS, "Proposed mobile POS set supports retail operation: Android DT66 terminal with K329 receipt printer and K180 barcode scanner."],
  [7, CS, "DT66 runs Android 13.0 GMS/AER and supports Android application deployment."],
  [9, CS, "DT66: Android 13.0, GMS/AER."],
  [10, CS, "DT66: Octa-core 2.4 GHz processor."],
  [11, CS, "DT66 offered configuration: 8 GB RAM + 128 GB ROM."],
  [12, CS, "DT66 offered configuration: 8 GB RAM + 128 GB ROM."],
  [15, CS, "DT66: Wi-Fi 6E, IEEE 802.11 a/b/g/n/ac/ax, 2.4G/5G/6G tri-band."],
  [16, CS, "DT66: Bluetooth 5.2 + BR/EDR + BLE."],
  [17, CS, "DT66: 5G/4G/3G/2G; Nano-SIM x2; eSIM reserved."],
  [18, CO, "DT66 hardware supports Bluetooth 5.2 and USB Type-C. External EDC integration to be verified with the client's EDC system."],
  [19, CS, "DT66: 6.5 inch display."],
  [20, CS, "DT66: ultra-sensitive capacitive touch panel, multi-touch."],
  [21, CS, "DT66: 720 x 1600 display resolution."],
  [24, CS, "K329: thermal line printing mobile printer with Bluetooth 5.0 optional configuration."],
  [25, CS, "K329: Bluetooth 5.0 optional configuration."],
  [26, CS, "K329: print speed up to 120 mm/s."],
  [27, CS, "K329: media width 30-80 mm."],
  [29, CS, "K329: supports receipts and labels."],
  [30, CO, "K329 supports ESC/POS instruction set. Client POS software integration to be verified."],
  [31, CS, "K329: tearing blade for easy tear-off."],
  [41, CS, "K180: dedicated wireless barcode scanner with 1280 x 1080 CMOS image sensor."],
  [42, CS, "K180: Bluetooth 5.2 portable wireless scanner, 95 g."],
  [43, CO, "K180 source confirms 1D/2D decoding. QR/GS1 support is not explicitly stated in the available specification."],
  [44, CO, "K180 source confirms damaged, distorted, laminated, screen-displayed, and low-contrast barcode reading. Reflective barcode reading is not explicitly stated."],
  [45, CS, "K180: physical Scan button."],
  [46, CS, "K180: millisecond decoding with professional scan engine."],
  [48, CS, "K180: buzzer, LED indicators, and vibration motor."],
  [53, CO, "DT66 hardware supports Bluetooth 5.2 and USB Type-C. External EDC integration to be verified with the client's EDC system."],
  [56, CS, "DT66 supports Wi-Fi 6E and 5G/4G/3G/2G cellular connectivity."],
  [67, CS, "DT66 weight is approximately 283 g including battery."],
  [68, CS, "DT66 supports multiple 1.5 m drops to concrete; K329 supports 1.5 m drop; K180 supports 1.2 m drop."],
];

const allInOne = [
  [91, CS, "i9000S is a rugged smart POS payment terminal with PCI/EMV certification."],
  [92, CS, "i9000S is a smart POS payment terminal for payment processing and retail POS scenarios."],
  [95, CS, "i9000S: Android 13."],
  [96, CS, "i9000S: Octa-core 2.0 GHz processor."],
  [97, NC, "i9000S: RAM is 3 GB; TOR requires at least 4 GB."],
  [98, NC, "i9000S: ROM is 32 GB; TOR requires at least 64 GB."],
  [101, CS, "i9000S: IEEE 802.11 a/b/g/n/ac, 2.4G/5G."],
  [102, CS, "i9000S: Bluetooth 5.0."],
  [103, CS, "i9000S: FDD-LTE/TDD-LTE/WCDMA/GSM; SIM x1 + PSAM x1 + SIM/SAM x1; eSIM option."],
  [104, CO, "i9000S hardware supports Bluetooth 5.0 and Type-C USB. External EDC integration to be verified with the client's EDC system."],
  [105, NC, "i9000S display is 5.0 inch; TOR requires at least 5.5 inch or equivalent."],
  [107, CS, "i9000S: 720 x 1280 display resolution."],
  [110, CS, "i9000S: built-in thermal printer."],
  [111, CS, "i9000S printer: 203 DPI."],
  [112, NC, "i9000S print speed is 50-70 mm/s; TOR requires at least 90 mm/s."],
  [113, CS, "i9000S printer media width: 58 mm."],
  [114, CS, "i9000S has integrated 58 mm receipt printer."],
  [118, CS, "i9000S supports optional 2D scan engine; proposed configuration includes the 2D scan engine."],
  [123, CO, "i9000S hardware supports Bluetooth 5.0 and Type-C USB. External EDC integration to be verified with the client's EDC system."],
  [126, CS, "i9000S supports Wi-Fi and cellular connectivity."],
  [131, NC, "i9000S adapter output is 5V/2A (10W); TOR requires at least 15W charging power."],
  [137, CS, "i9000S weight is 521 g."],
  [138, CS, "i9000S supports 1.5 m drop resistance."],
  [144, CO, "i9000S supports contactless NFC payment and lists PCI, EMV L1/L2, EMV Contactless L1, PayWave, PayPass, and American Express Expresspay. PCI-DSS is not explicitly stated in the available specification."],
];

function fillSheet(workbook, sheetName, responseCol, remarkCol) {
  const sheet = workbook.worksheets.getItem(sheetName);
  for (const [row, response, remark] of [...modular, ...allInOne]) {
    sheet.getRange(`${responseCol}${row}`).values = [[response]];
    sheet.getRange(`${remarkCol}${row}`).values = [[remark]];
  }
}

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

fillSheet(workbook, "Mobile POS Android", "G", "H");
fillSheet(workbook, "Mobile POS Android V2", "E", "F");

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
