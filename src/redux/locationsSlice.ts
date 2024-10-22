import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Location = {
  id: number;
  lat: number;
  long: number;
};

interface LocationsState {
  locations: Location[];
  userLocation?: Location;
}

const initialState: LocationsState = {
  locations: [],
  userLocation: undefined,
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
    addUserLocation: (state, action: PayloadAction<Location>) => {
      state.userLocation = action.payload;
    },
  },
});

export const { reset, update, addUserLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
