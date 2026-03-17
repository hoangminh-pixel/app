import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  currentModule: string | null;
}

const initialState: AppState = {
  currentModule: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentModule: (state, action: PayloadAction<string | null>) => {
      state.currentModule = action.payload;
    },
  },
});

export const { setCurrentModule } = appSlice.actions;
export default appSlice.reducer;