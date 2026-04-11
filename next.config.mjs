import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is enabled by default in Next.js 16, but next-pwa requires webpack.
  // We set an empty turbopack config to acknowledge we are using webpack for PWA.
  turbopack: {},
};

export default withPWA(nextConfig);
