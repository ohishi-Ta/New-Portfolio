// src/utils/works.ts

import type { Work, Category } from '@/types/works';

// 日付フォーマット関数
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return '';
  }
};

// 画像配列を作成する関数
export const getImageArray = (work: Work) => {
  const images = [];
  if (work.image?.url) {
    images.push(work.image);
  }
  if (work.images && work.images.length > 0) {
    images.push(...work.images);
  }
  return images;
};

// カテゴリを抽出する関数（displaynumでソート）
export const extractCategories = (worksData: Work[]): string[] => {
  // 重複除去してカテゴリを収集
  const categories = new Map<string, Category>();
  
  worksData.forEach(work => {
    work.category?.forEach(cat => {
      categories.set(cat.id, cat);
    });
  });
  
  // displaynumでソートしてタイトルを抽出
  const sortedTitles = [...categories.values()]
    .sort((a, b) => (a.displaynum ?? 999) - (b.displaynum ?? 999))
    .map(cat => cat.title);
  
  return ['All', ...sortedTitles];
};


// 作品をフィルタリングする関数
export const filterWorksByCategory = (works: Work[], category: string): Work[] => {
  return category === 'All' 
    ? works 
    : works.filter(work => 
        work.category && work.category.some(cat => cat.title === category)
      );
};