/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Photos are served at q90 (logos/UI stay at the default 75). Declared explicitly
  // because newer Next versions reject qualities that aren't listed here.
  images: {
    qualities: [75, 90],
  },

  // Baseline security headers (light SEO/hardening signal). HSTS is honoured only
  // over HTTPS, so it is a no-op in local http dev and active in production.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
