import { configureStore } from '@reduxjs/toolkit';

import humanAddInfoReducer from '@/redux/slice/humanAddInfoSlice';
import humanContactInfoReducer from '@/redux/slice/humanContactInfoSlice';
import humanSearchDoneThingsReducer from '@/redux/slice/humanSearchDoneThingsSlice';
import stepsReducer from '@/redux/slice/stepSlice';

import humanBaseInfoReducer from './slice/humanBaseInfoSlice';

export const store = configureStore({
  reducer: {
    baseInfo: humanBaseInfoReducer,
    addInfo: humanAddInfoReducer,
    contactInfo: humanContactInfoReducer,
    searchDoneThings: humanSearchDoneThingsReducer,
    steps: stepsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
