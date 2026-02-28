import { Root } from '@/services/auth/authService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  isLogin: boolean;
  user: Root | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user: Root }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout: state => {
      state.accessToken = null;
      state.user = null;
      state.isLogin = false;
    },
    login: (state, action: PayloadAction<{ user: Root }>) => {
      state.isLogin = true;
      state.user = action.payload.user
    },
  },
});

export const { setCredentials, logout, login } = authSlice.actions;
export default authSlice.reducer;
