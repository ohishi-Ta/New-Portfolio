import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 認証不要なパス（誰でもアクセス可能）
const publicPaths = [
  '/login',
  '/signup',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 公開パスかチェック
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path)
  );
  
  // Amplify認証トークンをCookieから取得
  const cookies = request.cookies;
  
  // Cognitoの実際のCookie名を探す
  const cognitoCookies = Array.from(cookies.getAll()).filter(cookie => 
    cookie.name.includes('CognitoIdentityServiceProvider')
  );
  
  // トークンの存在を確認
  const hasIdToken = cognitoCookies.some(cookie => 
    cookie.name.includes('.idToken')
  );
  const hasAccessToken = cognitoCookies.some(cookie => 
    cookie.name.includes('.accessToken')
  );
  
  const isAuthenticated = hasIdToken && hasAccessToken;
  
  // 公開パス以外で未認証の場合はログインへリダイレクト
  if (!isPublicPath && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // 認証済みユーザーがログインページにアクセスした場合はホームへ
  if (isPublicPath && isAuthenticated) {
    const redirectTo = request.nextUrl.searchParams.get('from') || '/';
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
  
  return NextResponse.next();
}

// ミドルウェアを適用するパスの設定
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};