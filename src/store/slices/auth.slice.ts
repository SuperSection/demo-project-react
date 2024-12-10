import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RegistrationData } from '@/types/auth.type';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: RegistrationData | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserData: (state, action: PayloadAction<RegistrationData>) => {
      state.user = action.payload;
    },
    clearUserData: (state) => {
      state.user = null;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setTokens, setAccessToken, setUserData, clearUserData, clearTokens } =
  authSlice.actions;
export default authSlice.reducer;
