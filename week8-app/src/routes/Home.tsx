// Import hook ที่จำเป็นจาก React และ Redux
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import actions และ types จาก store ของเรา
import { fetchNowShowing, setOffset, setQuery } from "../store/moviesSlice";
import type { RootState, AppDispatch } from "../store/store";

// Import UI components
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";

// Component สำหรับหน้าแรก
export default function Home() {
  // useDispatch คือ hook สำหรับส่ง action ไปให้ Redux
  const dispatch = useDispatch<AppDispatch>();

  // useSelector คือ hook สำหรับดึงข้อมูลจาก Redux store
  // เราดึง state ทั้งหมดที่เกี่ยวกับ movies มาใช้งาน
  const { items, status, error, count, limit, offset, query } = useSelector((s: RootState) => s.movies);

  // useEffect จะทำงานเมื่อ component ถูก render หรือเมื่อค่าใน dependency array ([]) เปลี่ยนไป
  useEffect(() => {
    // สั่งให้ Redux เริ่มกระบวนการดึงข้อมูลหนัง โดยใช้ offset และ limit ปัจจุบัน
    dispatch(fetchNowShowing({ offset, limit }));
  }, [dispatch, offset, limit]); // จะทำงานใหม่เมื่อ offset หรือ limit เปลี่ยน (เช่น กดเปลี่ยนหน้า)

  // useMemo ใช้เพื่อคำนวณค่าที่ซับซ้อน และจะคำนวณใหม่ก็ต่อเมื่อ dependency เปลี่ยน
  // ในที่นี้คือการกรองหนังตามคำค้นหา (query)
  const filtered = useMemo(() => {
    if (!query) return items; // ถ้าไม่มีคำค้นหา ก็คืนค่าหนังทั้งหมด
    const q = query.toLowerCase(); // แปลงคำค้นหาเป็นตัวพิมพ์เล็ก
    // กรองเฉพาะหนังที่ชื่อภาษาไทยหรืออังกฤษตรงกับคำค้นหา
    return items.filter(m =>
      m.title?.toLowerCase().includes(q) ||
      m.title_en?.toLowerCase().includes(q)
    );
  }, [items, query]); // จะกรองใหม่เมื่อ items (ข้อมูลหนัง) หรือ query (คำค้นหา) เปลี่ยน

  return (
    <div className="container mx-auto p-4">
      {/* ส่วนของ UI สำหรับการค้นหาและ Refresh */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-sm"
          placeholder="ค้นหาชื่อหนัง (TH/EN)"
          value={query} // ค่าในช่องค้นหาผูกกับ query ใน Redux
          onChange={(e) => dispatch(setQuery(e.target.value))} // เมื่อพิมพ์ ให้ส่ง action ไปอัปเดต query
        />
        <button className="btn" onClick={() => dispatch(fetchNowShowing({ offset, limit }))}>
          Refresh
        </button>
      </div>

      {/* การแสดงผลตามสถานะการโหลดข้อมูล */}
      {status === "loading" && <div className="text-center"><span className="loading loading-lg loading-spinner"></span></div>}
      {status === "failed" && <div className="alert alert-error mb-4">{error}</div>}

      {/* แสดงตารางหนัง โดยส่งข้อมูลที่กรองแล้วไปให้ MovieGrid */}
      <MovieGrid items={filtered} />

      {/* แสดง Component สำหรับการแบ่งหน้า */}
      <Pagination
        total={count} // จำนวนหนังทั้งหมด
        limit={limit} // จำนวนหนังต่อหน้า
        offset={offset} // หน้าปัจจุบัน
        onChange={(newOffset) => dispatch(setOffset(newOffset))} // เมื่อเปลี่ยนหน้า ให้ส่ง action ไปอัปเดต offset
      />
    </div>
  );
}
