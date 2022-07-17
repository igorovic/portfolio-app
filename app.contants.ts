export const repositoryUrl = "https://github.com/igorovic/portfolio-app";
export const instagramUidCookieName = "dyve-instagram-uid";
export const instagramAccessTokenCookieName = "dyve.instagram-token";
export const redisPrefix = `portfolio:${
  process.env.VERCEL ? String(process.env.VERCEL_ENV).slice(0, 4) : "local"
}:`;
