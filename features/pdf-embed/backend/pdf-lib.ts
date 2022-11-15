import { PDFDocument } from "pdf-lib";
import { FieldInfo } from "../types";
export type PDFInfo = {
  page: { width: number; height: number };
  fields: FieldInfo[];
};
export async function pdfInfo(buf: Buffer): Promise<PDFInfo> {
  const doc = await PDFDocument.load(buf);
  const page0 = await doc.getPage(0);
  const pageSize = page0.getSize();
  const form = doc.getForm();
  const fields = form.getFields();
  let _fields = fields.map((F) => {
    const type = F.constructor.name;
    const name = F.getName();
    const widgets = F.acroField.getWidgets();
    const [widget] = widgets;

    //const ac = widget.getAppearanceCharacteristics();

    const rect = widget.getRectangle();
    let pageIndex = 0;
    widgets.forEach((w) => {
      // found here https://github.com/Hopding/pdf-lib/issues/1090#issuecomment-970910486
      // but the result does not seem consistent
      // TODO: analyze and better understand this code
      pageIndex = doc.getPages().findIndex((p) => p.ref === w.P());
    });

    return {
      pageIndex,
      type,
      name,
      rect,
    };
  });
  _fields = _fields.filter((F) => {
    if (F.pageIndex === 0) {
      return true;
    } else {
      console.debug(F);
    }
    return false;
  });
  return { page: pageSize, fields: _fields };
}
