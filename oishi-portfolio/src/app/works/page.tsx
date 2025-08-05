'use client';

import { useState, useEffect } from 'react';
import { createClient } from 'microcms-js-sdk';

// microCMSクライアントの初期化
const client = createClient({
  serviceDomain: 'portfolio-oishi',
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
});

// microCMSの型定義（実際のスキーマに合わせて修正）
type Tag = {
  id: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

type Work = {
  id: string;
  title: string;
  client: string;
  body: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  tags: Tag[];
  url?: string;
  cat: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

const Works = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [worksData, setWorksData] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // モーダルを開く
  const openModal = (work: Work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // スクロール無効化
  };

  // モーダルを閉じる
  const closeModal = () => {
    setSelectedWork(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'unset'; // スクロール有効化
  };

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  // microCMSからデータを取得
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
          throw new Error('microCMS API キーが設定されていません');
        }

        const data = await client.get({
          endpoint: 'blog',
        });

        setWorksData(data.contents);
      } catch (err) {
        console.error('microCMS fetch error:', err);
        setError(err instanceof Error ? err.message : 'データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  // カテゴリを動的に取得（catフィールドから）
  const categories = ['All', ...Array.from(new Set(worksData.flatMap(work => work.cat)))];

  const filteredWorks = activeCategory === 'All' 
    ? worksData 
    : worksData.filter(work => work.cat.includes(activeCategory));

  if (loading) {
    return (
      <div className="mt-6">
        <div className="bg-white px-6 py-18">
          <div className="max-w-[1350px] mx-auto">
            <h1 className="text-5xl font-bold px-6 font-figtree">Works</h1>
          </div>
        </div>
        <div className="max-w-[1350px] mx-auto px-6 py-15">
          <div className="text-center text-gray-500">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6">
        <div className="bg-white px-6 py-18">
          <div className="max-w-[1350px] mx-auto">
            <h1 className="text-5xl font-bold px-6 font-figtree">Works</h1>
          </div>
        </div>
        <div className="max-w-[1350px] mx-auto px-6 py-15">
          <div className="text-center text-red-500">
            <p>データの取得に失敗しました</p>
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
            <h1 className="text-5xl font-bold px-6 font-figtree">Works</h1>
            
            {/* カテゴリフィルター */}
            {categories.length > 1 && (
              <div className="px-6 mt-10">
                  <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                      <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          activeCategory === category
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                      >
                          {category}
                      </button>
                      ))}
                  </div>
                </div>
            )}
            </div>
        </div>
      <div className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-15">
        {filteredWorks.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            作品が見つかりませんでした
          </div>
        ) : (
          filteredWorks.map((work) => (
            <div 
              key={work.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openModal(work)}
            >
              {/* 画像 */}
              <div className="w-full h-48 bg-gray-200">
                {work.image?.url ? (
                  <img 
                    src={work.image.url} 
                    alt={work.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  {/* カテゴリタグ */}
                  {work.cat.map((category, index) => (
                    <span key={index} className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full mr-2 mb-1">
                      {category}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {work.title}
                </h3>
                
                {/* クライアント名 */}
                <p className="text-gray-600 text-sm mb-3">
                  Client: {work.client}
                </p>
                
                {/* 技術タグ */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {work.tags.map((tag) => (
                    <span key={tag.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag.tag}
                    </span>
                  ))}
                </div>

                {/* URL */}
                {work.url && (
                  <div className="mt-4">
                    <a 
                      href={work.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-500 hover:text-blue-700 text-sm"
                      onClick={(e) => e.stopPropagation()} // カードクリックイベントを防止
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      サイトを見る
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* モーダル */}
      {isModalOpen && selectedWork && (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div 
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* ヘッダー */}
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                          {selectedWork.title}
                        </h3>
                        <button 
                          onClick={closeModal}
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span className="sr-only">Close</span>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* メイン画像 */}
                      {selectedWork.image?.url && (
                        <div className="mb-6">
                          <img 
                            src={selectedWork.image.url} 
                            alt={selectedWork.title}
                            className="w-full rounded-lg"
                          />
                        </div>
                      )}

                      {/* 基本情報 */}
                      <div className="mb-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                          <div>
                            <dt className="text-sm font-medium text-gray-900">Client</dt>
                            <dd className="mt-1 text-sm text-gray-700">{selectedWork.client}</dd>
                          </div>
                          
                          <div>
                            <dt className="text-sm font-medium text-gray-900">Category</dt>
                            <dd className="mt-1">
                              {selectedWork.cat.map((category, index) => (
                                <span key={index} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-1">
                                  {category}
                                </span>
                              ))}
                            </dd>
                          </div>

                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-900">Technologies</dt>
                            <dd className="mt-1">
                              {selectedWork.tags.map((tag) => (
                                <span key={tag.id} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-1 mb-1">
                                  {tag.tag}
                                </span>
                              ))}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* 詳細説明 */}
                      {selectedWork.body && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">詳細</h4>
                          <div 
                            className="prose prose-sm max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: selectedWork.body }}
                          />
                        </div>
                      )}

                      {/* 追加画像 */}
                      {selectedWork.images && selectedWork.images.length > 1 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">その他の画像</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedWork.images.slice(1).map((image, index) => (
                              <img 
                                key={index}
                                src={image.url} 
                                alt={`${selectedWork.title} ${index + 2}`}
                                className="w-full rounded-lg"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* フッター */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {selectedWork.url && (
                    <a 
                      href={selectedWork.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      サイトを見る
                    </a>
                  )}
                  <button 
                    type="button"
                    onClick={closeModal}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Works;