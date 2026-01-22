import Image from 'next/image';
import Link from 'next/link';
type Movie = { id: number; title: string; poster_path: string; release_date: string; };

export default function MovieCard({ movie }: { movie: Movie }) {
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.png';
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden group h-full flex flex-col">
        <div className="relative aspect-[2/3]"><Image src={imageUrl} alt={movie.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" /></div>
        <div className="p-2 flex-grow flex flex-col justify-end"><h3 className="text-sm font-bold truncate">{movie.title}</h3></div>
      </div>
    </Link>
  );
}