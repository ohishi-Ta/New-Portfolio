// src/lib/worksApi.ts

import { createClient } from 'microcms-js-sdk';
import type { Work } from '@/types/works';

// microCMSクライアントの初期化
const client = createClient({
  serviceDomain: 'portfolio-oishi',
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
});

export async function fetchWorks(): Promise<{
  contents: Work[];
  error?: string;
}> {
  try {
    if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
      throw new Error('microCMS API キーが設定されていません');
    }

    const data = await client.get({
      endpoint: 'blog',
      queries: {
        limit: 100
      }
    });

    return { contents: data.contents };
  } catch (err) {
    console.error('microCMS fetch error:', err);
    return {
      contents: [],
      error: err instanceof Error ? err.message : 'データの取得に失敗しました'
    };
  }
}