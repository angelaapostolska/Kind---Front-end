import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  hideOnboarding: boolean;
}

const initialState: AppState = {
  hideOnboarding: false,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setHideOnboarding: (state, action: PayloadAction<boolean>) => {
      state.hideOnboarding = action.payload;
    },
  },
});

export const { setHideOnboarding } = appSlice.actions;

export default appSlice.reducer;
