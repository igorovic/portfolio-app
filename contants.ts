export const repositoryUrl = "https://github.com/igorovic/portfolio-app";
export const redisPrefix = `portfolio:${
  process.env.VERCEL ? String(process.env.VERCEL_ENV).slice(0, 3) : "local"
}:`;
