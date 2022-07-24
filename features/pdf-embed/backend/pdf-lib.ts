import { PDFDocument } from "pdf-lib";
import { FieldInfo } from "../types";
export type PDFInfo = {
  page: { width: number; height: number };
  fields: FieldInfo[];
};
export async function pdfInfo(buf: Buffer): Promise<PDFInfo> {
  const pdfDoc = await PDFDocument.load(buf);
  const page0 = await pdfDoc.getPage(0);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  const _fields = fields.map((F) => {
    const type = F.constructor.name;
    const name = F.getName();
    const [widget] = F.acroField.getWidgets();

    const ac = widget.getAppearanceCharacteristics();

    // console.debug(`${type}: ${name}`);
    // console.debug(widget.getRectangle());
    // console.debug("appearance", ac);
    return {
      type,
      name,
      rect: widget.getRectangle(),
    };
  });
  return { page: page0.getSize(), fields: _fields };
}
