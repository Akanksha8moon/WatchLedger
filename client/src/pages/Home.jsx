import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetTrendingQuery, useSearchMoviesQuery } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { Loader } from 'lucide-react';

const Home = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    const [page, setPage] = useState(1);
    const [allMovies, setAllMovies] = useState([]);

    // 1. Fetch Trending (Skip if searching)
    const {
        data: trendingData,
        isLoading: isTrendingLoading,
        isFetching: isTrendingFetching,
        error: trendingError
    } = useGetTrendingQuery(page, { skip: !!searchQuery });

    // 2. Fetch Search (Skip if NOT searching)
    const {
        data: searchData,
        isLoading: isSearchLoading,
        isFetching: isSearchFetching, // Removed unused 'error' for search
        error: searchError
    } = useSearchMoviesQuery({ query: searchQuery, page }, { skip: !searchQuery });

    // Determine which data is active
    const isLoading = searchQuery ? isSearchLoading : isTrendingLoading;
    const isFetching = searchQuery ? isSearchFetching : isTrendingFetching;
    const error = searchQuery ? searchError : trendingError;
    const currentData = searchQuery ? searchData : trendingData;

    // Reset list when mode changes (Search vs Trending) or Search Term changes
    useEffect(() => {
        setPage(1);
        setAllMovies([]);
    }, [searchQuery]);

    // Accumulate movies
    useEffect(() => {
        if (currentData?.results) {
            if (page === 1) {
                setAllMovies(currentData.results);
            } else {
                setAllMovies(prev => {
                    // Filter duplicates
                    const newMovies = currentData.results.filter(
                        newMovie => !prev.some(existing => existing.id === newMovie.id)
                    );
                    return [...prev, ...newMovies];
                });
            }
        }
    }, [currentData, page]); // Intentionally removed 'searchQuery' dep as it triggers reset effect above

    if (isLoading && page === 1) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader size={32} className="animate-spin text-cinematic-border" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-20">
                Error loading movies. Please check your API Key or connection.
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
                {searchQuery ? `Results for "${searchQuery}"` : 'Trending this Week'}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
                {allMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {allMovies.length > 0 ? (
                <div className="flex justify-center pt-12">
                    <button
                        disabled={isFetching}
                        onClick={() => setPage(p => p + 1)}
                        className="bg-cinematic-border hover:bg-white hover:text-black text-white px-6 py-2 rounded-full transition-all text-sm font-medium flex items-center gap-2"
                    >
                        {isFetching && <Loader size={14} className="animate-spin" />}
                        {isFetching ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            ) : (
                !isLoading && (
                    <div className="text-center text-gray-500 mt-20">
                        No movies found.
                    </div>
                )
            )}
        </div>
    );
};

export default Home;
