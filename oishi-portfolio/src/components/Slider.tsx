'use client';

import React from 'react';
import { Splide, SplideSlide } from 'splide-nextjs/react-splide';
import 'splide-nextjs/splide/dist/css/splide-core.min.css';
import { SlideData, SliderProps } from '../types/slider';

// スライダーのデータ
const slides: SlideData[] = [
  {
    id: 1,
    title: "ECサイト構築",
    description: "Next.js + TypeScriptで構築したモダンなECサイト",
    category: "Web App",
    link: "https://example.com/project1"
  },
  {
    id: 2,
    title: "AWS インフラ設計",
    description: "スケーラブルなクラウドインフラストラクチャの設計・構築",
    category: "Cloud",
    link: "https://example.com/project2"
  },
  {
    id: 3,
    title: "モバイルアプリ",
    description: "React Nativeを使用したクロスプラットフォームアプリ",
    category: "Mobile",
    link: "https://example.com/project3"
  },
  {
    id: 4,
    title: "データ分析基盤",
    description: "機械学習パイプラインを含むデータ分析プラットフォーム",
    category: "Data",
    link: "https://example.com/project4"
  },
  {
    id: 5,
    title: "社内システム構築",
    description: "業務効率化のための社内システム。権限管理とワークフロー機能を含む包括的なソリューション",
    category: "System",
    link: "https://example.com/internal-system",
    tech: ["React", "Node.js", "PostgreSQL"],
    year: "2023"
  },
  {
    id: 6,
    title: "AIチャットボット",
    description: "自然言語処理を活用したインテリジェントなチャットボット。カスタマーサポートの自動化を実現",
    category: "AI",
    link: "https://example.com/ai-chatbot",
    tech: ["OpenAI API", "Python", "FastAPI"],
    year: "2025"
  }
];

const Slider: React.FC<SliderProps> = ({ 
  className = "", 
  maxSlides = 4,
  showCategory = true 
}) => {
  // 表示するスライドを制限
  const displaySlides = slides.slice(0, maxSlides);

  const splideOptions = {
    rewind: true,
    width: window.innerWidth / 2,
    perPage: 2,
    type: "loop",
    autoplay: true,
    perMove: 1,
  };

  return (
    <div className={`portfolio-slider-container ${className}`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 w-80 h-48 relative overflow-hidden">
        <Splide options={splideOptions} className="h-full">
          {displaySlides.map((slide, index) => (
            <SplideSlide key={slide.id}>
              <div className="h-full flex flex-col justify-between p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl relative group cursor-pointer">
                {/* カテゴリバッジ */}
                {showCategory && slide.category && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-figtree z-10">
                    {slide.category}
                  </div>
                )}
                
                {/* メインコンテンツ */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-figtree group-hover:text-blue-600 transition-colors duration-300">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-noto-sans-jp leading-relaxed line-clamp-3">
                    {slide.description}
                  </p>
                  
                  {/* 技術スタック表示 */}
                  {slide.tech && slide.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {slide.tech.slice(0, 2).map((tech, techIndex) => (
                        <span key={techIndex} className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-figtree">
                          {tech}
                        </span>
                      ))}
                      {slide.tech.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-figtree">
                          +{slide.tech.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                {/* フッター */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500 font-figtree">
                      {String(index + 1).padStart(2, '0')} / {String(displaySlides.length).padStart(2, '0')}
                    </div>
                    {slide.year && (
                      <div className="text-xs text-gray-400 font-figtree">
                        {slide.year}
                      </div>
                    )}
                  </div>
                  
                  {slide.link && (
                    <a 
                      href={slide.link}
                      className="text-xs text-blue-500 hover:text-blue-700 font-figtree underline transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      詳細を見る
                    </a>
                  )}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Slider;