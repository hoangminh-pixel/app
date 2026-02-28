import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  loading: boolean;
  loadingMessage?: string;
}

const initialState: LoadingState = {
  loading: false,
  loadingMessage: undefined,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: (state, action: PayloadAction<string | undefined>) => {
      state.loading = true;
      state.loadingMessage = action.payload;
    },
    hideLoading: state => {
      state.loading = false;
      state.loadingMessage = undefined;
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;