/** @type {import('next').NextConfig} */
export default {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://4b69-2800-bf0-a40c-125a-6458-cf98-a94c-fba.ngrok-free.app/:path*",
      },
    ];
  },
};
