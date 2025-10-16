// Import Outlet จาก react-router-dom สำหรับแสดงผล component ลูกตาม path
import { Outlet } from "react-router-dom";
// Import Navbar component
import Navbar from "./components/Navbar";

// นี่คือ Component หลักของแอปพลิเคชัน ทำหน้าที่เป็น Layout
export default function App() {
  return (
    // ใช้ theme "cupcake" ของ DaisyUI และกำหนดให้ความสูงขั้นต่ำเต็มหน้าจอ และสีพื้นหลัง
    <div data-theme="cupcake" className="min-h-screen bg-base-200">
      {/* แสดง Navbar ด้านบนสุดของทุกหน้า */}
      <Navbar />

      {/* Outlet คือพื้นที่ที่เนื้อหาของแต่ละหน้า (ตาม URL) จะถูกนำมาแสดงผล */}
      {/* เช่น ถ้า URL คือ / ก็จะแสดง Home, ถ้าเป็น /favorites ก็จะแสดง Favorites */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* แสดง Footer ด้านล่างสุดของทุกหน้า */}
      <footer className="footer footer-center p-6 bg-base-100 text-base-content mt-10">
        <aside>
          <p>© {new Date().getFullYear()} MovieNow — Teaching</p>
        </aside>
      </footer>
    </div>
  );
}
