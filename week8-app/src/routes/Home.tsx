import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopHeadlines, setOffset, setQuery } from "../store/newsSlice";
import type { RootState, AppDispatch } from "../store/store";
import ArticleGrid from "../components/ArticleGrid";
import Pagination from "../components/Pagination";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error, total, limit, offset, query, country, category } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchTopHeadlines({ offset, limit, country, category, query }));
  }, [dispatch, offset, limit, country, category, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((article) => {
      const title = article.title?.toLowerCase() ?? "";
      const description = article.description?.toLowerCase() ?? "";
      const content = article.content?.toLowerCase() ?? "";
      return title.includes(q) || description.includes(q) || content.includes(q);
    });
  }, [items, query]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
        <input
          type="text"
          className="input input-bordered w-full md:max-w-sm"
          placeholder="ค้นหาหัวข้อข่าว"
          value={query}
          onChange={(event) => dispatch(setQuery(event.target.value))}
        />
        <button
          className="btn md:ml-auto"
          onClick={() => dispatch(fetchTopHeadlines({ offset: 0, limit, country, category, query }))}
          disabled={status === "loading"}
        >
          Refresh
        </button>
      </div>

      {status === "loading" && (
        <div className="text-center py-6">
          <span className="loading loading-lg loading-spinner" />
        </div>
      )}

      {status === "failed" && (
        <div className="alert alert-error mb-4">{error || "เกิดข้อผิดพลาดในการโหลดข่าว"}</div>
      )}

      <ArticleGrid items={filtered} />

      {status !== "loading" && filtered.length > 0 && (
        <Pagination
          total={total}
          limit={limit}
          offset={offset}
          onChange={(nextOffset) => dispatch(setOffset(nextOffset))}
        />
      )}
    </div>
  );
}
