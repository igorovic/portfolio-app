import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";

import GitHubProvider from "next-auth/providers/github";

import { client as redis } from "lib/redis";
import { redisPrefix } from "contants";

export default NextAuth({
  adapter: UpstashRedisAdapter(redis, {
    baseKeyPrefix: redisPrefix,
  }),
  providers: [
    // OAuth authentication providers...
    /* AppleProvider({
      clientId: process.env.APPLE_ID ?? "",
      clientSecret: process.env.APPLE_SECRET ?? "",
    }), */
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    // Passwordless / email sign in
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
