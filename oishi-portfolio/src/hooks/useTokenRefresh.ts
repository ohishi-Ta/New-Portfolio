// src/hooks/useTokenRefresh.ts

import { useEffect } from 'react';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

/**
 * 5分ごとにセッションをリフレッシュ
 */
export function useTokenRefresh() {
  const router = useRouter();
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const refreshSession = async () => {
      try {
        // セッションをリフレッシュ
        await fetchAuthSession({ forceRefresh: true });
        console.log('セッションをリフレッシュしました');
      } catch (error) {
        console.error('セッションリフレッシュエラー:', error);
        // エラーの場合はログアウト
        try {
          await signOut();
          router.push('/login');
        } catch (signOutError) {
          console.error('ログアウトエラー:', signOutError);
        }
      }
    };
    
    // 初回チェック
    refreshSession();
    
    // 5分ごとにリフレッシュ
    interval = setInterval(refreshSession, 5 * 60 * 1000);
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [router]);
}