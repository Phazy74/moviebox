"use client";

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const genres = [
  { id: 0, name: 'Popular' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
];

export default function GenreFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeGenre = searchParams.get('genre') || '0';

  const handleGenreClick = (genreId: number) => {
    const params = new URLSearchParams(searchParams);
    if (genreId === 0) {
      params.delete('genre');
    } else {
      params.set('genre', genreId.toString());
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleGenreClick(genre.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
            ${activeGenre === genre.id.toString()
              ? 'bg-red-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}