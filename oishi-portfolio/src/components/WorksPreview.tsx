// src/components/WorksPreview.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { fetchWorks } from '@/lib/worksApi';
import type { Work } from '@/types/works';

const WorksPreview = () => {
  const [worksData, setWorksData] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // microCMSからデータを取得
  useEffect(() => {
    const loadWorks = async () => {
      setLoading(true);
      const { contents, error } = await fetchWorks();
      
      if (error) {
        setError(error);
      } else {
        // 最新6件のみ取得
        setWorksData(contents.slice(0, 6));
      }
      
      setLoading(false);
    };

    loadWorks();
  }, []);


  // ローディング表示
  if (loading) {
    return (
      <div className="mt-6">
        <div className="bg-white px-6 py-18">
          <div className="max-w-[1350px] mx-auto">
            <h1 className="text-5xl font-bold px-6 font-figtree">Works</h1>
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
      <div className="text-center text-gray-500 py-12">
        <p>作品の読み込みに失敗しました</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  // データがない場合
  if (worksData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>表示する作品がありません</p>
      </div>
    );
  }

  return (
    <>
      {/* 作品グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {worksData.map((work) => (
          <Link 
            key={work.id}
            href="/works"
            className="group bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
          >
            {/* 画像 */}
            <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              {work.image?.url ? (
                <img 
                  src={work.image.url} 
                  alt={work.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* カテゴリバッジ */}
              {work.category && work.category.length > 0 && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs rounded-full">
                    {work.category[0].title}
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {work.title}
              </h3>
              
              {/* 技術タグ */}
              <div className="flex flex-wrap gap-1 mb-3">
                {work.tags.map((tag) => (
                  <span key={tag.id} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {tag.tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* もっと見るボタン */}
      <div className="text-center">
        <Link 
          href="/works"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg group"
        >
          詳しくはこちら
          <HiArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </>
  );
};

export default WorksPreview;