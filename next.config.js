const { i18n } = require("./next-i18next.config");

const isDev = String(process.env.NODE_ENV).toLowerCase().startsWith("dev");
console.log("next.config development:", isDev, "env:", process.env.NODE_ENV);

/** @type {import('next').NextConfig} */
let config = {
  i18n,
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: !isDev,
  },
  publicRuntimeConfig: {
    isDev,
    DEBUG_NAMESPACES: String(process.env.DEBUG_NAMESPACES),
    CYPRESS: process.env.CYPRESS,
  },
};

if (!isDev) {
  config = {
    ...config,
    compiler: {
      ...config.compiler,
      removeConsole: {
        exclude: ["error"],
      },
    },
  };
}

module.exports = config;
