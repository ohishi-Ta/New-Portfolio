// src/components/AuthGuard.tsx

'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    // /authページは認証チェック不要
    if (pathname === '/auth') {
      setIsLoading(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      const user = await getCurrentUser();
      console.log('Current user:', user);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.log('Not authenticated:', error);
      setIsAuthenticated(false);
      setIsLoading(false);
      // 認証が必要なページで未認証の場合はリダイレクト
      if (pathname !== '/auth') {
        router.push('/auth');
      }
    }
  };

  // ローディング中
  if (isLoading && pathname !== '/auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">認証確認中...</p>
        </div>
      </div>
    );
  }

  // /authページまたは認証済みの場合は子要素を表示
  if (pathname === '/auth' || isAuthenticated) {
    return <>{children}</>;
  }

  // 未認証でリダイレクト待ちの場合
  return null;
}