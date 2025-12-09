import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Check, Star } from 'lucide-react';
import { useMovieActions } from '../hooks/useMovieActions';

const MovieCard = ({ movie }) => {
    const {
        isWatchlisted,
        isLiked,
        handleWatchlistClick,
        handleLikeClick
    } = useMovieActions(movie);

    const [isHovered, setIsHovered] = useState(false);

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    return (
        <motion.div
            className="relative aspect-[2/3] bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
        >
            {/* Poster Image */}
            <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />

            {/* Dark Overlay on Hover */}
            <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* Rating Badge (Always visible, but moves slightly on hover) */}
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-rating-yellow flex items-center gap-1 border border-white/10">
                <Star size={10} className="fill-rating-yellow" />
                {movie.vote_average?.toFixed(1)}
            </div>

            {/* Hover Actions */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pb-20 flex flex-col justify-center items-center gap-6"
                    >
                        {/* Like Button */}
                        <button
                            onClick={handleLikeClick}
                            className={`p-3 rounded-full backdrop-blur-md border transition-all duration-200 ${isLiked ? 'bg-like-red/20 border-like-red text-like-red' : 'bg-black/40 border-white/20 text-white hover:bg-white hover:text-black'}`}
                        >
                            <Heart size={24} className={isLiked ? "fill-current" : ""} />
                        </button>

                        {/* Watchlist Button */}
                        <button
                            onClick={handleWatchlistClick}
                            className={`p-3 rounded-full backdrop-blur-md border transition-all duration-200 ${isWatchlisted ? 'bg-watchlist-green/20 border-watchlist-green text-watchlist-green' : 'bg-black/40 border-white/20 text-white hover:bg-white hover:text-black'}`}
                        >
                            {isWatchlisted ? <Check size={24} /> : <Plus size={24} />}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Title (Only visible on hover) */}
            {isHovered && (
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent text-center">
                    <h3 className="text-white text-sm font-bold leading-tight drop-shadow-md line-clamp-2">
                        {movie.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">
                        {movie.release_date?.split('-')[0]}
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default MovieCard;
