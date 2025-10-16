# NewsNow (Vite + React + TypeScript)

เว็บแอปพลิเคชันสำหรับติดตามข่าวสารล่าสุด ดึงข้อมูลจาก [NewsAPI.org](https://newsapi.org/) และรองรับการบันทึกข่าวที่สนใจไว้ในเครื่องของคุณ

## ฟีเจอร์หลัก
- แสดงหัวข้อข่าวล่าสุด (Top Headlines) ตามประเทศ และค้นหาเนื้อหาภายในข่าว
- เปิดอ่านรายละเอียดข่าว พร้อมลิงก์สู่แหล่งข่าวต้นฉบับ
- กด “Favorite” เพื่อเก็บข่าวไว้ดูภายหลัง (เก็บบน `localStorage` ฝั่งผู้ใช้)

## เตรียมใช้งาน
1. ติดตั้ง dependencies

```powershell
npm install
```

2. ขอ API Key จาก [NewsAPI.org](https://newsapi.org/)
3. สร้างไฟล์ `.env.local` (หรือปรับไฟล์ `.env`) ในโฟลเดอร์ `week8-app` แล้วใส่ค่า:

```bash
VITE_NEWS_API_KEY=your_api_key_here
```

## คำสั่งที่สำคัญ

```powershell
# รัน dev server
npm run dev

# สร้างไฟล์สำหรับ production
npm run build

# ตรวจสอบ lint
npm run lint
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:5173` เพื่อดูผลลัพธ์

## โครงสร้างหลักของโค้ด
- `src/store/newsSlice.ts` – จัดการสถานะข่าวและเรียก API
- `src/store/favoritesSlice.ts` – จัดการข่าวที่บันทึกไว้ใน localStorage
- `src/routes/Home.tsx` – หน้าแสดงข่าวทั้งหมดและค้นหา
- `src/routes/ArticleDetail.tsx` – หน้าอ่านรายละเอียดข่าว
- `src/routes/Favorites.tsx` – หน้าข่าวที่บันทึกไว้

## หมายเหตุ
- โปรเจกต์ใช้ TailwindCSS + daisyUI สำหรับ UI component
- หากไม่มีการตั้งค่า `VITE_NEWS_API_KEY` แอปจะไม่สามารถดึงข้อมูลข่าวได้
