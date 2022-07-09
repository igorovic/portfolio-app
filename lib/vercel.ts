export function getDomain() {
  if (process.env.VERCEL === "1") {
    if (process.env.VERCEL_ENV === "production") {
      if (process.env.DOMAIN) {
        return process.env.DOMAIN;
      } else {
        return process.env.VERCEL_URL;
      }
    } else {
      return process.env.VERCEL_URL;
    }
  } else {
    return "localhost";
  }
}
