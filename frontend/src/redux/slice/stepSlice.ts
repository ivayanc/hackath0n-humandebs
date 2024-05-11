import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export enum Steps {
  BASE = 'BASE',
  ADDITIONAL = 'PLAADDITIONALN',
  CONTACT = 'CONTACT',
  SEARCH_DONE_THINGS = 'SEARCH_DONE_THINGS',
  SUMMARY = 'SUMMARY'
}
interface StepState {
  activeStep: Steps;
}

const initialState: StepState = {
  activeStep: Steps.BASE
};

export const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    changeStep: (state, action: PayloadAction<Steps>) => {
      state.activeStep = action.payload;
    }
  }
});

export const { changeStep } = stepsSlice.actions;
export default stepsSlice.reducer;
