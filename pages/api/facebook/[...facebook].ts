import type { NextApiRequest, NextApiResponse } from "next";
import {
  instagramClient,
  instagramApiUrl,
  getUserMedia,
  instagramGraphClient,
  getProfile,
} from "lib/instagram";

import { getDomain } from "lib/vercel";
import { FacebookRerequestQueryParams } from "lib/facebook/types";
import {
  NextApiRequestWithToken,
  requireAuthentication,
  setInstagramUserIdCookie,
} from "lib/core/backend";
import { fbAccounts, fbPermissions } from "lib/facebook";

type Query = {
  facebook: string[];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { facebook } = req.query as Query;
  const route = facebook[0];
  const domain = getDomain();

  try {
    if (route === "rerequest") {
      // request additional permissions
      const params: FacebookRerequestQueryParams = {
        client_id: String(process.env.FACEBOOK_BUISINESS_APP_ID),
        redirect_uri: `https://${domain}/api/auth/callback/facebook`,
        auth_type: "rerequest",
        scope: "pages_show_list,instagram_basic,instagram_manage_comments",
      };
      const urlParams = new URLSearchParams(params);
      const url = new URL(
        `/v14.0/dialog/oauth?${urlParams.toString()}`,
        "https://www.facebook.com"
      );
      return res.status(307).redirect(url.toString());
    } else if (route === "permissions") {
      await requireAuthentication(req, res);
      const token = (req as NextApiRequestWithToken).token;
      if (token) {
        const { data } = await fbPermissions(token);
        if (data) {
          return res.json({ permissions: data.data });
        }
      }
    } else if (route === "accounts") {
      await requireAuthentication(req, res);
      const token = (req as NextApiRequestWithToken).token;
      if (!token) return;
      const R = await fbAccounts(token);
      let instagram_business_id = "";
      if (R.data.data) {
        R.data.data.some((account) => {
          if (account.instagram_business_account?.id) {
            instagram_business_id = account.instagram_business_account?.id;
            return true;
          }
          return false;
        });
      }
      if (instagram_business_id) {
        setInstagramUserIdCookie(res, instagram_business_id);
      }
      if (R.data.data) return res.json({ accounts: R.data.data });
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
