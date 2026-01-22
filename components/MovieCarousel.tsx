import { Suspense } from 'react';
import MovieCard from './MovieCard';
import LoadingSkeleton from './LoadingSkeleton';

type Movie = { id: number; title: string; poster_path: string; release_date: string; };
type Props = { title: string; type: 'trending' | 'upcoming' | 'top_rated'; };

async function MovieData({ type }: { type: Props['type'] }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/movies?type=${type}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    const movies = data.results as Movie[];

    // --- THE FIX IS HERE ---
    // Filter out any movies that might be missing an ID from the API response.
    const validMovies = movies.filter(movie => movie.id);

    return (
        <div className="flex overflow-x-auto space-x-4 pb-4 custom-scrollbar">
            {validMovies.map((movie) => (
                <div key={movie.id} className="flex-shrink-0 w-48">
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    );
}

const CarouselSkeleton = () => (
    <div className="flex overflow-x-auto space-x-4 pb-4 custom-scrollbar">
        {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-48"><LoadingSkeleton /></div>
        ))}
    </div>
);

export default function MovieCarousel({ title, type }: Props) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Suspense fallback={<CarouselSkeleton />}>
        <MovieData type={type} />
      </Suspense>
    </div>
  );
}