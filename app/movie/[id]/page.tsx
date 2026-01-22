// NO "use client" at the top. This is a Server Component.

import { Suspense } from 'react';
import axios from 'axios';
import MovieDetailsClient from '@/components/MovieDetailsClient'; // Import our Client Component

// --- Type Definitions ---
type MovieDetails = {
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
};
type Trailer = {
  key: string;
  name: string;
};

// --- Data Fetching Function (runs on the server) ---
async function getMovieData(id: string) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB API key is not configured.");
  if (!id || id === 'undefined') throw new Error("Movie ID is missing or invalid.");

  const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;

  try {
    const [detailsRes, videosRes] = await Promise.all([
      axios.get(detailsUrl),
      axios.get(videosUrl),
    ]);
    const trailers: Trailer[] = videosRes.data.results.filter(
      (v: any) => v.site === 'YouTube' && v.type === 'Trailer'
    );
    return { details: detailsRes.data as MovieDetails, trailers };
  } catch (error) {
    console.error("Could not fetch movie data.", error);
    throw new Error("Could not find data for the requested movie.");
  }
}

// --- Loading Skeleton ---
const DetailPageSkeleton = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg mb-4"></div>
        <div className="flex items-start gap-2 mb-8"><div className="h-10 w-24 bg-gray-700 rounded-md"></div><div className="h-10 w-24 bg-gray-700 rounded-md"></div></div>
        <div className="text-center"><div className="h-12 w-3/4 bg-gray-700 rounded mx-auto mb-4"></div><div className="h-6 w-1/3 bg-gray-700 rounded mx-auto mb-6"></div><div className="h-4 w-full bg-gray-700 rounded mx-auto"></div><div className="h-4 w-full bg-gray-700 rounded mx-auto mt-2"></div><div className="h-4 w-5/6 bg-gray-700 rounded mx-auto mt-2"></div></div>
    </div>
);

// --- Async Component to handle data fetching ---
async function MovieDetails({ id }: { id: string }) {
  const { details, trailers } = await getMovieData(id);
  // This renders the Client Component and passes the server-fetched data as props
  return <MovieDetailsClient details={details} trailers={trailers} />;
}


// --- Main Page Component (Corrected based on your working code) ---
export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // This type is correct
}) {
  const { id } = await params; // Awaiting the params promise is the fix

  return (
    <main>
      <Suspense fallback={<DetailPageSkeleton />}>
        <MovieDetails id={id} />
      </Suspense>
    </main>
  );
}