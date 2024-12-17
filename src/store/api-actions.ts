import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOffersLoadingStatus, fillOffers, setError, requireAuthorization, setUserData, setOffer, setOfferLoadingStatus, setNearOffersLoadingStatus, setNearOffers, setReviewsLoadingStatus, setReviews } from './action';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../types/constant';
import { AppDispatch, AuthorizationStatus, State, offerCard, AuthData, UserData, TReview, ReviewData } from '../types';
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

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFER_FETCH',
  async (id, {dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus(true));

    const { data } = await api.get<offerCard>(APIRoute.Offer + id);

    dispatch(setOfferLoadingStatus(false));
    dispatch(setOffer(data));
  }
);

export const fetchReviewAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'REVIEW_FETCH',
  async (id, {dispatch, extra: api }) => {
    dispatch(setReviewsLoadingStatus(true));

    const { data } = await api.get<TReview[]>(APIRoute.Comments + id);
    dispatch(setReviewsLoadingStatus(false));
    dispatch(setReviews(data.slice(0, 10)));
  }
);

export const fetchNearOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'NEAR_OFFER_FETCH',
  async (id, {dispatch, extra: api }) => {
    dispatch(setNearOffersLoadingStatus(true));

    const { data } = await api.get<offerCard[]>(`${APIRoute.Offers}/${id}/nearby`);

    dispatch(setNearOffersLoadingStatus(false));
    dispatch(setNearOffers(data.slice(0,3)));
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

export const postReviewAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'POST_REVIEW',
  async ({id, review: comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<TReview>(APIRoute.Comments + id, {comment, rating});

    dispatch(fetchReviewAction(data.id));
  },
);

