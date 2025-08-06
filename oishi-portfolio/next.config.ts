/** @type {import('next').NextConfig} */
const nextConfig = {
  // 外部画像の読み込み許可（セキュア）
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/**',
      },
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