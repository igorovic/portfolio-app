import { Redis, RedisConfigNodejs } from "@upstash/redis";
export const client = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
} as RedisConfigNodejs);
