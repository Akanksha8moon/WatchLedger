const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    watchlist: [{
        tmdbId: { type: Number, required: true },
        title: { type: String, required: true },
        posterPath: { type: String },
        addedAt: { type: Date, default: Date.now }
    }],
    likes: [{
        tmdbId: { type: Number, required: true },
        title: { type: String, required: true },
        posterPath: { type: String },
        addedAt: { type: Date, default: Date.now }
    }],
    reviews: [{
        tmdbId: { type: Number, required: true },
        title: { type: String }, // Optional: snapshots the movie title
        rating: { type: Number, min: 0.5, max: 5 },
        text: { type: String, maxlength: 500 },
        createdAt: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
