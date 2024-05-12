import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface HumanBaseInfoState {
  firstName: string | undefined;
  lastName: string | undefined;
  fatherName: string | undefined;
  phoneNumber: string | undefined;
}
const initialState: HumanBaseInfoState = {
  firstName: undefined,
  lastName: undefined,
  fatherName: undefined,
  phoneNumber: undefined
};

export const humanBaseInfoSlice = createSlice({
  name: 'baseInfo',
  initialState,
  reducers: {
    addFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    addLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    addFatherName: (state, action: PayloadAction<string>) => {
      state.fatherName = action.payload;
    },
    addPhone: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    resetAddState: () => initialState
  }
});

export const { addFirstName, addLastName, addFatherName, addPhone, resetAddState } =
  humanBaseInfoSlice.actions;
export default humanBaseInfoSlice.reducer;
