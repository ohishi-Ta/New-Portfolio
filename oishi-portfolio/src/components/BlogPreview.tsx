// src/components/BlogPreview.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { GitHubArticle } from '../types/github';
import { getArticles } from '../lib/githubApi';

const BlogPreview = () => {
  const [articles, setArticles] = useState<GitHubArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 記事データを取得
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // 最新6件の記事を取得
        const data = await getArticles(6);
        
        if (data.length === 0) {
          setError('記事が見つかりませんでした');
        } else {
          setArticles(data);
        }
      } catch (error) {
        console.error('記事の取得に失敗しました:', error);
        setError('記事の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

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

  // ローディング表示
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // エラー表示
  if (error) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>{error}</p>
        <p className="text-sm mt-2">読み込みに失敗しました</p>
      </div>
    );
  }

  // 記事がない場合
  if (articles.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>表示する記事がありません</p>
      </div>
    );
  }

  return (
    <>
      {/* 記事グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {articles.map((article) => (
          <a
            key={article.slug}
            href="/blog"
            className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer block"
          >
            {/* ヘッダー部分 */}
            <div className="bg-secondary p-6 border-b border-gray-100">
              {/* タイトル */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-3 group-hover:text-blue-600 transition-colors">
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
              
              {/* 投稿日とリンク */}
              <div className="flex items-center justify-between text-sm">
                {article.published_at && (
                  <div className="flex items-center text-gray-500">
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center">
        <Link 
          href="/blog"
          className="inline-flex items-center px-12 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary transition-all duration-300 group"
        >
          もっと見る
          <HiArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </>
  );
};

export default BlogPreview;