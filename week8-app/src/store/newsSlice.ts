import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { NewsArticle, NewsResponse } from "../types/news";

type NewsState = {
  items: NewsArticle[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  total: number;
  limit: number;
  offset: number;
  query: string;
  country: string;
  category?: string;
};

const initialState: NewsState = {
  items: [],
  status: "idle",
  total: 0,
  limit: 20,
  offset: 0,
  query: "",
  country: "us",
  category: undefined,
};

export const fetchTopHeadlines = createAsyncThunk<
  NewsResponse,
  { offset?: number; limit?: number; country?: string; category?: string; query?: string }
>("news/fetchTopHeadlines", async ({ offset = 0, limit = 20, country = "us", category, query }) => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  if (!apiKey) {
    throw new Error("Missing NewsAPI key. Please set VITE_NEWS_API_KEY in your environment.");
  }

  const page = Math.floor(offset / limit) + 1;
  const trimmedQuery = query?.trim() ?? "";
  const params = new URLSearchParams({
    pageSize: String(limit),
    page: String(page),
  });

  let endpoint = "https://newsapi.org/v2/top-headlines";

  if (trimmedQuery) {
    endpoint = "https://newsapi.org/v2/everything";
    params.set("q", trimmedQuery);
    params.set("searchIn", "title,description,content");
    params.set("sortBy", "publishedAt");
    params.set("language", "en");
  } else {
    params.set("country", country);
    if (category) {
      params.set("category", category);
    }
  }

  const res = await axios.get<NewsResponse>(`${endpoint}?${params.toString()}`, {
    headers: {
      "X-Api-Key": apiKey,
    },
    timeout: 15000,
  });

  if (res.data.status !== "ok") {
    throw new Error("NewsAPI returned an error status");
  }

  return res.data;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.offset = 0;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
      state.offset = 0;
    },
    setCategory(state, action: PayloadAction<string | undefined>) {
      state.category = action.payload;
      state.offset = 0;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopHeadlines.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.articles ?? [];
        state.total = action.payload.totalResults ?? state.items.length;
      })
      .addCase(fetchTopHeadlines.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load news";
      });
  },
});

export const { setOffset, setQuery, setCountry, setCategory, reset } = newsSlice.actions;
export default newsSlice.reducer;
