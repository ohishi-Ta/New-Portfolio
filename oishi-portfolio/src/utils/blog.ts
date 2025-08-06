// src/utils/blog.ts

import type { GitHubArticle } from '@/types/github';

// トピックを抽出する関数
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