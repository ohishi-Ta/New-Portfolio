// src/app/works/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import MicroModal from 'micromodal';
import WorkCard from '@/components/works/WorkCard';
import WorkModal from '@/components/works/WorkModal';
import Pagination from '@/components/works/Pagination';
import { fetchWorks } from '@/lib/worksApi';
import { extractCategories, filterWorksByCategory } from '@/utils/works';
import type { Work } from '@/types/works';

const ITEMS_PER_PAGE = 12;

const Works = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // URLパラメータから初期値を取得
  const pageParam = searchParams.get('page');
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');
  const [worksData, setWorksData] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const page = parseInt(pageParam || '1', 10);
    return page > 0 ? page : 1;
  });

  // URLパラメータを更新する関数
  const updateURL = useCallback((page: number, category: string) => {
    const params = new URLSearchParams();
    
    if (page > 1) {
      params.set('page', page.toString());
    }
    
    if (category !== 'All') {
      params.set('category', category);
    }
    
    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.push(url, { scroll: false });
  }, [pathname, router]);

  // MicroModal初期化
  useEffect(() => {
    MicroModal.init({
      openClass: 'is-open',
      disableScroll: true,
      disableFocus: true,
    });
  }, []);

  // モーダルを開く
  const openModal = (work: Work) => {
    setSelectedWork(work);
    MicroModal.show('work-modal');
  };

  // microCMSからデータを取得
  useEffect(() => {
    const loadWorks = async () => {
      setLoading(true);
      const { contents, error } = await fetchWorks();
      
      if (error) {
        setError(error);
      } else {
        setWorksData(contents);
      }
      
      setLoading(false);
    };

    loadWorks();
  }, []);

  // URLパラメータの変更を監視
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const category = searchParams.get('category') || 'All';
    
    if (page !== currentPage) {
      setCurrentPage(page > 0 ? page : 1);
    }
    
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  // カテゴリとフィルタリング
  const categories = extractCategories(worksData);
  const filteredWorks = filterWorksByCategory(worksData, activeCategory);

  // ページネーション計算
  const totalPages = Math.ceil(filteredWorks.length / ITEMS_PER_PAGE);
  const currentWorks = filteredWorks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // カテゴリ変更時にページをリセット
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    updateURL(1, category);
  };

  // ページ変更
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(page, activeCategory);
    window.scrollTo(0, 0);
  };

  // ローディング表示
  if (loading) {
    return (
      <div className="mt-6">
        <div className="bg-white px-6 py-18">
          <div className="max-w-[1350px] mx-auto">
            <h1 className="text-5xl font-extrabold px-6 font-figtree">WORKS</h1>
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
            <h1 className="text-5xl font-extrabold px-6 font-figtree">WORKS</h1>
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
    <>
      <div className="mt-6">
        <div className="bg-white px-6 py-18">
          <div className="max-w-[1350px] mx-auto">
            <h1 className="text-5xl font-extrabold px-6 font-figtree">WORKS</h1>
            
            {/* カテゴリフィルター */}
            {categories.length > 1 && (
              <div className="px-6 mt-10">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
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

        <div className="max-w-[1350px] mx-auto px-6 py-15">
          {/* 検索結果の表示 */}
          <div className="mb-8">
            <p className="text-gray-600">
              {activeCategory === 'All' ? '全て' : activeCategory} : {filteredWorks.length}件
              {totalPages > 1 && (
                <span className="ml-2">
                  (ページ {currentPage}/{totalPages})
                </span>
              )}
            </p>
          </div>

          {/* 作品グリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWorks.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                見つかりませんでした
              </div>
            ) : (
              currentWorks.map((work) => (
                <WorkCard 
                  key={work.id} 
                  work={work} 
                  onClick={openModal}
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

      {/* MicroModal */}
      <div 
        className="modal micromodal-slide" 
        id="work-modal" 
        aria-hidden="true"
      >
        <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
          <div 
            className="modal__container bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 max-h-[95vh] overflow-hidden"
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="work-modal-title"
          >
            <WorkModal selectedWork={selectedWork} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Works;