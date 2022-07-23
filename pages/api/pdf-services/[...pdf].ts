import fs from "node:fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDomain } from "lib/vercel";
import { pdfExtract } from "features/pdf-embed/backend/extract";

type Query = {
  pdf: string[];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { pdf } = req.query as Query;
  const route = pdf[0];

  const domain = getDomain();
  console.debug(pdf);
  try {
    const result = await pdfExtract();
    const data = fs.readFileSync(result.input.asStream.path, {
      encoding: "binary",
    });

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=file.zip");
    res.setHeader("Content-Length", data.length);
    return res.end(data, "binary");
  } catch (err: any) {
    console.debug(err?.response?.data);
    return res.json({
      error: err?.title,
      errorDetails: err?.error,
    });
  }
}
