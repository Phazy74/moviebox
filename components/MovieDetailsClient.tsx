"use client"; // This is CRITICAL. It marks this as a Client Component.

import { useState } from 'react';
import YoutubePlayer from './YoutubePlayer';

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
type Props = {
  details: MovieDetails;
  trailers: Trailer[];
};

// --- Helper Icon ---
const StarIcon = () => (
    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);

// --- This is the Client Component that handles the UI and state ---
export default function MovieDetailsClient({ details, trailers }: Props) {
  const [activeServer, setActiveServer] = useState(0);
  const currentVideoId = trailers[activeServer]?.key;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Video Player Section */}
      <div className="mb-4">
        {currentVideoId ? (
          <YoutubePlayer videoId={currentVideoId} />
        ) : (
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg flex items-center justify-center">
            <p className="text-gray-400">No trailer available.</p>
          </div>
        )}
      </div>

      {/* Server Buttons */}
      {trailers.length > 1 && (
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-2">
            {trailers.map((_, index) => (
              <button key={index} onClick={() => setActiveServer(index)} className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${activeServer === index ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                SERVER {index + 1}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">Note: If a server shows an error, try another. Some new movies take time to upload.</p>
        </div>
      )}

      {/* Movie Details Section */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">{details.title}</h1>
        <div className="flex items-center justify-center gap-4 text-gray-400 font-semibold mb-6">
          <span>{details.release_date.split('-')[0]}</span>
          <span className="flex items-center gap-1"><StarIcon />{details.vote_average.toFixed(1)}</span>
          <span>MOVIE</span>
        </div>
        <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">{details.overview}</p>
      </div>
    </div>
  );
}