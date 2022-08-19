export interface NewsItem {
  content: string;
  country: string[];
  creator: string[];
  description: string;
  image_url: string;
  language: string;
  link: string;
  pubDate: Date;
  title: string;
}

export interface RawData {
  nextPage: number;
  results: NewsItem[];
  status?: string;
  totalResults?: number;
}
