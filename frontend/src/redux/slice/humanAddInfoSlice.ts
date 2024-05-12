import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface HumanAddInfoState {
  humanDesc: string | undefined;
  canBeDied: boolean;
  military: boolean;
  humanImage: string | undefined;
}
const initialState: HumanAddInfoState = {
  humanDesc: undefined,
  canBeDied: false,
  military: false,
  humanImage: undefined
};

export const humanAddInfoSlice = createSlice({
  name: 'addInfo',
  initialState,
  reducers: {
    addHumanDesc: (state, action: PayloadAction<string>) => {
      state.humanDesc = action.payload;
    },
    addCanBeDied: (state, action: PayloadAction<boolean>) => {
      state.canBeDied = action.payload;
    },
    addMilitary: (state, action: PayloadAction<boolean>) => {
      state.military = action.payload;
    },
    addHumanImage: (state, action: PayloadAction<string>) => {
      state.humanImage = action.payload;
    },
    resetBaseState: () => initialState
  }
});

export const { addHumanDesc, addCanBeDied, addMilitary, addHumanImage , resetBaseState} =
  humanAddInfoSlice.actions;
export default humanAddInfoSlice.reducer;
