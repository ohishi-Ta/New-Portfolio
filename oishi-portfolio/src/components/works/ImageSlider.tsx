// src/components/works/ImageSlider.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import type { ImageSliderProps } from '@/types/works';

const ImageSlider = ({ images, title }: ImageSliderProps) => {
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

export default ImageSlider;