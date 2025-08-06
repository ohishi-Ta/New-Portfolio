// src/components/Slider.tsx
'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './SliderArrowButtons'
import { SliderProps } from '../types/slider'
import { GitHubArticle } from '../types/github'
import { getArticles } from '../lib/githubApi'

const Slider: React.FC<SliderProps> = ({ 
  className = "", 
  maxSlides = 10,
  showCategory = true 
}) => {
  const [articles, setArticles] = useState<GitHubArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 記事データを取得する関数
  const fetchArticles = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const data = await getArticles(10)
      
      if (data.length === 0) {
        setError('記事が見つかりませんでした')
      } else {
        setArticles(data)
      }
    } catch (error) {
      console.error('記事の取得に失敗しました:', error)
      setError(`記事の取得に失敗しました: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const autoplayPlugin = Autoplay({ 
    delay: 3500, 
    stopOnInteraction: false,
    stopOnMouseEnter: true 
  })
  
  const options: EmblaOptionsType = {
    loop: true,
    slidesToScroll: 1,
    skipSnaps: false,
    align: 'start'
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplayPlugin])
  const [scrollProgress, setScrollProgress] = useState(0)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  // 自動再生の切り替え
  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const isAutoplayPlaying = autoplay.isPlaying()
    
    if (isAutoplayPlaying) {
      autoplay.stop()
      setIsPlaying(false)
    } else {
      autoplay.play()
      setIsPlaying(true)
    }
  }, [emblaApi])

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi
      .on('reInit', onScroll)
      .on('scroll', onScroll)
      .on('slideFocus', onScroll)
  }, [emblaApi, onScroll])

  // 日付フォーマット関数
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
    } catch (error) {
      return ''
    }
  }

  // ローディング表示
  if (isLoading) {
    return (
      <div className='home--mv-slider mt-10 flex justify-end'>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 pb-8 w-full max-w-4xl h-64 flex flex-col items-center justify-center">
          <div className="inline-block w-10 h-10 border-3 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
          <div className="text-gray-500 font-noto-sans-jp mt-3 text-sm">記事を読み込み中...</div>
        </div>
      </div>
    )
  }

  // エラー表示
  if (error) {
    return (
      <div className='home--mv-slider mt-10 flex justify-end'>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 pb-8 w-full max-w-4xl h-64 flex flex-col items-center justify-center">
          <div className="text-red-500 font-noto-sans-jp mb-2">エラーが発生しました</div>
          <div className="text-xs text-gray-600 text-center">{error}</div>
          <button 
            onClick={fetchArticles}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            再試行
          </button>
        </div>
      </div>
    )
  }

  // 記事がない場合の表示
  if (articles.length === 0) {
    return (
      <div className='home--mv-slider mt-10 flex justify-end'>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 pb-8 w-full max-w-4xl h-64 flex flex-col items-center justify-center">
          <div className="text-gray-500 font-noto-sans-jp mb-2">記事が見つかりませんでした</div>
          <div className="text-xs text-gray-400 text-center">
            GitHubリポジトリ「ohishi-Ta/Zenn」の「articles」フォルダに記事がないか、<br/>
            記事が非公開設定になっている可能性があります
          </div>
          <button 
            onClick={fetchArticles}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            再読み込み
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='home--mv-slider mt-10 flex justify-end'>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 pb-20 w-full max-w-4xl h-90">
        
        {/* スライダー本体 */}
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {articles.map((article, index) => (
              <div key={article.slug} className="flex-[0_0_100%] md:flex-[0_0_33.333%] min-w-0 px-2">
                {/* カード全体をリンクに */}
                <a 
                  href={`https://zenn.dev/ohishi-ta/articles/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="h-full flex flex-col justify-between p-4 from-blue-50 to-purple-50 rounded-xl relative group cursor-pointer home--mv-sliderItem">
                    
                    {/* カテゴリバッジ（記事タイプ） */}
                    {showCategory && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-figtree z-10">
                        {article.type === 'tech' ? 'Tech' : 'Idea'}
                      </div>
                    )}
                    
                    {/* メインコンテンツ */}
                    <div className="flex-1 mt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-4 sliderItem--hoverText">
                        {article.title}
                      </h3>
                      
                      {/* トピックタグ表示 */}
                      {article.topics && article.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2 font-figtree">
                          {article.topics.map((topic, topicIndex) => (
                            <span key={topicIndex} className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-figtree">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* フッター - 投稿日のみ表示 */}
                    <div className="flex justify-end items-center mt-4">
                      {article.published_at && (
                        <div className="text-xs text-gray-500 font-figtree sliderItem--hoverText">
                          {formatDate(article.published_at)}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ナビゲーションボタン - 左下配置 */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          
          {/* 自動再生切り替えボタン */}
          <button
            onClick={toggleAutoplay}
            className="w-8 h-8 bg-white/80 hover:bg-gray-100 rounded-full shadow-md flex items-center justify-center transition-colors duration-200 cursor-pointer"
            title={isPlaying ? '自動再生を停止' : '自動再生を開始'}
          >
            {isPlaying ? (
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Slider