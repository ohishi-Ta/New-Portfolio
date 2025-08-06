// src/types/works.ts

export type Tag = {
  id: string;
  tag: string;
};

export type Category = {
  id: string;
  title: string;
  slug: string;
  displaynum?: number;
};

export type Work = {
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

export type ImageSliderProps = {
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  title: string;
};