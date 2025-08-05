// src/app/works/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from 'microcms-js-sdk';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { 
  HiX, 
  HiExternalLink, 
  HiTag, 
  HiCode, 
  HiPhotograph,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi';
import { 
  BiCategory, 
} from 'react-icons/bi';

// microCMSクライアントの初期化
const client = createClient({
  serviceDomain: 'portfolio-oishi',
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
});

// microCMSの型定義
type Tag = {
  id: string;
  tag: string;
};

type Category = {
  id: string;
  title: string;
  slug: string;
};

type Work = {
  id: string;
  title: string;
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
  category: Category[];
};

// スライダーコンポーネント
const ImageSlider = ({ images, title }: { images: Array<{ url: string; height: number; width: number; }>; title: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      skipSnaps: false
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="relative w-full aspect-[2/1] bg-gray-50 flex items-center justify-center rounded-xl overflow-hidden px-5 py-10">
                <img
                  src={image.url}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ナビゲーションボタン */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <HiChevronRight className="w-5 h-5" />
          </button>

          {/* ドット インジケーター */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === selectedIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>

          {/* 画像カウンター */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

const Works = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [worksData, setWorksData] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // ページネーション設定
  const ITEMS_PER_PAGE = 12;

  // MicroModal初期化
  useEffect(() => {
    const loadMicroModal = async () => {
      const MicroModal = (await import('micromodal')).default;
      
      MicroModal.init({
        onShow: (modal: any) => {
          document.body.style.overflow = 'hidden';
        },
        onClose: (modal: any) => {
          document.body.style.overflow = 'unset';
          setSelectedWork(null);
        },
        openTrigger: 'data-micromodal-trigger',
        closeTrigger: 'data-micromodal-close',
        openClass: 'is-open',
        disableScroll: true,
        disableFocus: false,
        awaitOpenAnimation: false,
        awaitCloseAnimation: false,
        debugMode: false
      });
    };

    loadMicroModal();
  }, []);

  // モーダルを開く
  const openModal = async (work: Work) => {
    setSelectedWork(work);
    
    const MicroModal = (await import('micromodal')).default;
    MicroModal.show('work-modal');
  };

  // 日付フォーマット関数
  const formatDate = (dateString: string) => {
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

  // microCMSからデータを取得
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
          throw new Error('microCMS API キーが設定されていません');
        }

        const data = await client.get({
          endpoint: 'blog',
          queries: {
            limit: 100 // より多くの作品を取得
          }
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

  // カテゴリを動的に取得
  const categories = ['All', ...Array.from(new Set(worksData.flatMap(work => 
    work.category ? work.category.map(cat => cat.title) : []
  )))];

  const filteredWorks = activeCategory === 'All' 
    ? worksData 
    : worksData.filter(work => 
        work.category && work.category.some(cat => cat.title === activeCategory)
      );

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
  };

  // ページ変更（スムーススクロールなしで上部に移動）
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // 画像配列を作成する関数
  const getImageArray = (work: Work) => {
    const images = [];
    if (work.image?.url) {
      images.push(work.image);
    }
    if (work.images && work.images.length > 0) {
      images.push(...work.images);
    }
    return images;
  };

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
    <>
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
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              {activeCategory === 'All' ? '全て' : activeCategory} : {filteredWorks.length}件の作品
              {totalPages > 1 && (
                <span className="ml-2">
                  (ページ {currentPage}/{totalPages})
                </span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWorks.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                作品が見つかりませんでした
              </div>
            ) : (
              currentWorks.map((work) => (
                <div 
                  key={work.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  onClick={() => openModal(work)}
                >
                  {/* 画像 */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {work.image?.url ? (
                      <img 
                        src={work.image.url} 
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <HiPhotograph className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    {/* 画像数インジケーター */}
                    {getImageArray(work).length > 1 && (
                      <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <HiPhotograph className="w-3 h-3 mr-1" />
                        {getImageArray(work).length}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      {/* カテゴリタグ */}
                      <div className="flex flex-wrap gap-2">
                        {work.category && work.category.map((category, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
                            <BiCategory className="w-3 h-3 mr-1" />
                            {category.title}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {work.title}
                    </h3>
                    
                    {/* 技術タグ */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {work.tags.slice(0, 3).map((tag) => (
                        <span key={tag.id} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                          <HiCode className="w-3 h-3 mr-1" />
                          {tag.tag}
                        </span>
                      ))}
                      {work.tags.length > 3 && (
                        <span className="text-xs text-gray-400">+{work.tags.length - 3}</span>
                      )}
                    </div>

                    {/* URL */}
                    {work.url && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <a 
                          href={work.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          サイトを見る
                          <HiExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12 mb-8">
              {/* 前へボタン */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <HiChevronLeft className="w-4 h-4" />
              </button>

              {/* ページ番号 */}
              <div className="flex space-x-1">
                {(() => {
                  const pages = [];
                  const showPages = 5; // 表示するページ数
                  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
                  let endPage = Math.min(totalPages, startPage + showPages - 1);

                  // 終端調整
                  if (endPage - startPage + 1 < showPages) {
                    startPage = Math.max(1, endPage - showPages + 1);
                  }

                  // 最初のページ
                  if (startPage > 1) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        1
                      </button>
                    );
                    if (startPage > 2) {
                      pages.push(
                        <span key="start-ellipsis" className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                  }

                  // 中間のページ
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          i === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  // 最後のページ
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span key="end-ellipsis" className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {totalPages}
                      </button>
                    );
                  }

                  return pages;
                })()}
              </div>

              {/* 次へボタン */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <HiChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced MicroModal */}
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
            {selectedWork && (
              <>
                {/* Enhanced Header */}
                <header className="modal__header from-blue-50 to-indigo-50 border-b border-gray-200 px-8 py-6">
                  <div className="flex justify-between items-center">
                    <div className="flex-1 pr-4">
                      <h2 className="modal__title text-2xl font-bold text-gray-900" id="work-modal-title">
                        {selectedWork.title}
                      </h2>
                    </div>
                    <button 
                      className="modal__close flex-shrink-0 rounded-full p-3 hover:bg-white/80 transition-colors" 
                      aria-label="Close modal" 
                      data-micromodal-close
                    >
                      <HiX className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                </header>

                {/* Enhanced Content */}
                <main className="modal__content overflow-y-auto max-h-[calc(95vh-200px)]">
                  <div className="p-8">
                    {/* Image Slider */}
                    {(() => {
                      const images = getImageArray(selectedWork);
                      return images.length > 0 ? (
                        <div className="mb-8">
                          <ImageSlider images={images} title={selectedWork.title} />
                        </div>
                      ) : null;
                    })()}

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                      
                      {/* Categories */}
                      <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                            <BiCategory className="w-5 h-5 mr-2 text-blue-500" />
                            カテゴリー
                          </h4>
                          <div className="space-y-2">
                            {selectedWork.category && selectedWork.category.map((category, index) => (
                              <span key={index} className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-800 text-sm rounded-lg font-medium mr-2 mb-2">
                                {category.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="lg:col-span-2">
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                            <HiCode className="w-5 h-5 mr-2 text-green-500" />
                            使用技術
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedWork.tags.map((tag) => (
                              <span key={tag.id} className="inline-flex items-center px-3 py-2 bg-green-100 text-green-800 text-sm rounded-lg font-medium">
                                <HiTag className="w-3 h-3 mr-1" />
                                {tag.tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {selectedWork.body && (
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">プロジェクト詳細</h4>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <div 
                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: selectedWork.body }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </main>

                {/* Enhanced Footer */}
                <footer className="modal__footer bg-white border-t border-gray-200 px-8 py-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    {selectedWork.url && (
                      <a 
                        href={selectedWork.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        サイトを見る
                        <HiExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    )}
                  </div>
                  
                  <button 
                    className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-200 transition-colors duration-200"
                    data-micromodal-close
                  >
                    <HiX className="w-4 h-4 mr-2" />
                    閉じる
                  </button>
                </footer>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        /**************************
          Enhanced MicroModal Styles
        **************************/

        .modal {
          display: none;
        }

        .modal.is-open {
          display: block;
        }

        .modal__overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 1rem;
        }

        .modal__container {
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-sizing: border-box;
          position: relative;
        }

        .modal__header {
          position: relative;
        }

        .modal__title {
          margin: 0;
          font-weight: 700;
          line-height: 1.25;
          color: #1f2937;
        }

        .modal__close {
          background: transparent;
          border: 0;
          cursor: pointer;
          outline: none;
        }

        .modal__content {
          position: relative;
        }

        .modal__footer {
          position: relative;
        }

        /* Custom scrollbar */
        .modal__content::-webkit-scrollbar {
          width: 6px;
        }

        .modal__content::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .modal__content::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .modal__content::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /**************************
          Enhanced Animation Styles
        **************************/
        @keyframes mmfadeIn {
          from { 
            opacity: 0;
          }
          to { 
            opacity: 1;
          }
        }

        @keyframes mmfadeOut {
          from { 
            opacity: 1;
          }
          to { 
            opacity: 0;
          }
        }

        @keyframes mmslideIn {
          from { 
            transform: translateY(20px) scale(0.95);
            opacity: 0;
          }
          to { 
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes mmslideOut {
          from { 
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          to { 
            transform: translateY(-20px) scale(0.95);
            opacity: 0;
          }
        }

        .micromodal-slide {
          display: none;
        }

        .micromodal-slide.is-open {
          display: block;
        }

        .micromodal-slide[aria-hidden="false"] .modal__overlay {
          animation: mmfadeIn 0.4s cubic-bezier(0.0, 0.0, 0.2, 1);
        }

        .micromodal-slide[aria-hidden="false"] .modal__container {
          animation: mmslideIn 0.4s cubic-bezier(0.0, 0.0, 0.2, 1);
        }

        .micromodal-slide[aria-hidden="true"] .modal__overlay {
          animation: mmfadeOut 0.3s cubic-bezier(0.0, 0.0, 0.2, 1);
        }

        .micromodal-slide[aria-hidden="true"] .modal__container {
          animation: mmslideOut 0.3s cubic-bezier(0.0, 0.0, 0.2, 1);
        }

        .micromodal-slide .modal__container,
        .micromodal-slide .modal__overlay {
          will-change: transform;
        }

        /* Additional utility classes */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Works;