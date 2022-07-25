//@ts-check
import path from "node:path";
import fs from "node:fs";
import { PDFDocument } from "pdf-lib";
/**
 * 
 * @param {string} project_relative_file_path 
 * @returns {any}
 */
export function readFile(project_relative_file_path) {
  const filePath = path.resolve(project_relative_file_path);
  return fs.readFileSync(filePath);
}

async function main() {
  const buf = readFile("./features/pdf-embed/oiken_v1.pdf")
  const doc = await PDFDocument.load(buf)
  const page0 = await doc.getPage(0)
  console.debug(page0)
  const form = doc.getForm()
  const fields = form.getFields()
  fields.forEach((F) => {
    const [widget] = F.acroField.getWidgets();
    console.debug(widget)
  })
}

main().then(() => console.log("DONE"))