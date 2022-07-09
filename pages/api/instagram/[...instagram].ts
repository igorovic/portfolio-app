import type { NextApiRequest, NextApiResponse } from "next";
import { instagramClient, instagramApiUrl, getUserMedia } from "lib/instagram";
import { client as upstash } from "lib/redis";
import { getDomain } from "lib/vercel";
import {
  InstagramAuthorizeQueryParams,
  InstagramAccessTokenQueryParams,
  InstagramAccessTokenResponse,
} from "lib/instagram/types";
import cookie from "cookie";
import { instagramAccessTokenKey } from "lib/instagram/utils";
type Query = {
  instagram: string[];
  code?: string;
  state?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { instagram, code } = req.query as Query;
  const route = instagram[0];
  const sessionCookie = req.cookies["next-auth.session-token"];
  const instagramUidCookieName = "dyve-instagram-uid";
  const domain = getDomain();
  try {
    if (route === "authorize") {
      const params: InstagramAuthorizeQueryParams = {
        client_id: process.env.INSTAGRAM_APP_ID ?? "",
        redirect_uri: `https://${domain}/api/instagram/callback`,
        scope: "user_profile,user_media",
        response_type: "code",
        state: "1",
      };
      const urlParams = new URLSearchParams(params);
      const url = new URL(
        `/oauth/authorize?${urlParams.toString()}`,
        instagramApiUrl
      );
      return res.status(302).redirect(url.toString());
    } else if (route === "callback") {
      if (code && sessionCookie) {
        const body: InstagramAccessTokenQueryParams = {
          client_id: process.env.INSTAGRAM_APP_ID ?? "",
          client_secret: process.env.INSTAGRAM_SECRET ?? "",
          redirect_uri: `https://${domain}/api/instagram/callback`,
          code,
          grant_type: "authorization_code",
        };
        // get access token
        const R = await instagramClient.post<InstagramAccessTokenResponse>(
          "/oauth/access_token",
          body,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (R.data?.access_token) {
          await upstash.set(
            instagramAccessTokenKey(sessionCookie),
            R.data.access_token,
            {
              ex: 3600,
            }
          );
          const instacookie = cookie.serialize(
            instagramUidCookieName,
            String(R.data?.user_id),
            {
              httpOnly: false,
              sameSite: "lax",
              path: "/",
            }
          );

          res.setHeader("Set-Cookie", instacookie);
          return res.status(302).redirect("/app/instagram");
        }
      }
    } else if (route === "mymedia") {
      if (sessionCookie) {
        const instagramUid = req.cookies[instagramUidCookieName] ?? "";
        const access_token = await upstash.get<string>(
          instagramAccessTokenKey(sessionCookie)
        );
        if (!access_token) {
          return res.json({
            error: "Missing Instagram access token",
            code: "ACCESSTOKEN_MISSING",
          });
        }
        const media = await getUserMedia(instagramUid, access_token || "");
        return res.json({ data: media });
      } else {
        return res.status(400).json({
          error: "This api requires authentication",
          code: "AUTHENTICATION_REQUIRED",
        });
      }
    }
  } catch (err: any) {
    console.debug(err?.response?.data);
    return res.json({
      error: err.message,
      errorDetails: err?.response?.data?.error?.message,
    });
  }

  res.status(302).redirect("/app/instagram");
}
