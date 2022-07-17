import axios from "axios";
import { FacebookAccountResponse, PermissionsResponse } from "./types";

export const facebookGraphUri = "https://graph.facebook.com/v14.0";
export const facebookClient = axios.create({
  baseURL: facebookGraphUri,
});

export async function fbPermissions(access_token: string) {
  return facebookClient.get<PermissionsResponse>("/me/permissions", {
    params: { access_token },
  });
}

export async function fbAccounts(access_token: string) {
  return facebookClient.get<FacebookAccountResponse>("/me/accounts", {
    params: {
      access_token,
      fields: "instagram_business_account,name,id,category_list,category,tasks",
    },
  });
}
