// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 認証不要なパス
const publicPaths = ['/login', '/signup', '/api/config'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 環境変数チェック
  const isConfigured = process.env.USER_POOL_ID && 
                       process.env.CLIENT_ID && 
                       process.env.AWS_REGION;

  if (!isConfigured) {
    console.error('AWS Cognito環境変数が設定されていません');
  }

  // 公開パスはスキップ
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // 静的ファイルやNext.js内部パスはスキップ
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    isPublicPath
  ) {
    return NextResponse.next();
  }

  // Cognitoトークンの存在確認（簡易チェック）
  const clientId = process.env.CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  const lastAuthUser = request.cookies.get(
    `CognitoIdentityServiceProvider.${clientId}.LastAuthUser`
  );
  
  if (!lastAuthUser) {
    const loginUrl = new URL('/login', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('from', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }
  
  const idToken = request.cookies.get(
    `CognitoIdentityServiceProvider.${clientId}.${lastAuthUser.value}.idToken`
  );
  
  if (!idToken) {
    const loginUrl = new URL('/login', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('from', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // 認証済みユーザーがログイン/サインアップページにアクセスした場合
  if (pathname === '/login' || pathname === '/signup') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};