import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthorizationStatus, NameSpace, offerCard, UserData } from '../../types';
import { checkAuthorizationStatus, fetchFavoriteOffersAction, loginAction, logoutAction } from '../api-actions';

type InitialState = {
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  loading: boolean;
  favoriteOffers: offerCard[];
};

const initialState: InitialState = {
  error: null,
  authorizationStatus: AuthorizationStatus.UnKnown,
  userData: null,
  loading: false,
  favoriteOffers: [],
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
        // state.loading = false;
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
        // state.loading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(logoutAction.pending, (state) => {
        state.loading = true;
        state.authorizationStatus = AuthorizationStatus.UnKnown;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.loading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        state.favoriteOffers = [];
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.loading = true;
      });
  }
});

export const userReducer = userSlice.reducer;

export const { setUserError } = userSlice.actions;
