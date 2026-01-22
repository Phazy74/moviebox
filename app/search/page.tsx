import { Suspense } from "react";
import MovieCard from "@/components/MovieCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

/* ---------------- Search Results (Server Component) ---------------- */
async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return <p className="text-gray-400">Please enter a search term.</p>;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/search?query=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to search");
  }

  const data = await res.json();

  return data.results?.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {data.results.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  ) : (
    <p>No results found for "{query}".</p>
  );
}

/* ---------------- Skeleton ---------------- */
const SearchSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {Array.from({ length: 8 }).map((_, i) => (
      <LoadingSkeleton key={i} />
    ))}
  </div>
);

/* ---------------- Page ---------------- */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for:{" "}
        <span className="text-red-600">{query ?? "—"}</span>
      </h1>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults query={query ?? ""} />
      </Suspense>
    </main>
  );
}