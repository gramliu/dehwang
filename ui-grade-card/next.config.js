/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["hrep-website.s3.ap-southeast-1.amazonaws.com"],
  },
  env: {
    BACKEND_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://dehwang-onutplb72a-uc.a.run.app/",
  },
};

module.exports = nextConfig;
