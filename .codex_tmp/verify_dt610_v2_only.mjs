import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputPath = "/Users/patrickxu/product-documents/outputs/mobile_pos_tor/New POS_Hardware Requirement V.02 - Mobility_UROVO_DT610_V2_only.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const sheets = await workbook.inspect({
  kind: "sheet",
  include: "id,name",
  maxChars: 2000,
});
console.log(sheets.ndjson);
const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);
