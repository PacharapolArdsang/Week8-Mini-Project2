import { useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { NewsArticle } from "../types/news";
import type { RootState, AppDispatch } from "../store/store";
import { toggleFavorite } from "../store/favoritesSlice";

const FALLBACK_IMAGE = "https://placehold.co/800x450?text=No+Image";

type LocationState = {
  article?: NewsArticle;
};

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const decodedUrl = id ? decodeURIComponent(id) : "";
  const location = useLocation();
  const locationArticle = (location.state as LocationState | null)?.article;

  const { items: headlines } = useSelector((state: RootState) => state.news);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch<AppDispatch>();

  const article = useMemo(() => {
    if (locationArticle && locationArticle.url === decodedUrl) {
      return locationArticle;
    }
    return (
      headlines.find((item) => item.url === decodedUrl) ||
      favorites.find((item) => item.url === decodedUrl)
    );
  }, [decodedUrl, favorites, headlines, locationArticle]);

  if (!decodedUrl) {
    return (
      <div className="card bg-base-100 shadow p-4 space-y-3">
        <div className="alert alert-error mb-4">ไม่พบลิงก์ของบทความ</div>
        <Link to="/" className="btn btn-neutral">
          กลับไปหน้าแรก
        </Link>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="card bg-base-100 shadow p-4 space-y-3">
        <div className="alert alert-warning mb-4">
          ไม่พบข้อมูลข่าว — ลองกลับไปเลือกข่าวอีกครั้งจากหน้า Home
        </div>
        <a href={decodedUrl} target="_blank" rel="noreferrer" className="btn btn-neutral">
          เปิดข่าวต้นฉบับ
        </a>
      </div>
    );
  }

  const isFavorited = favorites.some((item) => item.url === article.url);
  const published = new Date(article.publishedAt);
  const formattedDate = isNaN(published.getTime()) ? null : published.toLocaleString();

  return (
    <div className="card bg-base-100 shadow p-4 space-y-3">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div>
          <img
            src={article.urlToImage || FALLBACK_IMAGE}
            alt={article.title}
            className="w-full rounded-lg shadow"
          />
          <div className="mt-4 space-y-4">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            {formattedDate && <p className="text-sm opacity-60">เผยแพร่เมื่อ {formattedDate}</p>}
            {article.author && <p className="text-sm">ผู้เขียน: {article.author}</p>}
            {article.content && <p className="leading-relaxed whitespace-pre-line">{article.content}</p>}
            {article.description && !article.content && (
              <p className="leading-relaxed whitespace-pre-line">{article.description}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <a href={article.url} target="_blank" rel="noreferrer" className="btn btn-neutral">
                เปิดข่าวต้นฉบับ
              </a>
              <button
                className={`btn ${isFavorited ? "btn-warning" : "btn-outline"}`}
                onClick={() => dispatch(toggleFavorite(article))}
              >
                {isFavorited ? "★ อยู่ในรายการโปรดแล้ว" : "☆ เพิ่มในรายการโปรด"}
              </button>
            </div>
          </div>
        </div>
        <aside className="card bg-base-100 shadow p-4 space-y-3">
          <h2 className="card-title">ข้อมูลเพิ่มเติม</h2>
          {article.source?.name && <p>แหล่งข่าว: {article.source.name}</p>}
          <p>
            แชร์:
            <br />
            <a href={article.url} className="link" target="_blank" rel="noreferrer">
              {article.url}
            </a>
          </p>
          <Link to="/" className="btn btn-ghost">
            ← กลับหน้าแรก
          </Link>
        </aside>
      </div>
    </div>
  );
}
