module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'fr'],
    },
    reloadOnPrerender: String(process.env.NODE_ENV)
        .toLowerCase()
        .startsWith("dev")

};