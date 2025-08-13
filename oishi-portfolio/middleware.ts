// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 認証不要なパス
const publicPaths = [
  '/login',
  '/signup',
  '/api/auth', // 認証APIは除外
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 公開パスかチェック
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path)
  );
  
  // 公開パスの場合は何もしない
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Cognitoトークンの存在確認
  const idToken = request.cookies.get('cognito_id_token');
  const accessToken = request.cookies.get('cognito_access_token');
  
  const isAuthenticated = !!(idToken && accessToken);
  
  // 未認証の場合はログインページへリダイレクト
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

// ミドルウェアを適用するパスの設定
export const config = {
  matcher: [
    /*
     * 以下を除くすべてのパスにマッチ:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - 拡張子付きファイル (例: .css, .js, .png)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};