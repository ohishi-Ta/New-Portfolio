// src/components/blog/BlogCard.tsx

'use client';

import { HiExternalLink, HiClock } from 'react-icons/hi';
import type { GitHubArticle } from '@/types/github';

type BlogCardProps = {
  article: GitHubArticle;
};

const BlogCard = ({ article }: BlogCardProps) => {
  // 日付フォーマット関数
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <a 
      href={`https://zenn.dev/ohishi-ta/articles/${article.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 block group"
    >
      {/* ヘッダー部分 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
      
        {/* タイトル */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-3 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
      </div>
      
      {/* コンテンツ部分 */}
      <div className="p-6">
        {/* トピックタグ */}
        {article.topics && article.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.topics.map((topic, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {topic}
              </span>
            ))}
          </div>
        )}
        
        {/* 投稿日とリンクアイコン */}
        <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
          {article.published_at && (
            <div className="flex items-center text-gray-500">
              <span>{formatDate(article.published_at)}</span>
            </div>
          )}
          
          <span className="inline-flex items-center text-blue-500 group-hover:text-accent font-medium transition-colors">
            Zennで読む
            <HiExternalLink className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;