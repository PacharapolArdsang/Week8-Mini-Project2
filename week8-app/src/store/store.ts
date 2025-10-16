// Import ฟังก์ชันสำหรับสร้าง Redux store จาก Redux Toolkit
// import { configureStore } from "@reduxjs/toolkit";
// สร้างและ export store หลักของแอปพลิเคชัน
// export const store = configureStore({
//   // reducer คือ object ที่รวบรวม reducer ทั้งหมดของแอปพลิเคชัน
//   reducer: {},
// });

// Import ฟังก์ชันสำหรับสร้าง Redux store จาก Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Import reducer ที่เราสร้างไว้สำหรับจัดการ state ของข่าว
import newsReducer from "./newsSlice";
// Import reducer สำหรับจัดการ state ของรายการโปรด
import favoritesReducer from "./favoritesSlice";

// สร้างและ export store หลักของแอปพลิเคชัน
export const store = configureStore({
  // reducer คือ object ที่รวบรวม reducer ทั้งหมดของแอปพลิเคชัน
  reducer: {
  // state ส่วนที่ชื่อ "news" จะถูกจัดการโดย newsReducer
  news: newsReducer,
    // state ส่วนที่ชื่อ "favorites" จะถูกจัดการโดย favoritesReducer
    favorites: favoritesReducer,
  },
});

// Export Type สำหรับ TypeScript เพื่อให้ง่ายต่อการใช้งานใน Component อื่นๆ

// RootState คือ Type ที่บอกโครงสร้างของ state ทั้งหมดใน store
// ใช้ ReturnType<typeof store.getState> เพื่อให้ได้ Type มาโดยอัตโนมัติ
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch คือ Type ของฟังก์ชัน dispatch ของ store
// ใช้สำหรับส่ง action ไปให้ reducer
export type AppDispatch = typeof store.dispatch;
