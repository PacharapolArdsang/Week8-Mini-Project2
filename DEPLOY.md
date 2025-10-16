# การ Deploy บน Vercel

## ปัญหา: Network Error บน Vercel

### สาเหตุ
NewsAPI Free Plan **ไม่อนุญาต**ให้เรียก API จาก Production Domain (เช่น Vercel)
- localhost ได้
- Production domain ไม่ได้

### วิธีแก้
ใช้ **Vercel Serverless Function** เป็น Proxy เพื่อเรียก NewsAPI จาก Backend แทน

---

## ขั้นตอนการ Deploy

### 1. เตรียม Environment Variables บน Vercel

1. ไปที่ [Vercel Dashboard](https://vercel.com/dashboard)
2. เลือก Project
3. ไปที่ **Settings** → **Environment Variables**
4. เพิ่ม Variable ใหม่:
   - **Key**: `NEWS_API_KEY`
   - **Value**: `[Your NewsAPI Key]`
   - **Environment**: เลือก **Production**, **Preview**, และ **Development**
5. กด **Save**

⚠️ **สำคัญ**: ใช้ `NEWS_API_KEY` (ไม่ใช่ `VITE_NEWS_API_KEY`) เพราะ Serverless Function จะอ่าน env จาก `process.env` ไม่ใช่ `import.meta.env`

### 2. Build และ Test Local (Optional)

```bash
# Build project
npm run build

# Preview build
npm run preview
```

### 3. Deploy ไปยัง Vercel

```bash
# ติดตั้ง Vercel CLI (ถ้ายังไม่มี)
npm i -g vercel

# Deploy
vercel

# หรือ Deploy production
vercel --prod
```

### 4. เช็คว่า API ทำงาน

เปิด: `https://your-app.vercel.app/api/news?endpoint=top-headlines&country=us`

ถ้าเจอข้อมูลข่าว → ✅ สำเร็จ!

---

## 🛠️ โครงสร้างไฟล์

```
📁 api/
  └── news.ts          ← Vercel Serverless Function (Proxy)
📁 src/
  └── store/
      └── newsSlice.ts ← เรียก API แบบ Smart (Dev vs Prod)
```

---

## 🔍 วิธีการทำงาน

### Development (localhost)
```
Frontend → NewsAPI (โดยตรง) ✅
```

### Production (Vercel)
```
Frontend → /api/news (Proxy) → NewsAPI ✅
```

---

## ⚙️ Configuration

### `newsSlice.ts` - Smart API Calling
```typescript
const isProduction = import.meta.env.PROD;

if (isProduction) {
  // เรียกผ่าน proxy
  res = await axios.get('/api/news?...');
} else {
  // เรียกโดยตรง
  res = await axios.get('https://newsapi.org/v2/...');
}
```

### `api/news.ts` - Serverless Function
- รับ request จาก Frontend
- เรียก NewsAPI ด้วย API Key จาก Backend
- ส่ง response กลับไป

---

## ❓ FAQ

### Q: ทำไมต้องใช้ Proxy?
**A:** NewsAPI Free Plan บล็อกการเรียกจาก Production Domain เพื่อป้องกัน API Key รั่วไหล

### Q: ทำไม localhost ใช้ได้แต่ Vercel ไม่ได้?
**A:** NewsAPI ตรวจสอบ Origin header และอนุญาตเฉพาะ localhost

### Q: มี Alternative อื่นไหม?
**A:** 
1. อัพเกรด NewsAPI เป็น Paid Plan ($449/เดือน)
2. ใช้ News API อื่น เช่น GNews API, NewsData.io
3. ใช้ RSS Feeds

---

## 🎉 เสร็จสิ้น

ตอนนี้แอปของคุณจะทำงานได้ทั้งบน localhost และ Vercel แล้วครับ! 🚀
