// Vercel Serverless Function เพื่อ proxy NewsAPI
// ทำให้เรียก API ผ่าน backend แทนที่จะเรียกจาก client โดยตรง
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.NEWS_API_KEY; // ใช้ NEWS_API_KEY แทน VITE_NEWS_API_KEY
  if (!apiKey) {
    return res.status(500).json({ 
      status: 'error',
      message: 'API key not configured' 
    });
  }

  try {
    const { 
      endpoint = 'top-headlines',
      country = 'us',
      category,
      q,
      searchIn,
      sortBy,
      language,
      pageSize = '20',
      page = '1'
    } = req.query;

    const params = new URLSearchParams();
    params.set('pageSize', pageSize as string);
    params.set('page', page as string);

    const apiEndpoint = `https://newsapi.org/v2/${endpoint}`;

    if (q) {
      params.set('q', q as string);
      if (searchIn) params.set('searchIn', searchIn as string);
      if (sortBy) params.set('sortBy', sortBy as string);
      if (language) params.set('language', language as string);
    } else if (endpoint === 'top-headlines') {
      params.set('country', country as string);
      if (category) params.set('category', category as string);
    }

    const response = await fetch(`${apiEndpoint}?${params.toString()}`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('NewsAPI proxy error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
