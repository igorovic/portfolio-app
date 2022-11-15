import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "node:crypto";
import multer from "multer";
import { pdfInfo } from "features/pdf-embed/backend/pdf-lib";
import { Maybe } from "types";
import { airtable } from "lib/airtable";

const storage = multer.memoryStorage();
const multerMiddlware = multer({ storage: storage });
const AirtableTableName = "pdfs";
type Query = {};
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (...args: any) => any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await runMiddleware(req, res, multerMiddlware.single("pdf"));
    const _req = req as NextApiRequest & { file?: Maybe<Express.Multer.File> };

    if (_req.file) {
      const result = await pdfInfo(_req.file.buffer);
      return res.json({ result });
    }
  } catch (err: any) {
    console.error(err);
    return res.json({
      error: err?.title,
      errorDetails: err?.error,
    });
  }
  return res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
