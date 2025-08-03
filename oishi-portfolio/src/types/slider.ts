// スライドデータの型
export interface SlideData {
  id: number;
  title: string;
  description: string;
  category?: string;
  link?: string;
  image?: string;
  tech?: string[];
  year?: string;
}

// Sliderコンポーネントのprops
export interface SliderProps {
  className?: string;
  maxSlides?: number;
  showCategory?: boolean;
}
