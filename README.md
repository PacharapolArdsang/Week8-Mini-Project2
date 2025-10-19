# NewsNow (Vite + React + TypeScript)

เว็บแอปพลิเคชันสำหรับติดตามข่าวสารล่าสุด ดึงข้อมูลที่ [NewsAPI.org](https://newsapi.org/) 

# ฟีเจอร์หลัก
- แสดงหัวข้อข่าวล่าสุดตามประเทศ และค้นหาข่าว
- เปิดอ่านรายละเอียดข่าว
- Favorite เพื่อเก็บข่าวไว้ดูภายหลัง เก็บบน localStorage ของผู้ใช้

## Setup ที่ต้องทำ ถ้าไมข่าว

1. ขอ API Key จาก [NewsAPI.org](https://newsapi.org/)
2. สร้างไฟล์ `.env.local` ไว้ใน project
    VITE_NEWS_API_KEY=eb2be5de84624b1cb4f882e930dbd952

## โครงสร้างหลักของโค้ด
- `src/store/newsSlice.ts` – จัดการสถานะข่าวและเรียก API
- `src/store/favoritesSlice.ts` – จัดการข่าวที่บันทึกไว้ใน localStorage
- `src/routes/Home.tsx` – หน้าแสดงข่าวทั้งหมดและค้นหา
- `src/routes/ArticleDetail.tsx` – หน้าอ่านรายละเอียดข่าว
- `src/routes/Favorites.tsx` – หน้าข่าวที่บันทึกไว้

