const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ["en-US", "ru-RU", "be-BE"],
        /**
         * This is the default locale you want to be used when visiting
         * a non-locale prefixed path.
         */
        defaultLocale: "be-BE",
      },
};

module.exports = nextConfig;
