import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LocationsState {
  locations: State.Location[];
  userLocation?: State.Location;
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
    update: (state, action: PayloadAction<State.Location[]>) => {
      state.locations = action.payload;
    },
    addUserLocation: (state, action: PayloadAction<State.Location>) => {
      state.userLocation = action.payload;
    },
  },
});

export const { reset, update, addUserLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
