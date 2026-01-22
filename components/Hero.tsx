import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
type Movie = { id: number; title: string; overview: string; backdrop_path: string; };

async function getHeroMovie() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/movies?type=trending`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    
    // --- THE FIX IS HERE ---
    // Find the first movie in the results that has a valid ID and backdrop
    const heroMovie = data.results.find((movie: any) => movie.id && movie.backdrop_path);
    
    if (!heroMovie) throw new Error("Could not find a valid movie for the hero section.");
    
    return heroMovie as Movie;
}

const HeroSkeleton = () => (
    <div className="relative h-[60vh] -mt-16 bg-gray-800 animate-pulse">
        <div className="relative z-20 flex flex-col justify-end h-full max-w-7xl mx-auto p-8">
            <div className="h-12 w-3/4 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-700 rounded"></div><div className="h-4 w-5/6 bg-gray-700 rounded mt-2"></div>
            <div className="h-10 w-40 bg-gray-700 rounded mt-6"></div>
        </div>
    </div>
);

async function HeroContent() {
    const movie = await getHeroMovie();
    const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    return (
        <div className="relative h-[60vh] -mt-16">
            <Image src={backdropUrl} alt={movie.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10" />
            <div className="relative z-20 flex flex-col justify-end h-full max-w-7xl mx-auto p-8">
                <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
                <p className="max-w-2xl mt-4 text-gray-300 line-clamp-3">{movie.overview}</p>
                <Link href={`/movie/${movie.id}`}><button className="mt-6 px-6 py-2 bg-red-600 rounded-md font-semibold hover:bg-red-700 transition">View Details & Trailer</button></Link>
            </div>
        </div>
    );
}

export default function Hero() {
    return (<Suspense fallback={<HeroSkeleton />}><HeroContent /></Suspense>);
}