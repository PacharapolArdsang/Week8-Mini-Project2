// Import Type ของ Movie และ Component MovieCard
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

// Component นี้ทำหน้าที่แสดงผลตารางของหนัง
// รับ props เป็น items ซึ่งเป็น array ของ Movie
export default function MovieGrid({ items }: { items: Movie[] }) {
  // ตรวจสอบว่ามีหนังใน array หรือไม่
  if (!items?.length) {
    // ถ้าไม่มี ให้แสดงข้อความนี้
    return <div className="text-center opacity-70 p-10">No movies to display.</div>;
  }

  // ถ้ามีหนัง ให้แสดงผลเป็นตาราง
  return (
    // ใช้ Tailwind CSS ในการสร้าง Grid Layout ที่ปรับขนาดตามหน้าจอ (responsive)
    // - grid-cols-2: 2 คอลัมน์ในจอเล็ก
    // - md:grid-cols-3: 3 คอลัมน์ในจอขนาดกลาง
    // - lg:grid-cols-5: 5 คอลัมน์ในจอขนาดใหญ่
    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {/* วนลูป (map) ข้อมูลหนังแต่ละเรื่องใน items array */}
      {/* แล้วส่งไปให้ MovieCard component แสดงผลทีละใบ */}
      {/* key={m.id} เป็นสิ่งสำคัญที่ React ใช้แยกแยะแต่ละ item ใน list */}
      {items.map(m => <MovieCard key={m.id} movie={m} />)}
    </div>
  );
}