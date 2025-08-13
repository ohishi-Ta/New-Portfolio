// src/utils/tagMapping.ts

import type { GitHubArticle } from '@/types/github';

// タグマッピングの型定義
interface TagMapping {
  tagMapping: {
    [key: string]: string;
  };
}

// タグマッピングデータをキャッシュする変数（nullを許可しない）
let tagMappingCache: { [key: string]: string } = {};
let isCacheLoaded = false;

/**
 * タグマッピングファイルを読み込む
 */
export const loadTagMapping = async (): Promise<{ [key: string]: string }> => {
  // キャッシュが既に読み込まれていれば返す
  if (isCacheLoaded) {
    return tagMappingCache;
  }

  try {
    const response = await fetch('/api/github/tags-mapping');
    if (!response.ok) {
      console.warn('タグマッピングファイルの読み込みに失敗しました');
      tagMappingCache = {};
      isCacheLoaded = true;
      return tagMappingCache;
    }
    
    const data = await response.json();
    tagMappingCache = data || {};
    isCacheLoaded = true;
    return tagMappingCache;
  } catch (error) {
    console.error('タグマッピングファイルの読み込みエラー:', error);
    tagMappingCache = {};
    isCacheLoaded = true;
    return tagMappingCache;
  }
};

/**
 * 単一のタグを変換する
 */
export const transformTag = (tag: string, mapping: { [key: string]: string }): string => {
  // 完全一致を優先
  if (mapping[tag]) {
    return mapping[tag];
  }
  
  // 小文字変換での一致を確認
  const lowerTag = tag.toLowerCase();
  if (mapping[lowerTag]) {
    return mapping[lowerTag];
  }
  
  // マッピングにない場合は元のタグをそのまま返す
  return tag;
};

/**
 * トピック配列を変換する
 */
export const transformTopics = (
  topics: string[], 
  mapping: { [key: string]: string }
): string[] => {
  return topics.map(topic => transformTag(topic, mapping));
};

/**
 * GitHubArticleのトピックを変換する
 */
export const transformArticleTopics = (
  article: GitHubArticle,
  mapping: { [key: string]: string }
): GitHubArticle => {
  return {
    ...article,
    topics: transformTopics(article.topics, mapping)
  };
};

/**
 * 記事配列のトピックを一括変換する
 */
export const transformArticlesTopics = async (
  articles: GitHubArticle[]
): Promise<GitHubArticle[]> => {
  const mapping = await loadTagMapping();
  
  return articles.map(article => 
    transformArticleTopics(article, mapping)
  );
};

/**
 * タグマッピングキャッシュをクリアする（テスト用）
 */
export const clearTagMappingCache = (): void => {
  tagMappingCache = {};
  isCacheLoaded = false;
};