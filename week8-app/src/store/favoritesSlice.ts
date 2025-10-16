// src/store/favoritesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { NewsArticle } from "../types/news";

const FAV_KEY = "fav_news_articles";

const loadFavoritesFromStorage = (): NewsArticle[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? (JSON.parse(raw) as NewsArticle[]) : [];
  } catch {
    return [];
  }
};

const saveFavoritesToStorage = (items: NewsArticle[]) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(FAV_KEY, JSON.stringify(items));
};

interface FavoritesState {
  items: NewsArticle[];
}

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<NewsArticle>) => {
      const exists = state.items.some((item) => item.url === action.payload.url);
      if (exists) {
        state.items = state.items.filter((item) => item.url !== action.payload.url);
      } else {
        state.items.push(action.payload);
      }
      saveFavoritesToStorage(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      saveFavoritesToStorage(state.items);
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
