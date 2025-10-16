// Types สำหรับข้อมูลข่าวจาก NewsAPI.org
// ดูรายละเอียด response: https://newsapi.org/docs/endpoints/top-headlines

export type NewsSource = {
  id: string | null;
  name: string;
};

export type NewsArticle = {
  source: NewsSource;
  author?: string | null;
  title: string;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  publishedAt: string;
  content?: string | null;
};

export type NewsResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: NewsArticle[];
};
