import { Client, auth } from "twitter-api-sdk";

export const client = new Client(
  new auth.OAuth2Bearer(String(process.env.TWITTER_BEARER))
);
