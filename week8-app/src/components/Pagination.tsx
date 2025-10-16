// กำหนด Type ของ Props ที่ Component นี้จะได้รับ
type Props = {
  total: number; // จำนวน item ทั้งหมด
  limit: number; // จำนวน item ต่อหน้า
  offset: number; // ตำแหน่งเริ่มต้นของข้อมูลในหน้าปัจจุบัน
  onChange: (newOffset: number) => void; // Callback function ที่จะถูกเรียกเมื่อมีการเปลี่ยนหน้า
};

// Component สำหรับจัดการและแสดงผล Pagination
export default function Pagination({ total, limit, offset, onChange }: Props) {
  // คำนวณหน้าปัจจุบัน จาก offset และ limit
  // เช่น offset=40, limit=40 -> page = 2
  const page = Math.floor(offset / limit) + 1;

  // คำนวณจำนวนหน้าทั้งหมด
  // เช่น total=101, limit=40 -> pages = 3
  // Math.max(1, ...) เพื่อให้แน่ใจว่ามีอย่างน้อย 1 หน้าเสมอ
  const pages = Math.max(1, Math.ceil(total / limit));

  return (
    // ใช้ join component ของ DaisyUI เพื่อรวมปุ่มเข้าด้วยกัน
    <div className="join mt-6">
      {/* ปุ่มย้อนกลับ (Previous) */}
      <button
        className="join-item btn"
        disabled={page <= 1} // ปิดการใช้งานปุ่มถ้าอยู่หน้าแรก
        onClick={() => onChange(Math.max(0, offset - limit))} // เมื่อคลิก ให้คำนวณ offset ใหม่แล้วเรียก onChange
      >
        « Prev
      </button>

      {/* ปุ่มสำหรับแสดงข้อมูลหน้าปัจจุบัน (กดไม่ได้) */}
      <button className="join-item btn btn-ghost" disabled>
        Page {page} / {pages}
      </button>

      {/* ปุ่มถัดไป (Next) */}
      <button
        className="join-item btn"
        disabled={page >= pages} // ปิดการใช้งานปุ่มถ้าอยู่หน้าสุดท้าย
        onClick={() => onChange(offset + limit)} // เมื่อคลิก ให้คำนวณ offset ใหม่แล้วเรียก onChange
      >
        Next »
      </button>
    </div>
  );
}
