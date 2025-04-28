/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://dongphucunivi.com" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  images: {
    minimumCacheTTL: 60, // Cache ảnh ít nhất 60 giây
    formats: ['image/avif', 'image/webp'], // Ưu tiên định dạng hiện đại
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Tối ưu cho các kích thước thiết bị
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Tối ưu cho ảnh nhỏ
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
      },
      {
        protocol: "https",
        hostname: "dongphucunivi.com",
      },
    ],
  },
};

module.exports = nextConfig;