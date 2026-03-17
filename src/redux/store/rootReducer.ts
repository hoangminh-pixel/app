import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/authSlice';
import loadingReducer from '@/redux/slices/loadingSlice';
import appReducer from '@/redux/slices/appSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
