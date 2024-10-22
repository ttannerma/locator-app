import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Location = {
  id: number;
  lat: number;
  lon: number;
};

interface LocationsState {
  locations: Location[];
}

const initialState: LocationsState = {
  locations: [],
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    reset: (state) => {
      state.locations = [];
    },
    update: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations = [...state.locations, action.payload];
    },
  },
});

export const { reset, update, addLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
