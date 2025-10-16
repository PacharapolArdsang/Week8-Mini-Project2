// src/store/favoritesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
const FAV_KEY = "fav_movie_ids";

// ฟังก์ชันสำหรับโหลด ID จาก localStorage
const loadFavoritesFromStorage = (): string[] => {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// ฟังก์ชันสำหรับบันทึก ID ลง localStorage
const saveFavoritesToStorage = (ids: string[]) => {
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
};

interface FavoritesState {
  ids: string[];
}

// โหลด state เริ่มต้นจาก localStorage
const initialState: FavoritesState = {
  ids: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Reducer สำหรับการเพิ่ม/ลบ หนังโปรด
    toggleFavorite: (state, action: PayloadAction<string | number>) => {
      const id = String(action.payload);
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((favId) => favId !== id);
      } else {
        state.ids.push(id);
      }
      // บันทึก state ล่าสุดลง localStorage ทุกครั้งที่มีการเปลี่ยนแปลง
      saveFavoritesToStorage(state.ids);
    },
  },
});

// Export action และ reducer
export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
