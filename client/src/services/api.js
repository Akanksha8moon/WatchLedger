import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['UserLibrary'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        getMe: builder.query({
            query: () => '/auth/me',
        }),
        getLibrary: builder.query({
            query: () => '/user/library',
            providesTags: ['UserLibrary'],
        }),
        addToWatchlist: builder.mutation({
            query: (movie) => ({
                url: '/user/watchlist',
                method: 'POST',
                body: movie,
            }),
            invalidatesTags: ['UserLibrary'],
        }),
        removeFromWatchlist: builder.mutation({
            query: (tmdbId) => ({
                url: `/user/watchlist/${tmdbId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UserLibrary'],
        }),
        toggleLike: builder.mutation({
            query: (movie) => ({
                url: `/user/like/${movie.id}`,
                method: 'POST',
                body: {
                    title: movie.title,
                    posterPath: movie.poster_path
                }
            }),
            invalidatesTags: ['UserLibrary'],
        }),
        addReview: builder.mutation({
            query: (review) => ({
                url: '/user/reviews',
                method: 'POST',
                body: review,
            }),
            invalidatesTags: ['UserLibrary'],
        }),
        deleteReview: builder.mutation({
            query: (tmdbId) => ({
                url: `/user/reviews/${tmdbId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UserLibrary'],
        })
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetMeQuery,
    useGetLibraryQuery,
    useAddToWatchlistMutation,
    useRemoveFromWatchlistMutation,
    useToggleLikeMutation,
    useAddReviewMutation,
    useDeleteReviewMutation
} = api;
