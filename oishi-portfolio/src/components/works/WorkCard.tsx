// src/components/works/WorkCard.tsx

'use client';

import { HiExternalLink, HiCode, HiPhotograph } from 'react-icons/hi';
import { BiCategory } from 'react-icons/bi';
import type { Work } from '@/types/works';

type WorkCardProps = {
  work: Work;
  onClick: (work: Work) => void;
};

const WorkCard = ({ work, onClick }: WorkCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden border cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onClick={() => onClick(work)}
    >
      {/* 画像 */}
      <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {work.image?.url ? (
          <img 
            src={work.image.url} 
            alt={work.title}
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <HiPhotograph className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          {/* カテゴリタグ */}
          <div className="flex flex-wrap gap-2">
            {work.category && work.category.map((category, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
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
          {work.tags.map((tag) => (
            <span key={tag.id} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              {tag.tag}
            </span>
          ))}
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
  );
};

export default WorkCard;