import fs from "node:fs";
import path from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";

type Query = {
  zip: string[];
  file?: string;
};
const availableFiles = ["archive1"];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { zip, file } = req.query as Query;
  const route = zip[0];

  try {
    if (route === "download") {
      if (file && availableFiles.includes(file)) {
        const data = fs.readFileSync(
          path.resolve(`./pages/api/zip/data/${file}.zip`),
          {
            encoding: "binary",
          }
        );

        res.setHeader("Content-Type", "application/zip");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${file}.zip`
        );
        res.setHeader("Content-Length", data.length);
        return res.end(data, "binary");
      } else {
        return res.json("unknown file");
      }
    }
  } catch (err: any) {
    console.error(err);
  }
  return res.end();
}
