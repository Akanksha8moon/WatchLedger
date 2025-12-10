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

    // Circular Progress Logic
    const rating = movie.vote_average || 0;
    const percentage = Math.round(rating * 10);
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const strokeColor = percentage >= 70 ? '#21d07a' : percentage >= 40 ? '#d2d531' : '#db2360';
    const trackColor = percentage >= 70 ? '#204529' : percentage >= 40 ? '#423d0f' : '#571435';

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    return (
        <motion.div
            className="flex flex-col cursor-pointer group relative"
            whileHover={{ y: -4 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
        >
            {/* Card Image Container */}
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg bg-zinc-800">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Centered Overlay Actions on Hover (Restored functionality) */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-4">
                    <button
                        onClick={(e) => { handleLikeClick(e); }}
                        className={`p-3 rounded-full backdrop-blur-md border transition-all duration-200 transform hover:scale-110 ${isLiked ? 'bg-like-red/20 border-like-red text-like-red' : 'bg-black/40 border-white/30 text-white hover:bg-white hover:text-black'}`}
                        title="Like"
                    >
                        <Heart size={24} className={isLiked ? "fill-current" : ""} />
                    </button>
                    <button
                        onClick={(e) => { handleWatchlistClick(e); }}
                        className={`p-3 rounded-full backdrop-blur-md border transition-all duration-200 transform hover:scale-110 ${isWatchlisted ? 'bg-watchlist-green/20 border-watchlist-green text-watchlist-green' : 'bg-black/40 border-white/30 text-white hover:bg-white hover:text-black'}`}
                        title="Watchlist"
                    >
                        {isWatchlisted ? <Check size={24} /> : <Plus size={24} />}
                    </button>
                </div>
            </div>

            {/* Content Below Image */}
            <div className="pt-6 px-2 relative">
                {/* Rating Circle (Floating overlap) */}
                <div className="absolute -top-5 left-3 w-[38px] h-[38px] bg-zinc-900 rounded-full flex items-center justify-center p-0.5 shadow-md border-[2px] border-zinc-900">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                        {/* Track */}
                        <circle
                            cx="20"
                            cy="20"
                            r={radius}
                            fill="transparent"
                            stroke={trackColor}
                            strokeWidth="3"
                        />
                        {/* Progress */}
                        <circle
                            cx="20"
                            cy="20"
                            r={radius}
                            fill="transparent"
                            stroke={strokeColor}
                            strokeWidth="3"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                        {percentage}<span className="text-[6px] relative top-[-1px]">%</span>
                    </div>
                </div>

                <h3 className="text-white font-bold text-sm leading-tight hover:text-cyan-400 transition-colors">
                    {movie.title}
                </h3>
                <p className="text-gray-400 text-sm mt-0.5">
                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }) : 'Unknown Date'}
                </p>
            </div>
        </motion.div>
    );
};

export default MovieCard;
