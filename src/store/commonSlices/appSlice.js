import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hideOnboarding: false,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setHideOnboarding: (state, action) => {
      state.hideOnboarding = action.payload;
    },
  },
});

export const { setHideOnboarding } = appSlice.actions;

export default appSlice.reducer;
