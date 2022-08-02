import type { NextApiRequest, NextApiResponse } from "next";
import { Maybe } from "types";
import { RetrieveAndConvert } from "features/gif-to-mp4/backend";

interface Data {
  url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(req.method === "POST")) return res.end();
  const body = req.body ? (JSON.parse(req.body) as Maybe<Data>) : null;
  if (body?.url) {
    try {
      return res.json(await RetrieveAndConvert(body.url));
    } catch (err) {
      console.error(err);
    }
  }
  return res.end();
}
