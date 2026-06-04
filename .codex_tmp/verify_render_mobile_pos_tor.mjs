import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputDir = "/Users/patrickxu/product-documents/outputs/mobile_pos_tor";
const outputPath = `${outputDir}/New POS_Hardware Requirement V.02 - Mobility_UROVO_response.xlsx`;

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));

for (const [sheetName, range] of [
  ["Mobile POS Android", "A1:H241"],
  ["Mobile POS Android V2", "A1:F225"],
]) {
  const preview = await workbook.render({
    sheetName,
    range,
    scale: 1,
    format: "png",
  });
  await fs.writeFile(
    `${outputDir}/${sheetName.replaceAll(" ", "_")}_preview.png`,
    new Uint8Array(await preview.arrayBuffer()),
  );
}

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);
