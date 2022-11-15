import type { NextApiRequest, NextApiResponse } from "next";
import { getDomain } from "lib/vercel";
import { client } from "lib/twitter";
type Query = {
  twitter: string[];
  code?: string;
  state?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { twitter } = req.query as Query;
  const route = twitter[0];

  const domain = getDomain();
  console.debug(twitter);
  try {
    if (route === "get") {
      if (!(twitter.length === 2)) {
        return res.json({ error: "missing tweet id" });
      }
      const tweetId = twitter[1];

      const tweet = await client.tweets.findTweetById(
        tweetId,
        {
          expansions: ["attachments.media_keys"],
          "media.fields": ["variants", "width", "height", "preview_image_url"],
        },
        { headers: { "User-Agent": "demo.dyve.ch" } }
      );
      console.debug(tweet);
      return res.json(tweet);
    }
  } catch (err: any) {
    console.debug(err?.response?.data);
    return res.json({
      error: err?.title,
      errorDetails: err?.error,
    });
  }
}
