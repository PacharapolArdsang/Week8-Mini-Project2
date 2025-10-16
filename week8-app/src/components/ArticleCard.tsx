import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { NewsArticle } from "../types/news";
import { toggleFavorite } from "../store/favoritesSlice";
import type { RootState, AppDispatch } from "../store/store";

const FALLBACK_IMAGE = "https://placehold.co/400x250?text=No+Image";

type Props = {
  article: NewsArticle;
};

export default function ArticleCard({ article }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorited = favorites.some((item) => item.url === article.url);

  const published = new Date(article.publishedAt);
  const formattedDate = isNaN(published.getTime()) ? "" : published.toLocaleString();

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition">
      <figure className="aspect-[16/9] overflow-hidden">
        <img
          src={article.urlToImage || FALLBACK_IMAGE}
          alt={article.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base line-clamp-2 h-12">{article.title}</h2>
        {article.description && <p className="text-sm opacity-70 line-clamp-3">{article.description}</p>}
        {formattedDate && <p className="text-xs opacity-60">เผยแพร่เมื่อ {formattedDate}</p>}
        <div className="card-actions justify-between items-center mt-3">
          <Link
            to={`/article/${encodeURIComponent(article.url)}`}
            className="btn btn-primary btn-sm"
            state={{ article }}
          >
            Read more
          </Link>
          <button
            className={`btn btn-outline btn-sm ${isFavorited ? "btn-secondary" : ""}`}
            onClick={() => dispatch(toggleFavorite(article))}
          >
            {isFavorited ? "★ Favorited" : "☆ Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}
