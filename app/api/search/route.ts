import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const apiKey = process.env.TMDB_API_KEY;
  const query = request.nextUrl.searchParams.get('query');

  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  if (!query) return NextResponse.json({ error: 'Search query is required' }, { status: 400 });

  const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(tmdbUrl);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search movies' }, { status: 500 });
  }
}