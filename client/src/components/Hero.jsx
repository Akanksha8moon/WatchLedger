import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Hero = ({ onSearch, backdropPath }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const bgImage = backdropPath
        ? `https://image.tmdb.org/t/p/original${backdropPath}`
        : 'https://images.unsplash.com/photo-1574267438351-a87a7403f0d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

    return (
        <div className="relative w-full h-[300px] md:h-[360px] flex items-center justify-center bg-zinc-900 overflow-hidden mb-8">
            {/* Background Image with Tint */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transition-opacity duration-1000"
                style={{ backgroundImage: `url(${bgImage})` }}
            />
            {/* Gradient Overlay for Fade Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-cinematic-bg via-cinematic-bg/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-cinematic-bg/80 via-transparent to-cinematic-bg/80" />

            {/* Content Content */}
            <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col gap-6">
                <div className="text-left space-y-1">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
                        Welcome.
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium text-white/90 drop-shadow-md">
                        Millions of movies, TV shows and people to discover. Explore now.
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="relative w-full mt-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a movie, tv show, person..."
                        className="w-full py-3 md:py-4 pl-6 pr-32 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none text-base md:text-lg shadow-xl ring-4 ring-transparent focus:ring-cinematic-border/20 transition-all font-medium"
                    />
                    <button
                        type="submit"
                        className="absolute right-0 top-0 bottom-0 px-6 md:px-8 bg-gradient-to-r from-teal-500 to-cyan-600 hover:to-cyan-500 text-white font-bold rounded-r-full transition-all duration-300 hover:text-black"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Hero;
