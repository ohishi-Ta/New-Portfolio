import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 認証が必要なパス
const protectedPaths = [
  '/admin',
  '/dashboard',
  '/profile',
  // 必要に応じて追加
];

// 認証不要なパス（ログイン済みユーザーがアクセスすべきでない）
const authPaths = [
  '/login',
  '/signup',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 保護されたパスかチェック
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );
  
  // 認証パスかチェック
  const isAuthPath = authPaths.some(path => 
    pathname.startsWith(path)
  );
  
  // Amplify認証トークンをCookieから取得
  const cookies = request.cookies;
  const authTokens = [
    cookies.get('CognitoIdentityServiceProvider.*.idToken'),
    cookies.get('CognitoIdentityServiceProvider.*.accessToken'),
    cookies.get('CognitoIdentityServiceProvider.*.refreshToken'),
  ];
  
  // いずれかのトークンが存在すれば認証済みとみなす
  const isAuthenticated = authTokens.some(token => token?.value);
  
  // 保護されたパスに未認証でアクセスした場合
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // 認証済みユーザーがログインページにアクセスした場合
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// ミドルウェアを適用するパスの設定
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};