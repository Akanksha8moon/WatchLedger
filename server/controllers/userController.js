const User = require('../models/User');

// @desc    Get full user library (watchlist, likes, reviews)
// @route   GET /api/user/library
// @access  Private
const getLibrary = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('watchlist likes reviews');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add or Remove movie from watchlist
// @route   POST /api/user/watchlist
// @access  Private
const updateWatchlist = async (req, res) => {
    const { tmdbId, title, posterPath } = req.body;

    if (!tmdbId) {
        return res.status(400).json({ message: 'Movie ID (tmdbId) is required' });
    }

    try {
        const user = await User.findById(req.user.id);

        // check if movie is already in watchlist
        const existingIndex = user.watchlist.findIndex(m => m.tmdbId === Number(tmdbId));

        if (existingIndex !== -1) {
            // Remove
            user.watchlist.splice(existingIndex, 1);
        } else {
            // Add
            if (!title) {
                return res.status(400).json({ message: 'Title is required for adding to watchlist' });
            }
            user.watchlist.push({ tmdbId, title, posterPath });
        }

        await user.save();
        res.json(user.watchlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove movie from watchlist (Explicit Delete)
// @route   DELETE /api/user/watchlist/:tmdbId
// @access  Private
const removeFromWatchlist = async (req, res) => {
    const { tmdbId } = req.params;

    try {
        const user = await User.findById(req.user.id);
        user.watchlist = user.watchlist.filter(m => m.tmdbId !== Number(tmdbId));
        await user.save();
        res.json(user.watchlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// @desc    Toggle Like on a movie
// @route   POST /api/user/like/:tmdbId
// @access  Private
const toggleLike = async (req, res) => {
    const { tmdbId } = req.params;
    const { title, posterPath } = req.body;

    if (!tmdbId) {
        return res.status(400).json({ message: 'Movie ID is required' });
    }

    try {
        const user = await User.findById(req.user.id);
        const id = Number(tmdbId);

        const existingIndex = user.likes.findIndex(m => m.tmdbId === id);

        if (existingIndex !== -1) {
            // Unlike
            user.likes.splice(existingIndex, 1);
        } else {
            // Like
            // Use title/posterPath from body, or fallback if not provided (though they should be)
            if (!title) {
                // If title missing, we might need it. For now, optional but recommended.
                // In a real app we might fetch from TMDB here if missing.
            }
            user.likes.push({ tmdbId: id, title: title || 'Unknown Title', posterPath });
        }

        await user.save();
        res.json(user.likes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add or Update Review
// @route   POST /api/user/reviews
// @access  Private
const updateReview = async (req, res) => {
    const { tmdbId, rating, text, title } = req.body;

    if (!tmdbId || !rating) {
        return res.status(400).json({ message: 'Movie ID and Rating are required' });
    }

    try {
        const user = await User.findById(req.user.id);
        const existingIndex = user.reviews.findIndex(r => r.tmdbId === Number(tmdbId));

        if (existingIndex !== -1) {
            // Update
            user.reviews[existingIndex].rating = rating;
            user.reviews[existingIndex].text = text || user.reviews[existingIndex].text;
            // We usually don't update title once set, but could.
        } else {
            // Add
            user.reviews.push({
                tmdbId: Number(tmdbId),
                rating,
                text,
                title
            });
        }

        await user.save();
        res.json(user.reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete Review
// @route   DELETE /api/user/reviews/:tmdbId
// @access  Private
const deleteReview = async (req, res) => {
    const { tmdbId } = req.params;

    try {
        const user = await User.findById(req.user.id);
        user.reviews = user.reviews.filter(r => r.tmdbId !== Number(tmdbId));
        await user.save();
        res.json(user.reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    getLibrary,
    updateWatchlist,
    removeFromWatchlist,
    toggleLike,
    updateReview,
    deleteReview
};
