import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTopHeadlines, setCategory, setOffset } from "../store/newsSlice";
import type { RootState, AppDispatch } from "../store/store";
import ArticleGrid from "../components/ArticleGrid";
import Pagination from "../components/Pagination";

// หมวดหมู่ข่าวที่ NewsAPI รองรับ
const CATEGORIES = [
  { id: "general", name: "ทั่วไป", icon: "📰", color: "bg-blue-500" },
  { id: "business", name: "ธุรกิจ", icon: "💼", color: "bg-green-500" },
  { id: "technology", name: "เทคโนโลยี", icon: "💻", color: "bg-purple-500" },
  { id: "entertainment", name: "บันเทิง", icon: "🎬", color: "bg-pink-500" },
  { id: "sports", name: "กีฬา", icon: "⚽", color: "bg-orange-500" },
  { id: "science", name: "วิทยาศาสตร์", icon: "🔬", color: "bg-teal-500" },
  { id: "health", name: "สุขภาพ", icon: "🏥", color: "bg-red-500" },
] as const;

export default function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId?: string }>();
  
  const { items, status, error, total, limit, offset, country } = useSelector(
    (state: RootState) => state.news
  );

  // ถ้ามี categoryId ใน URL ให้ fetch ข่าวตามหมวดนั้น
  useEffect(() => {
    if (categoryId) {
      dispatch(setCategory(categoryId));
      dispatch(setOffset(0));
    }
  }, [dispatch, categoryId]);

  // Fetch ข่าวเมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchTopHeadlines({ offset, limit, country, category: categoryId, query: "" }));
    }
  }, [dispatch, offset, limit, country, categoryId]);

  // ถ้าไม่มี categoryId แสดงหน้าเลือกหมวดหมู่
  if (!categoryId) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">📑 หมวดหมู่ข่าว</h1>
          <p className="text-base-content/70">เลือกหมวดหมู่ที่คุณสนใจเพื่ออ่านข่าวสาร</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/categories/${category.id}`)}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="card-body items-center text-center">
                <div className={`text-6xl mb-4 p-6 rounded-full ${category.color} bg-opacity-10`}>
                  {category.icon}
                </div>
                <h2 className="card-title text-2xl">{category.name}</h2>
                <p className="text-base-content/60 capitalize">{category.id}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // หาข้อมูลหมวดหมู่ปัจจุบัน
  const currentCategory = CATEGORIES.find((cat) => cat.id === categoryId);

  return (
    <div className="container mx-auto p-4">
      {/* Header ของหมวดหมู่ */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/categories")}
          className="btn btn-circle btn-ghost"
          title="กลับไปหน้าหมวดหมู่"
        >
          ←
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {currentCategory && (
              <span className="text-4xl">{currentCategory.icon}</span>
            )}
            <div>
              <h1 className="text-3xl font-bold">
                {currentCategory?.name || categoryId}
              </h1>
              <p className="text-base-content/70">
                ข่าวสารในหมวด {currentCategory?.name}
              </p>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(fetchTopHeadlines({ offset: 0, limit, country, category: categoryId, query: "" }))}
          disabled={status === "loading"}
        >
          รีเฟรช
        </button>
      </div>

      {/* สถานะการโหลด */}
      {status === "loading" && (
        <div className="text-center py-6">
          <span className="loading loading-lg loading-spinner" />
          <p className="mt-2 text-base-content/70">กำลังโหลดข่าว...</p>
        </div>
      )}

      {/* แสดง Error */}
      {status === "failed" && (
        <div className="alert alert-error mb-4">
          <span>{error || "เกิดข้อผิดพลาดในการโหลดข่าว"}</span>
        </div>
      )}

      {/* แสดงข่าว */}
      {status === "succeeded" && items.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-xl text-base-content/70">ไม่พบข่าวในหมวดนี้</p>
        </div>
      )}

      <ArticleGrid items={items} />

      {/* Pagination */}
      {status !== "loading" && items.length > 0 && (
        <Pagination
          total={total}
          limit={limit}
          offset={offset}
          onChange={(nextOffset) => dispatch(setOffset(nextOffset))}
        />
      )}

      {/* แสดงหมวดหมู่อื่นๆ ที่น่าสนใจ */}
      <div className="mt-12 pt-8 border-t border-base-300">
        <h2 className="text-2xl font-bold mb-4">หมวดหมู่อื่นๆ</h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.filter((cat) => cat.id !== categoryId).map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/categories/${category.id}`)}
              className="btn btn-outline gap-2"
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
