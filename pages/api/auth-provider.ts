import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionById, getUserAccount } from "lib/redis";
import { redisPrefix } from "app.contants";

import { sessionIdFromCookie } from "lib/core/backend";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionId = sessionIdFromCookie(req);
  if (sessionId) {
    const P = await getSessionById(sessionId, { prefix: redisPrefix }).then(
      (session) => {
        if (session?.userId) {
          return getUserAccount(session.userId, {
            prefix: redisPrefix,
          });
        }
      }
    );
    if (P) return res.status(200).json({ provider: P.provider });
  }
  res.status(200).json({ provider: null });
}
