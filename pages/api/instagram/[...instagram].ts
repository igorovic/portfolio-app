import type { NextApiRequest, NextApiResponse } from "next";
import {
  instagramClient,
  instagramApiUrl,
  getUserMedia,
  instagramGraphClient,
  getProfile,
} from "lib/instagram";

import { getDomain } from "lib/vercel";
import {
  InstagramAuthorizeQueryParams,
  InstagramAccessTokenQueryParams,
  InstagramAccessTokenResponse,
  InstagramLonglivedAccessToeknQueryParams,
} from "lib/instagram/types";
import cookie from "cookie";
import { logtail } from "lib/logtail";
import {
  instagramAccessTokenCookieName,
  instagramUidCookieName,
} from "app.contants";
import { setInstagramUserIdCookie } from "lib/core/backend";
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

  const domain = getDomain();
  try {
    if (route === "authorize") {
      const params: InstagramAuthorizeQueryParams = {
        client_id: String(process.env.INSTAGRAM_APP_ID),
        redirect_uri: `https://${domain}/api/instagram/callback`,
        scope: "user_profile,user_media",
        response_type: "code",
        state: "1",
      };
      logtail.debug("instagram authorize", {
        InstagramAuthorizeQueryParams: params,
      });
      const urlParams = new URLSearchParams(params);
      const url = new URL(
        `/oauth/authorize?${urlParams.toString()}`,
        instagramApiUrl
      );
      return res.status(302).redirect(url.toString());
    } else if (route === "callback") {
      if (code) {
        const body: InstagramAccessTokenQueryParams = {
          client_id: String(process.env.INSTAGRAM_APP_ID),
          client_secret: String(process.env.INSTAGRAM_SECRET),
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
          const params: InstagramLonglivedAccessToeknQueryParams = {
            grant_type: "ig_exchange_token",
            client_secret: String(process.env.INSTAGRAM_SECRET),
            access_token: R.data.access_token,
          };
          const A = await instagramGraphClient.get("/access_token", { params });

          if (A.data) {
            const { access_token, expires_in } = A.data;
            setInstagramUserIdCookie(res, String(R.data?.user_id));

            const instaTokenCookie = cookie.serialize(
              instagramAccessTokenCookieName,
              access_token,
              {
                secure: true,
                httpOnly: true,
                path: "/",
                expires: new Date(
                  new Date().getTime() + (expires_in - 600) * 1000
                ),
              }
            );

            res.setHeader("Set-Cookie", instaTokenCookie);
            return res.status(302).redirect("/app/instagram");
          }
        }
      }
    } else if (route === "mymedia") {
      const instagramUid = req.cookies[instagramUidCookieName] ?? "";
      const instagramToken = req.cookies[instagramAccessTokenCookieName] ?? "";

      if (!instagramToken) {
        return res.json({
          error: "Missing Instagram access token",
          code: "ACCESSTOKEN_MISSING",
        });
      }
      const media = await getUserMedia(instagramUid, instagramToken || "");
      return res.json({ data: media });
    } else if (route === "me") {
      const instagramToken = req.cookies[instagramAccessTokenCookieName] ?? "";

      if (!instagramToken) {
        return res.json({
          error: "Missing Instagram access token",
          code: "ACCESSTOKEN_MISSING",
        });
      }
      const { data } = await getProfile(instagramToken);
      return res.json({ data });
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
