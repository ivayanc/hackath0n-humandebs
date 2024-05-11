import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface HumanBaseInfoState {
  contactFirstName: string | undefined;
  contactLastName: string | undefined;
  contactFathersName: string | undefined;
  contactPhone: string | undefined;
}
const initialState: HumanBaseInfoState = {
  contactFirstName: undefined,
  contactLastName: undefined,
  contactFathersName: undefined,
  contactPhone: undefined
};

export const humanContactInfoSlice = createSlice({
  name: 'contactInfo',
  initialState,
  reducers: {
    addContactFirstName: (state, action: PayloadAction<string>) => {
      state.contactFirstName = action.payload;
    },
    addContactLastName: (state, action: PayloadAction<string>) => {
      state.contactLastName = action.payload;
    },
    addContactFathersName: (state, action: PayloadAction<string>) => {
      state.contactFathersName = action.payload;
    },
    addContactPhone: (state, action: PayloadAction<string>) => {
      state.contactPhone = action.payload;
    }
  }
});

export const {
  addContactFirstName,
  addContactLastName,
  addContactFathersName,
  addContactPhone
} = humanContactInfoSlice.actions;
export default humanContactInfoSlice.reducer;
