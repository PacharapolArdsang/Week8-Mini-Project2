// Import ที่จำเป็น
import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import type { RootState, AppDispatch } from "../store/store";

// กำหนด Type ของ Props ที่ Component นี้จะได้รับ
type Props = { movie: Movie };

// Component สำหรับแสดงผลการ์ดหนัง 1 ใบ (เวอร์ชันใช้ Redux)
export default function MovieCard({ movie }: Props) {
  // useDispatch สำหรับส่ง action ไปยัง store
  const dispatch = useDispatch<AppDispatch>();
  // useSelector สำหรับดึง state จาก store
  const { ids: favIds } = useSelector((state: RootState) => state.favorites);

  // เช็คว่าหนังใบนี้อยู่ในรายการโปรดหรือไม่ จาก state ใน Redux
  const isFavorited = favIds.includes(String(movie.id));

  const handleFavoriteClick = () => {
    // เมื่อคลิก, dispatch action `toggleFavorite` พร้อมกับส่ง ID ของหนังไป
    dispatch(toggleFavorite(movie.id));
  };

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition">
      <figure className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.images?.[0]?.url || "https://placehold.co/400x600?text=No+Poster"}
          alt={movie.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base line-clamp-2 h-12">{movie.title}</h2>
        {movie.title_en && (
          <p className="text-sm opacity-70 truncate">{movie.title_en}</p>
        )}
        <div className="card-actions justify-between items-center mt-3">
          <Link to={`/movie/${movie.id}`} className="btn btn-primary btn-sm">
            Details
          </Link>
          <button
            className={`btn btn-outline btn-sm ${isFavorited ? "btn-secondary" : ""}`}
            onClick={handleFavoriteClick}
          >
            {isFavorited ? "★ Favorited" : "☆ Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}