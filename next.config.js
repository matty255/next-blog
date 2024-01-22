// next.config.js

module.exports = {
  async rewrites() {
    return [
      {
        source: '/radio/:path*', // 요청 경로
        destination: '/posts/radio/:path*', // 실제 파일 경로
      },
    ];
  },
  i18n: {
    locales: ["en-US", "ko-KR"], // Add the locales you need for your project
    defaultLocale: "ko-KR",
    localeDetection: false,
  },
};
