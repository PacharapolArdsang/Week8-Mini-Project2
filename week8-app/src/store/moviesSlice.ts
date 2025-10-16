// นำเข้าเครื่องมือที่จำเป็นจาก Redux Toolkit และ axios สำหรับการเรียก API
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
// นำเข้า Type Definitions เพื่อความถูกต้องของข้อมูล
import type { Movie, MoviesResponse } from "../types/movie";

// กำหนดโครงสร้าง (Interface) ของ State สำหรับ Slice นี้
type MoviesState = {
  items: Movie[]; // รายการหนังที่ดึงมาจาก API
  status: "idle" | "loading" | "succeeded" | "failed"; // สถานะการดึงข้อมูล
  error?: string; // สำหรับเก็บข้อความ error หากการดึงข้อมูลล้มเหลว
  count: number; // จำนวนหนังทั้งหมดจาก API
  limit: number; // จำนวนหนังที่ดึงมาต่อหนึ่งครั้ง
  offset: number; // ตำแหน่งเริ่มต้นของการดึงข้อมูล (สำหรับ Pagination)
  query: string; // คำค้นหา (ยังไม่ได้ใช้ใน thunk)
  ordering: string; // การจัดเรียงข้อมูล
};

// กำหนดค่าเริ่มต้นสำหรับ State ของ movies
const initialState: MoviesState = {
  items: [],
  status: "idle", // สถานะเริ่มต้นคือ 'ว่าง'
  count: 0,
  limit: 20,
  offset: 0,
  query: "",
  ordering: "",
};

// สร้าง Async Thunk สำหรับการดึงข้อมูลหนัง
// createAsyncThunk จะสร้าง Action 3 สถานะอัตโนมัติ: pending, fulfilled, rejected
export const fetchNowShowing = createAsyncThunk<
  MoviesResponse, // ประเภทข้อมูลที่จะ return เมื่อสำเร็จ
  { offset?: number; limit?: number; ordering?: string } // ประเภทของ Argument ที่รับเข้ามา
>(
  "movies/fetchNowShowing", // ชื่อของ Action Type
  async ({ offset = 0, limit = 20 }) => {
    // สร้าง URL สำหรับเรียก API พร้อมพารามิเตอร์ต่างๆ
    const url = `https://movie-api-ten-theta.vercel.app/api/data?offset=${offset}&limit=${limit}`;
    // เรียก API ด้วย axios และกำหนด timeout 15 วินาที
    const res = await axios.get<MoviesResponse>(url, { timeout: 15000 });
    // คืนค่าข้อมูลที่ได้จาก API (res.data)
    return res.data;
  }
);

// สร้าง Slice ของ State ที่ชื่อว่า 'movies'
const moviesSlice = createSlice({
  name: "movies", // ชื่อของ slice
  initialState, // State เริ่มต้น
  // Reducers: ฟังก์ชันสำหรับอัปเดต State แบบ Synchronous (ทำงานทันที)
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
    // ฟังก์ชันสำหรับรีเซ็ต State กลับไปเป็นค่าเริ่มต้น
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  // extraReducers: สำหรับจัดการ Action ที่สร้างจากภายนอก Slice (เช่นจาก createAsyncThunk)
  extraReducers: (builder) => {
    builder
      // กรณี Action 'fetchNowShowing' อยู่ในสถานะ 'pending' (กำลังโหลด)
      .addCase(fetchNowShowing.pending, (state) => {
        state.status = "loading";
        state.error = undefined; // ล้าง error เก่า
      })
      // กรณี Action 'fetchNowShowing' อยู่ในสถานะ 'fulfilled' (โหลดสำเร็จ)
      .addCase(fetchNowShowing.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.results ?? []; // นำข้อมูลหนังมาใส่ใน state
        state.count = action.payload.count ?? state.items.length; // อัปเดตจำนวนหนังทั้งหมด
      })
      // กรณี Action 'fetchNowShowing' อยู่ในสถานะ 'rejected' (โหลดล้มเหลว)
      .addCase(fetchNowShowing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Fetch failed"; // เก็บข้อความ error
      });
  },
});

// Export actions จาก reducers เพื่อให้ Component อื่นๆ เรียกใช้ได้ผ่าน dispatch
export const { setOffset, setQuery, setOrdering, reset } = moviesSlice.actions;
// Export reducer เพื่อนำไปรวมใน store หลัก
export default moviesSlice.reducer;
