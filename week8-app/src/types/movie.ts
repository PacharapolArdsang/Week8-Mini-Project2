// Type สำหรับ Response จาก API ที่เป็นลิสต์ของหนัง
export type MoviesResponse = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Movie[];
};

// Type หลักสำหรับข้อมูลหนัง
export type Movie = {
  id: number | string;
  title: string; // ชื่่อหลัก (มักจะเป็นภาษาไทย)
  title_en?: string; // ชื่่อหลัก (มักจะเป็นภาษาไทย)
  language: string;
  release_date?: string;
  duration?: number;
  // ข้อมูลรายละเอียด (อาจมีหลายภาษา)
  details: MovieDetailInfo[];
  // วิดีโอ (อาจมีหลายตัว)
  videos: MovieVideo[];
  // รูปภาพ (อาจมีหลายรูป)
  images: MovieImage[];
  genres?: string[] | string;
};
// Type สำหรับข้อมูลรายละเอียดในแต่ละภาษา
export type MovieDetailInfo = {
  id: number;
  language: string;
  title: string;
  director?: string;
  tagline?: string;
  cast?: string;
  storyline?: string;
};

// Type สำหรับข้อมูลวิดีโอ (Trailer)
export type MovieVideo = {
  url: string;
  source: string;
  kind: string;
  language: string;
};

// Type สำหรับข้อมูลรูปภาพ
export type MovieImage = {
  url: string;
  type: "Backdrop" | "Poster";
  order: number;
};
