import {
    useGetLibraryQuery,
    useAddToWatchlistMutation,
    useRemoveFromWatchlistMutation,
    useToggleLikeMutation
} from '../services/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useMovieActions = (movie) => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const { data: library } = useGetLibraryQuery(undefined, { skip: !isAuthenticated });
    const navigate = useNavigate();

    const [addToWatchlist] = useAddToWatchlistMutation();
    const [removeFromWatchlist] = useRemoveFromWatchlistMutation();
    const [toggleLike] = useToggleLikeMutation();

    // Check if movie is in user's library
    const isWatchlisted = library?.watchlist?.some(m => m.tmdbId === movie.id);
    const isLiked = library?.likes?.some(m => m.tmdbId === movie.id);

    const handleWatchlistClick = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!isAuthenticated) return navigate('/login');

        if (isWatchlisted) {
            await removeFromWatchlist(movie.id);
            toast.success("Removed from Watchlist");
        } else {
            await addToWatchlist({
                tmdbId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path
            });
            toast.success("Added to Watchlist");
        }
    };

    const handleLikeClick = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!isAuthenticated) return navigate('/login');

        await toggleLike(movie);
        if (isLiked) {
            toast.success("Removed from Likes");
        } else {
            toast.success("Added to Likes");
        }
    };

    return {
        isWatchlisted,
        isLiked,
        handleWatchlistClick,
        handleLikeClick,
        isAuthenticated
    };
};
