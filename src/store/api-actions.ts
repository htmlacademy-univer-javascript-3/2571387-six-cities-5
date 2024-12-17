import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOffersLoadingStatus, fillOffers, setError } from './action';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../types/constant';
import { AppDispatch, State, offerCard } from '../types';
import { AxiosInstance } from 'axios';
import { store } from '.';


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
