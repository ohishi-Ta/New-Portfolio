// src/components/works/WorkCard.tsx

'use client';

import Image from 'next/image';
import { HiExternalLink, HiPhotograph } from 'react-icons/hi';
import type { Work } from '@/types/works';

type WorkCardProps = {
  work: Work;
  onClick: (work: Work) => void;
};

const WorkCard = ({ work, onClick }: WorkCardProps) => {
  return (
    <div 
      className="group bg-white rounded-lg shadow-md overflow-hidden border cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={() => onClick(work)}
    >
      {/* 画像 */}
      <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {work.image?.url ? (
          <Image 
            src={work.image.url} 
            alt={work.title}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              <span key={index} className="inline-flex items-center px-3 py-1 bg-white text-primary text-xs rounded-full border border-primary">
                {category.title}
              </span>
            ))}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-accent">
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

      </div>
    </div>
  );
};

export default WorkCard;