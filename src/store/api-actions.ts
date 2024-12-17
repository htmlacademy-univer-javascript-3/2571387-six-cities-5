import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOffersLoadingStatus, fillOffers, setError, requireAuthorization, setUserData } from './action';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../types/constant';
import { AppDispatch, AuthorizationStatus, State, offerCard, AuthData, UserData } from '../types';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { dropToken, saveToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFERS_FETCH',
  async (_arg, {dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));

    const { data } = await api.get<offerCard[]>(APIRoute.Offers);

    dispatch(setOffersLoadingStatus(false));
    dispatch(fillOffers(data));
  }
);

export const clearErrorAction = createAsyncThunk(
  'CLEAR_ERROR',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const checkAuthorizationStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'CHECK_AUTHORIZATION_STATUS',
  async(_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER_LOGIN',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER_LOGOUT',
  async (_arg, {dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

