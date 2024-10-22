import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './locationsSlice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
