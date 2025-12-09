import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './authSlice';
import { tmdbApi } from '../services/tmdb';
import { api } from '../services/api';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(tmdbApi.middleware)
            .concat(api.middleware),
});

setupListeners(store.dispatch);
