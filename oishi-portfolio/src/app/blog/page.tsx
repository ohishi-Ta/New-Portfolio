// src/app/blog/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/works/Pagination';
import { getArticles } from '@/lib/githubApi';
import { extractTopics, filterArticlesByTopic } from '@/utils/blog';
import type { GitHubArticle } from '@/types/github';

const ITEMS_PER_PAGE = 12;

const Blog = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // URLパラメータから初期値を取得
  const pageParam = searchParams.get('page');
  const topicParam = searchParams.get('topic');
  
  const [activeTopic, setActiveTopic] = useState(topicParam || 'All');
  const [articlesData, setArticlesData] = useState<GitHubArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const page = parseInt(pageParam || '1', 10);
    return page > 0 ? page : 1;
  });
  const [isMounted, setIsMounted] = useState(false);

  // クライアントサイドでのみ実行
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // URLパラメータを更新する関数
  const updateURL = useCallback((page: number, topic: string) => {
    const params = new URLSearchParams();
    
    if (page > 1) {
      params.set('page', page.toString());
    }
    
    if (topic !== 'All') {
      params.set('topic', topic);
    }
    
    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.push(url, { scroll: false });
  }, [pathname, router]);

  // GitHubから記事データを取得
  useEffect(() => {
    if (!isMounted) return;
    
    const loadArticles = async () => {
      setLoading(true);
      try {
        const data = await getArticles();
        setArticlesData(data);
        setError(null);
      } catch (err) {
        console.error('記事の取得に失敗しました:', err);
        setError('記事の取得に失敗しました');
        setArticlesData([]);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [isMounted]);

  // URLパラメータの変更を監視
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const topic = searchParams.get('topic') || 'All';
    
    if (page !== currentPage) {
      setCurrentPage(page > 0 ? page : 1);
    }
    
    if (topic !== activeTopic) {
      setActiveTopic(topic);
    }
  }, [searchParams]);

  // トピックとフィルタリング
  const topics = extractTopics(articlesData);
  const filteredArticles = filterArticlesByTopic(articlesData, activeTopic);

  // ページネーション計算
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // トピック変更時にページをリセット
  const handleTopicChange = (topic: string) => {
    setActiveTopic(topic);
    setCurrentPage(1);
    updateURL(1, topic);
  };

  // ページ変更
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(page, activeTopic);
    window.scrollTo(0, 0);
  };

  // ローディング表示
  if (loading) {
    return (
      <div className="mt-6">
        <div className="bg-white px-6 py-18">
          <div className="max-w-[1350px] mx-auto">
            <h1 className="text-5xl font-extrabold px-6 font-figtree">BLOG</h1>
          </div>
        </div>
        <div className="max-w-[1350px] mx-auto px-6 py-15">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">読み込み中...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // エラー表示
  if (error) {
    return (
      <div className="mt-6">
        <div className="bg-white px-6 py-18">
          <div className="max-w-[1350px] mx-auto">
            <h1 className="text-5xl font-extrabold px-6 font-figtree">BLOG</h1>
          </div>
        </div>
        <div className="max-w-[1350px] mx-auto px-6 py-15">
          <div className="text-center text-red-500">
            <p>記事の取得に失敗しました</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="bg-white px-6 py-18">
        <div className="max-w-[1350px] mx-auto">
          <h1 className="text-5xl font-extrabold px-6 font-figtree">BLOG</h1>
          
          {/* トピックフィルター */}
          {topics.length > 1 && (
            <div className="px-6 mt-10">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTopicChange('All')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTopic === 'All'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                {topics.filter(topic => topic !== 'All').map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicChange(topic)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTopic === topic
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1350px] mx-auto px-6 py-15">
        {/* 検索結果の表示 */}
        <div className="mb-8">
          <p className="text-gray-600">
            {activeTopic === 'All' ? '全て' : activeTopic} : {filteredArticles.length}件
            {totalPages > 1 && (
              <span className="ml-2">
                (ページ {currentPage}/{totalPages})
              </span>
            )}
          </p>
        </div>

        {/* 記事グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              記事が見つかりませんでした
            </div>
          ) : (
            currentArticles.map((article) => (
              <BlogCard 
                key={article.slug} 
                article={article}
              />
            ))
          )}
        </div>

        {/* ページネーション */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Blog;