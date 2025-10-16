// Import hook และเครื่องมือที่จำเป็น
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import type { Movie, MovieDetailInfo } from "../types/movie";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import type { RootState, AppDispatch } from "../store/store";

// Component สำหรับหน้ารายละเอียดหนัง (เวอร์ชันใช้ Redux)
export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  // --- Redux-related hooks ---
  const dispatch = useDispatch<AppDispatch>();
  const { ids: favIds } = useSelector((state: RootState) => state.favorites);
  // ---------------------------

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      setStatus("loading");
      try {
        const url = `https://movie-api-ten-theta.vercel.app/api/data/movie/${id}`;
        const res = await axios.get<Movie>(url);
        setMovie(res.data || null);
        setStatus("idle");
      } catch {
        setStatus("error");
      }
    };
    run();
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <span className="loading loading-lg loading-spinner"></span>
        </div>
      </div>
    );
  }
  if (status === "error" || !movie) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="alert alert-error mb-4">ไม่พบข้อมูลหนังที่เลือก</div>
        <Link to="/" className="btn">
          ← กลับหน้าแรก
        </Link>
      </div>
    );
  }

  const detailInfo: MovieDetailInfo | undefined =
    movie.details.find((d) => d.language === "th") || movie.details[0];
  const posterUrl =
    movie.images?.find((img) => img.type === "Poster")?.url ||
    movie.images?.[0]?.url ||
    "https://placehold.co/600x900?text=No+Poster";
  const trailerUrl = movie.videos?.[0]?.url;

  // เช็คสถานะหนังโปรดจาก Redux state
  const isFavorited = favIds.includes(String(movie.id));

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="btn btn-ghost mb-4">
        ← กลับหน้าแรก
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <img
          src={posterUrl}
          alt={movie.title}
          className="rounded-lg shadow-lg w-full"
        />
        <div className="md:col-span-2">
          <h1 className="text-3xl lg:text-4xl font-bold">
            {detailInfo?.title || movie.title}
          </h1>
          {movie.title_en && (
            <p className="text-xl opacity-70 mb-2">{movie.title_en}</p>
          )}

          <div className="flex flex-wrap gap-2 my-4">
            {Array.isArray(movie.genres)
              ? movie.genres.map((g) => (
                  <div key={g} className="badge badge-outline">
                    {g}
                  </div>
                ))
              : movie.genres
              ? String(movie.genres)
                  .split(",")
                  .map((g) => (
                    <div key={g.trim()} className="badge badge-outline">
                      {g.trim()}
                    </div>
                  ))
              : null}
          </div>

          {detailInfo?.storyline && (
            <>
              <h2 className="text-xl font-bold mt-6 mb-2">
                เรื่องย่อ (Storyline)
              </h2>
              <p className="mb-4 whitespace-pre-wrap">{detailInfo.storyline}</p>
            </>
          )}

          {detailInfo?.director && (
            <>
              <h2 className="text-xl font-bold mt-6 mb-2">
                ผู้กำกับ (Director)
              </h2>
              <p>{detailInfo.director}</p>
            </>
          )}

          {detailInfo?.cast && (
            <>
              <h2 className="text-xl font-bold mt-6 mb-2">นักแสดง (Cast)</h2>
              <p>{detailInfo.cast}</p>
            </>
          )}

          <div className="flex gap-2 mt-8">
            <button
              className={`btn ${isFavorited ? "btn-secondary" : "btn-outline"}`}
              onClick={() => dispatch(toggleFavorite(movie.id))}
            >
              {isFavorited ? "★ Favorited" : "☆ Favorite"}
            </button>
            {trailerUrl && (
              <a
                className="btn btn-primary"
                href={trailerUrl}
                target="_blank"
                rel="noreferrer"
              >
                ชมตัวอย่าง (Trailer)
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
