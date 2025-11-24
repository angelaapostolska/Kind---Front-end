import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserInfo {
  emailVerified: boolean | undefined;
}

export interface IUserState {
  isSignedIn: boolean;
  userEmail: string;
  userInfo: IUserInfo;
}

const initialState: IUserState = {
  isSignedIn: false,
  userEmail: '',
  userInfo: {
    emailVerified: undefined,
  },
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setSignedIn: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isSignedIn: action.payload,
    }),
    setUserInfo: (state, action: PayloadAction<Partial<IUserInfo>>) => ({
      ...state,
      userInfo: {
        ...state.userInfo,
        ...action.payload,
      },
    }),
  },
});

export const { setSignedIn } = userSlice.actions;

export default userSlice.reducer;
