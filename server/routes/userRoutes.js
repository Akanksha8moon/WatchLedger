const express = require('express');
const router = express.Router();
const {
    getLibrary,
    updateWatchlist,
    removeFromWatchlist,
    toggleLike,
    updateReview,
    deleteReview
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/library', protect, getLibrary);

router.post('/watchlist', protect, updateWatchlist);
router.delete('/watchlist/:tmdbId', protect, removeFromWatchlist);

router.post('/like/:tmdbId', protect, toggleLike);

router.post('/reviews', protect, updateReview);
router.delete('/reviews/:tmdbId', protect, deleteReview);

module.exports = router;
