/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["68xkph-8888.preview.csb.app"],
  },
  redirects: async () => {
    return [
      {
        source: "/register",
        destination: "/create-pin",
        permanent: true,
      },
    ];
  }
};

module.exports = nextConfig;
