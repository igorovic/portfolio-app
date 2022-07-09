import { redisPrefix } from "contants";
export const instagramAccessTokenKey = (sessionCookie: string) =>
  `${redisPrefix}instagram:${sessionCookie}:access_token`;
