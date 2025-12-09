import React from 'react';
import { useGetLibraryQuery } from '../services/api';
import MovieCard from '../components/MovieCard';
import { Loader, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

const Library = () => {
    const { data: library, isLoading, error } = useGetLibraryQuery();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader size={32} className="animate-spin text-cinematic-border" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-20">
                Error loading library. Please ensure you are logged in.
            </div>
        );
    }

    // Transform watchlist items to match MovieCard expected format
    // Watchlist item from DB: { tmdbId, title, posterPath }
    // MovieCard expects: { id, title, poster_path, vote_average }
    const watchlistMovies = library?.watchlist?.map(item => ({
        id: item.tmdbId,
        title: item.title,
        poster_path: item.posterPath,
        vote_average: 0 // We don't save rating in watchlist, defaulting to 0 or could fetch if needed
    })) || [];

    if (watchlistMovies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <div className="bg-zinc-900 p-4 rounded-full mb-4">
                    <Film size={48} className="text-zinc-700" />
                </div>
                <h2 className="text-2xl font-bold">Your library is empty</h2>
                <p className="text-gray-500 max-w-sm">
                    Movies you add to your watchlist will appear here.
                </p>
                <Link to="/" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors mt-4">
                    Browse Movies
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-end gap-3 mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Your Watchlist</h2>
                <span className="text-gray-500 mb-1.5 text-sm">{watchlistMovies.length} movies</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
                {watchlistMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Library;
