import { instagramUidCookieName, redisPrefix } from "app.contants";
import { getSessionAccessToken } from "lib/redis";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
export type NextApiRequestWithToken = NextApiRequest & {
  token?: string | null;
};

export function sessionIdFromCookie(req: NextApiRequest) {
  return (
    req.cookies["__Secure-next-auth.session-token"] ||
    req.cookies["next-auth.session-token"]
  );
}

export function setInstagramUserIdCookie(res: NextApiResponse, userId: string) {
  const instaUserCookie = cookie.serialize(instagramUidCookieName, userId, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });
  res.setHeader("Set-Cookie", instaUserCookie);
}

/**
 * TODO: this should be a middleware
 */
export async function requireAuthentication(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionId = sessionIdFromCookie(req);
  if (!sessionId) {
    return res.status(403).json("Authentication required");
  }

  const token = await getSessionAccessToken(sessionId, {
    prefix: redisPrefix,
  });
  if (!token) {
    return res.status(403).json("Authentication required");
  } else {
    Object.assign(req, { token });
  }
}
