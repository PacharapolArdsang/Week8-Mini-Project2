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
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <figure className="aspect-[16/9] overflow-hidden">
        <img
          src={article.urlToImage || FALLBACK_IMAGE}
          alt={article.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold line-clamp-2 h-14">{article.title}</h2>
        {article.description && <p className="text-sm opacity-80 line-clamp-3 mt-2">{article.description}</p>}
        {formattedDate && <p className="text-xs opacity-60 mt-2">เผยแพร่เมื่อ {formattedDate}</p>}
        <div className="card-actions justify-between items-center mt-4">
          <Link
            to={`/article/${encodeURIComponent(article.url)}`}
            className="btn btn-primary btn-sm"
            state={{ article }}
          >
            Read more
          </Link>
          <div className="tooltip" data-tip={isFavorited ? "Remove from favorites" : "Add to favorites"}>
            <button
              className={`btn btn-ghost btn-sm btn-circle ${isFavorited ? "text-yellow-400" : "text-gray-400"}`}
              onClick={() => dispatch(toggleFavorite(article))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
