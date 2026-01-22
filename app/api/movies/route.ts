import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const apiKey = process.env.TMDB_API_KEY;
  const type = request.nextUrl.searchParams.get('type') || 'trending';

  if (!apiKey) {
    return NextResponse.json({ error: 'TMDB API key is not configured' }, { status: 500 });
  }

  let tmdbUrl = '';
  switch (type) {
    case 'trending': tmdbUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`; break;
    case 'upcoming': tmdbUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`; break;
    case 'top_rated': tmdbUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`; break;
    default: return NextResponse.json({ error: 'Invalid movie type' }, { status: 400 });
  }

  try {
    const response = await axios.get(tmdbUrl);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}