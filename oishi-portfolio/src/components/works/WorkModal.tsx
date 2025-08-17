// src/components/works/WorkModal.tsx

'use client';

import { HiX, HiExternalLink, HiCode } from 'react-icons/hi';
import { BiCategory } from 'react-icons/bi';
import ImageSlider from './ImageSlider';
import type { Work } from '@/types/works';

type WorkModalProps = {
  selectedWork: Work | null;
};

const WorkModal = ({ selectedWork }: WorkModalProps) => {
  if (!selectedWork) return null;

  // サムネイルを除外して詳細画像のみ取得
  const images = selectedWork.images || [];

  return (
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
          {/* Image Slider - 詳細画像のみ表示 */}
          {images.length > 0 && (
            <div className="mb-8">
              <ImageSlider images={images} title={selectedWork.title} />
            </div>
          )}

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
              <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-300 rounded-xl p-8 shadow-inner">
                <div 
                  className="prose prose-lg max-w-none text-gray-800 leading-relaxed [&>*]:mb-4 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mt-6 [&>h1]:mb-3 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mt-5 [&>h2]:mb-2 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mt-4 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>li]:mb-2 [&>p]:text-gray-700 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>code]:bg-gray-100 [&>code]:text-red-600 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>a]:text-blue-600 [&>a]:underline [&>a:hover]:text-blue-800 [&>strong]:font-bold [&>strong]:text-gray-900 [&>em]:italic [&>hr]:border-gray-300 [&>hr]:my-6 [&>table]:w-full [&>table]:border-collapse [&>table_th]:border [&>table_th]:border-gray-300 [&>table_th]:p-2 [&>table_th]:bg-gray-100 [&>table_td]:border [&>table_td]:border-gray-300 [&>table_td]:p-2"
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
  );
};

export default WorkModal;