import ArticleCard from "./ArticleCard";
import type { NewsArticle } from "../types/news";

type Props = {
  items: NewsArticle[];
};

export default function ArticleGrid({ items }: Props) {
  if (!items?.length) {
    return <div className="text-center opacity-70 p-10">No articles to display.</div>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((article) => (
        <ArticleCard key={article.url} article={article} />
      ))}
    </div>
  );
}
