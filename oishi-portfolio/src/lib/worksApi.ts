// src/lib/worksApi.ts

import type { Work } from '@/types/works';
import { fetchAuthSession } from 'aws-amplify/auth';

export async function fetchWorks(): Promise<{
  contents: Work[];
  error?: string;
}> {
  // セッション確認（自動リフレッシュ）
  await fetchAuthSession();
  try {
    const response = await fetch('/api/works', {
      next: { revalidate: 3600 } // 1時間キャッシュ
    });

    if (!response.ok) {
      throw new Error('Failed to fetch works');
    }

    const contents = await response.json();
    return { contents };
  } catch (err) {
    console.error('Works fetch error:', err);
    return {
      contents: [],
      error: err instanceof Error ? err.message : 'データの取得に失敗しました'
    };
  }
}