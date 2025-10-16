import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import ArticleGrid from "../components/ArticleGrid";

export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">บทความที่บันทึกไว้</h1>

      {!favorites.length && (
        <div className="text-center opacity-70 p-10">
          ยังไม่มีข่าวที่บันทึกไว้ — ไปที่หน้า Home แล้วกด “Favorite” ที่การ์ดข่าว
        </div>
      )}

      {favorites.length > 0 && <ArticleGrid items={favorites} />}
    </div>
  );
}
