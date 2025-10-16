// Component สำหรับหน้า About (หน้าเกี่ยวกับ)
// เป็น Component แบบง่ายๆ ที่ไม่มี state หรือ logic ซับซ้อน
export default function About() {
  return (
    // ใช้ class "prose" จาก Tailwind Typography plugin เพื่อจัดสไตล์เนื้อหาให้อ่านง่ายโดยอัตโนมัติ
    <div className="container mx-auto p-4 prose lg:prose-xl">
      <h1>เกี่ยวกับโปรเจกต์</h1>
      <p>
        โปรเจกต์นี้เป็นเว็บแอปพลิเคชันสำหรับแสดงข้อมูลภาพยนตร์
        (เฉพาะที่กำลังฉาย) สร้างขึ้นเพื่อเป็นตัวอย่างการใช้งานเทคโนโลยีต่างๆ
        ร่วมกัน ได้แก่:
      </p>
      <ul>
        <li>
          <b>Build Tool:</b> Vite
        </li>
        <li>
          <b>Framework:</b> React + TypeScript
        </li>
        <li>
          <b>Routing:</b> React Router DOM (จัดการหน้า Home, Movie Detail,
          Favorites, About)
        </li>
        <li>
          <b>State Management:</b> Redux Toolkit (จัดการสถานะการโหลด, error,
          การแบ่งหน้า, การค้นหา)
        </li>
        <li>
          <b>Styling:</b> TailwindCSS + daisyUI (สำหรับสร้าง UI Components)
        </li>
        <li>
          <b>Data Fetching:</b> Axios (สำหรับดึงข้อมูลจาก API ภายนอก)
        </li>
      </ul>
    </div>
  );
}
