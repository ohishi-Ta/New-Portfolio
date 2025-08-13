import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from '@/utils/amplify-server';
import { fetchAuthSession } from 'aws-amplify/auth/server';

// 認証が不要なパス
const publicPaths = ['/login', '/api', '/_next', '/favicon.ico'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 公開パスはスキップ
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // 認証チェック
  const response = NextResponse.next();
  
  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        // トークンが存在すれば認証済み
        return session.tokens !== undefined;
      } catch (error) {
        console.error('Auth check error:', error);
        return false;
      }
    }
  });
  
  // 未認証の場合はログインページへリダイレクト
  if (!authenticated) {
    const loginUrl = new URL('/login', request.url);
    // リダイレクト後の遷移先を保存
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};