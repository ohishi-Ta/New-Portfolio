/** @type {import('next').NextConfig} */
const nextConfig = {
  // 外部画像の読み込み許可（セキュア）
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zenn.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      }
    ],
  },
  
  // 厳密なTypeScriptチェック
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLintの厳密チェック
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig