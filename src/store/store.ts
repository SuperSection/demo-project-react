import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import authReducer from './slices/auth.slice';
import registrationFormReducer from './slices/registration-form.slice';
import { refreshUserMiddleware } from './middleware/refresh-user.middleware';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage: storage, // Use local storage
  whitelist: ['accessToken', 'refreshToken'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    registration: registrationFormReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware, refreshUserMiddleware),
});

export const persistor = persistStore(store);
