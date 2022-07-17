import { Redis, RedisConfigNodejs } from "@upstash/redis";
import { Maybe } from "types";

export type Options = {
  prefix: string;
};
export type UserSession = {
  id: string;
  sesstionToken: string;
  userId: string;
  expires: string;
};

export type Account = {
  provider: string;
  access_token: string;
};

export const client = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
} as RedisConfigNodejs);

export async function getSessionById(
  sessionId: string,
  options: Options = { prefix: "" }
) {
  const key = `${options.prefix}user:session:${sessionId}`;
  return client.get<Maybe<UserSession>>(key);
}
export async function getUserAccount(
  userId: string,
  options: Options = { prefix: "" }
) {
  const key = `${options.prefix}user:account:by-user-id:${userId}`;
  return client.get<string>(key).then((accountKey) => {
    if (accountKey) {
      return client.get<Account>(accountKey);
    }
  });
}

export async function getSessionAccessToken(
  sessionId: string,
  options: Options = { prefix: "" }
) {
  const account = await getSessionById(sessionId, options).then((session) => {
    if (session?.userId) {
      return getUserAccount(session.userId, options);
    }
  });
  if (account) {
    return account.access_token;
  }
}
