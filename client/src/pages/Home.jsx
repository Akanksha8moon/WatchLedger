import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetTrendingQuery, useSearchMoviesQuery } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import Hero from '../components/Hero';
import { Loader } from 'lucide-react';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
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
        isFetching: isSearchFetching,
        error: searchError
    } = useSearchMoviesQuery({ query: searchQuery, page }, { skip: !searchQuery });

    // Determine which data is active
    const isLoading = searchQuery ? isSearchLoading : isTrendingLoading;
    const isFetching = searchQuery ? isSearchFetching : isTrendingFetching;
    const error = searchQuery ? searchError : trendingError;
    const currentData = searchQuery ? searchData : trendingData;

    const handleHeroSearch = (query) => {
        if (query.trim()) {
            setSearchParams({ search: query });
        }
    };

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
    }, [currentData, page]);

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

    // Get a random backdrop from the first few movies for the hero
    const heroBackdrop = allMovies.length > 0 ? allMovies[0].backdrop_path : null;

    return (
        <div className="space-y-4 pb-20">
            {/* Show Hero only if not searching (or show it always? Plan said maybe hide. Let's show it but with search active behavior if needed. For now let's hide if searching to keep focus on results, or maybe just keep it but smaller? Let's hide it if there is a query to replicate 'Search Results' page feel, but on main page let's show it.) */}
            {!searchQuery && (
                <Hero onSearch={handleHeroSearch} backdropPath={heroBackdrop} />
            )}

            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-bold tracking-tight mb-6 mt-4">
                    {searchQuery ? `Results for "${searchQuery}"` : 'Trending'}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
                    {allMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {allMovies.length > 0 ? (
                    <div className="flex justify-center pt-12">
                        <button
                            disabled={isFetching}
                            onClick={() => setPage(p => p + 1)}
                            className="bg-cinematic-border hover:bg-white hover:text-black text-white px-8 py-3 rounded-md transition-all text-base font-bold flex items-center gap-2 shadow-lg"
                        >
                            {isFetching && <Loader size={18} className="animate-spin" />}
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
        </div>
    );
};

export default Home;
