import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { getDomain } from "lib/vercel";
import { pdfInfo } from "features/pdf-embed/backend/pdf-lib";

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
  console.debug(req.body);
  console.debug(req.headers);
  try {
    return res.end();
  } catch (err: any) {
    console.error(err);
    return res.json({
      error: err?.title,
      errorDetails: err?.error,
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
