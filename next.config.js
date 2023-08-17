/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV == "development"
            ? "http://localhost:8000/api/:path*"
            : "https://amanmibra--rn-demo-api-modal-serve.modal.run/api/:path*",
      },
    ];
  },
  experimental: {
    proxyTimeout: 300_000, // 30 --> 300 seconds proxy timeout time
  },
};

module.exports = nextConfig;
