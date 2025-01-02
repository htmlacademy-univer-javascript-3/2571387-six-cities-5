import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthorizationStatus, NameSpace, State, UserData } from '../types';
import { checkAuthorizationStatus, loginAction, logoutAction } from './api-actions';

type InitialState = {
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  loading: boolean;
};

const initialState: InitialState = {
  error: null,
  authorizationStatus: AuthorizationStatus.UnKnown,
  userData: null,
  loading: false,
};

const userSlice = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers: {
    setUserError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorizationStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthorizationStatus.rejected, (state, action) => {
        state.loading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(checkAuthorizationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(logoutAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.loading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      });
  }
});

export const userReducer = userSlice.reducer;

export const selectUserData = (state: State) => state[NameSpace.USER].userData;

export const selectUserDataLoading = (state: State) => state[NameSpace.USER].loading;

export const selectAuthStatus = (state: State) => state[NameSpace.USER].authorizationStatus;

export const selectErrorUserDate = (state: State) => state[NameSpace.USER].error;

export const { setUserError } = userSlice.actions;
