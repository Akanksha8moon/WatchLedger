import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getTrending: builder.query({
            query: (page = 1) => `/trending/movie/week?api_key=${TMDB_API_KEY}&page=${page}`,
        }),
        getPopular: builder.query({
            query: (page = 1) => `/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`,
        }),
        getTopRated: builder.query({
            query: (page = 1) => `/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}`,
        }),
        searchMovies: builder.query({
            query: ({ query, page = 1 }) => `/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`,
        }),
        getMovieDetails: builder.query({
            query: (id) => `/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,similar`,
        }),
    }),
});

export const {
    useGetTrendingQuery,
    useGetPopularQuery,
    useGetTopRatedQuery,
    useSearchMoviesQuery,
    useGetMovieDetailsQuery
} = tmdbApi;
