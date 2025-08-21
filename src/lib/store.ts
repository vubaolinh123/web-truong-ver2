/**
 * Redux Store Configuration for Next.js 15
 * Following Next.js App Router best practices with per-request store creation
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// Create a noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Use noop storage on server, real storage on client
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// Import slices (will be created next)
import authSlice from './features/auth/authSlice';
import categoriesSlice from './features/categories/categoriesSlice';
import articlesSlice from './features/articles/articlesSlice';

// Root reducer combining all slices
const rootReducer = combineReducers({
  auth: authSlice,
  categories: categoriesSlice,
  articles: articlesSlice,
});

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // Only persist auth state for user session management
  whitelist: ['auth'],
  // Blacklist categories and articles as they should be fresh from API
  blacklist: ['categories', 'articles'],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store factory function for Next.js App Router
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore redux-persist actions
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
};

// Infer types from makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Create persistor type
export type AppPersistor = ReturnType<typeof persistStore>;

// Export store and persistor creation functions
export const createStoreAndPersistor = () => {
  const store = makeStore();
  const persistor = persistStore(store);
  return { store, persistor };
};
