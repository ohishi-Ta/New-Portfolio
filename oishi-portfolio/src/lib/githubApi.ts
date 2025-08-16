// src/lib/githubApi.ts

import { GitHubArticle } from '../types/github';

// API Routeから記事を取得
export async function getArticles(limit?: number): Promise<GitHubArticle[]> {
  try {
    const response = await fetch('/api/github/articles', {
      next: { revalidate: 3600 } // 1時間キャッシュ
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const articles = await response.json();
    
    // limitが指定されている場合のみ制限
    if (limit && limit > 0) {
      return articles.slice(0, limit);
    }
    
    return articles;
  } catch (error) {
    console.error('記事の取得に失敗しました:', error);
    return [];
  }
}