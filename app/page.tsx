
import Hero from "@/components/Hero";
import MovieCarousel from "@/components/MovieCarousel";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MovieCarousel title="Trending Movies" type="trending" />
        <MovieCarousel title="Upcoming Movies" type="upcoming" />
        <MovieCarousel title="Top Rated Movies" type="top_rated" />
      </div>
    </main>
  );
}