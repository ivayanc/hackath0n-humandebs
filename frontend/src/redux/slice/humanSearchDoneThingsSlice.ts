import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface Location {
  latitude: number | null;
  longitude: number | null;
}

export interface HumanSearchDoneThings {
  doneThings: string | undefined;
  location: Location;
}

const initialState: HumanSearchDoneThings = {
  doneThings: undefined,
  location: {
    latitude: null,
    longitude: null
  }
};

export const humanSearchDoneThingsSlice = createSlice({
  name: 'searchDoneThings',
  initialState,
  reducers: {
    addDoneThings: (state, action: PayloadAction<string>) => {
      state.doneThings = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    }
  }
});

export const { addDoneThings, setLocation } =
  humanSearchDoneThingsSlice.actions;
export default humanSearchDoneThingsSlice.reducer;