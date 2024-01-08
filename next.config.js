/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  i18n: {
    locales: ["en-US", "ko-KR"], // Add the locales you need for your project
    defaultLocale: "ko-KR",
    localeDetection: false,
  },
};

module.exports = nextConfig;
