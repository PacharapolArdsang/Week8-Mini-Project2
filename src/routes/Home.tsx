import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTopHeadlines, setOffset, setQuery } from "../store/newsSlice";
import type { RootState, AppDispatch } from "../store/store";
import ArticleGrid from "../components/ArticleGrid";
import Pagination from "../components/Pagination";

// หมวดหมู่ข่าวแนะนำ
const QUICK_CATEGORIES = [
  { id: "technology", name: "เทคโนโลยี", icon: "💻" },
  { id: "business", name: "ธุรกิจ", icon: "💼" },
  { id: "sports", name: "กีฬา", icon: "⚽" },
  { id: "entertainment", name: "บันเทิง", icon: "🎬" },
];

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

  // return (
  //   <div className="container mx-auto p-4">
  //     <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
  //       <input
  //         type="text"
  //         className="input input-bordered w-full md:max-w-sm"
  //         placeholder="ค้นหาหัวข้อข่าว"
  //         value={query}
  //         onChange={(event) => dispatch(setQuery(event.target.value))}
  //       />
  //       <button
  //         className="btn md:ml-auto"
  //         onClick={() => dispatch(fetchTopHeadlines({ offset: 0, limit, country, category, query }))}
  //         disabled={status === "loading"}
  //       >
  //         Refresh
  //       </button>
  //     </div>

  //     {status === "loading" && (
  //       <div className="text-center py-6">
  //         <span className="loading loading-lg loading-spinner" />
  //       </div>
  //     )}

  //     {status === "failed" && (
  //       <div className="alert alert-error mb-4">{error || "เกิดข้อผิดพลาดในการโหลดข่าว"}</div>
  //     )}

  //     <ArticleGrid items={filtered} />

  //     {status !== "loading" && filtered.length > 0 && (
  //       <Pagination
  //         total={total}
  //         limit={limit}
  //         offset={offset}
  //         onChange={(nextOffset) => dispatch(setOffset(nextOffset))}
  //       />
  //     )}
  //   </div>
  // );

  return (
    <div className="container mx-auto p-4">
      {/* Quick Category Links */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">หมวดหมู่ยอดนิยม</h2>
          <button
            onClick={() => navigate("/categories")}
            className="btn btn-sm btn-ghost"
          >
            ดูทั้งหมด →
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.id}`)}
              className="btn btn-sm btn-outline gap-2"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            className="input input-bordered w-full pl-10"
            placeholder="ค้นหาหัวข้อข่าว"
            value={query}
            onChange={(event) => dispatch(setQuery(event.target.value))}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
        <div className="tooltip" data-tip="Refresh">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => dispatch(fetchTopHeadlines({ offset: 0, limit, country, category, query }))}
            disabled={status === "loading"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5" /><path d="M4 9a9 9 0 0114.13-3.13" /><path d="M20 15a9 9 0 01-14.13 3.13" /></svg>
          </button>
        </div>
      </div>

      {status === "loading" && (
        <div className="text-center py-10">
          <span className="loading loading-lg loading-spinner" />
        </div>
      )}

      {status === "failed" && (
        <div role="alert" className="alert alert-error my-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error || "เกิดข้อผิดพลาดในการโหลดข่าว"}</span>
        </div>
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
