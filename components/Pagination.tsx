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
  const page = Math.floor(offset / limit) + 1;

  // คำนวณจำนวนหน้าทั้งหมด
  const pages = Math.max(1, Math.ceil(total / limit));

  const from = Math.min(offset + 1, total);
  const to = Math.min(offset + limit, total);

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="join">
        {/* ปุ่มย้อนกลับ (Previous) */}
        <button
          className="join-item btn"
          disabled={page <= 1}
          onClick={() => onChange(Math.max(0, offset - limit))}
        >
          « Prev
        </button>

        {/* ปุ่มสำหรับแสดงข้อมูลหน้าปัจจุบัน */}
        <button className="join-item btn btn-ghost" disabled>
          Showing {from} - {to} of {total}
        </button>

        {/* ปุ่มถัดไป (Next) */}
        <button
          className="join-item btn"
          disabled={page >= pages}
          onClick={() => onChange(offset + limit)}
        >
          Next »
        </button>
      </div>
    </div>
  );
}
