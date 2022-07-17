import { redisPrefix } from "app.contants";
export const instagramAccessTokenKey = (sessionCookie: string) =>
  `${redisPrefix}instagram:${sessionCookie}:access_token`;
