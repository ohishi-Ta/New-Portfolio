// src/utils/blog.ts

import type { GitHubArticle } from '@/types/github';

// タグランキングの型定義
export type TagRanking = {
  name: string;
  count: number;
  rank: number;
};

// トピックを抽出する関数（従来のアルファベット順）
export const extractTopics = (articles: GitHubArticle[]): string[] => {
  const topicsSet = new Set<string>();
  
  articles.forEach(article => {
    article.topics?.forEach(topic => {
      topicsSet.add(topic);
    });
  });
  
  // アルファベット順にソート
  const sortedTopics = Array.from(topicsSet).sort((a, b) => 
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
  
  return ['All', ...sortedTopics];
};

// トピックをランキング形式で取得する関数
export const getTopicRankings = (articles: GitHubArticle[]): TagRanking[] => {
  // タグごとのカウントを集計
  const topicCounts = new Map<string, number>();
  
  articles.forEach(article => {
    article.topics?.forEach(topic => {
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
    });
  });
  
  // カウント数で降順ソート（同数の場合はアルファベット順）
  const sortedTopics = Array.from(topicCounts.entries())
    .sort((a, b) => {
      // まずカウント数で降順ソート
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      // カウントが同じ場合はアルファベット順
      return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
    });
  
  // ランキング情報を付与
  let currentRank = 1;
  let previousCount = -1;
  
  return sortedTopics.map(([name, count], index) => {
    // 前のアイテムと同じカウント数でなければランクを更新
    if (count !== previousCount) {
      currentRank = index + 1;
      previousCount = count;
    }
    
    return {
      name,
      count,
      rank: currentRank
    };
  });
};

// ランキング順のトピックリストを取得（Allを含む）
export const getTopicsWithRanking = (articles: GitHubArticle[]): string[] => {
  const rankings = getTopicRankings(articles);
  const rankedTopics = rankings.map(r => r.name);
  return ['All', ...rankedTopics];
};

// タグの出現回数を取得
export const getTopicCount = (articles: GitHubArticle[], topic: string): number => {
  if (topic === 'All') {
    return articles.length;
  }
  
  return articles.filter(article => 
    article.topics && article.topics.includes(topic)
  ).length;
};

// 記事をトピックでフィルタリングする関数
export const filterArticlesByTopic = (articles: GitHubArticle[], topic: string): GitHubArticle[] => {
  if (topic === 'All') {
    return articles;
  }
  
  return articles.filter(article => 
    article.topics && article.topics.includes(topic)
  );
};

// 記事タイプでフィルタリングする関数
export const filterArticlesByType = (articles: GitHubArticle[], type: 'tech' | 'idea' | 'all'): GitHubArticle[] => {
  if (type === 'all') {
    return articles;
  }
  
  return articles.filter(article => article.type === type);
};

// 日付でソートする関数
export const sortArticlesByDate = (articles: GitHubArticle[], order: 'asc' | 'desc' = 'desc'): GitHubArticle[] => {
  return [...articles].sort((a, b) => {
    const dateA = new Date(a.published_at).getTime();
    const dateB = new Date(b.published_at).getTime();
    
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

// 検索機能（タイトルとトピックから検索）
export const searchArticles = (articles: GitHubArticle[], query: string): GitHubArticle[] => {
  const lowerQuery = query.toLowerCase();
  
  return articles.filter(article => {
    const titleMatch = article.title.toLowerCase().includes(lowerQuery);
    const topicMatch = article.topics?.some(topic => 
      topic.toLowerCase().includes(lowerQuery)
    );
    
    return titleMatch || topicMatch;
  });
};