export interface InstagramAuthorizeQueryParams extends Record<string, string> {
  client_id: string;
  redirect_uri: string;
  scope: string;
  response_type: "code";
  state: string;
}

export interface InstagramAccessTokenQueryParams
  extends Record<string, string> {
  client_id: string;
  redirect_uri: string;
  client_secret: string;
  code: string;
  grant_type: "authorization_code";
}

export interface InstagramAccessTokenResponse {
  access_token?: string;
  user_id?: number;
}
