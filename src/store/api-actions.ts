import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../types/constant';
import { AppDispatch, State, offerCard, AuthData, UserData, TReview, ReviewData } from '../types';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<offerCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFERS_FETCH',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<offerCard[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<offerCard, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFER_FETCH',
  async (id, { extra: api }) => {
    const { data } = await api.get<offerCard>(APIRoute.Offer + id);
    return data;
  }
);

export const fetchReviewAction = createAsyncThunk<TReview[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'REVIEW_FETCH',
  async (id, { extra: api }) => {
    const { data } = await api.get<TReview[]>(APIRoute.Comments + id);
    return data.slice(0, 10);
  }
);

export const fetchNearOfferAction = createAsyncThunk<offerCard[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'NEAR_OFFER_FETCH',
  async (id, { extra: api }) => {
    const { data } = await api.get<offerCard[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data.slice(0,3);
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<offerCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FETCH_FAVORITE_OFFERS',
  async(_arg, { extra: api}) => {
    const { data } = await api.get<offerCard[]>(APIRoute.Favorites);
    return data;
  },
);

export const changeFavoriteOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'CHANGE_FAVORITE_OFFERS',
  async(pathOption, { dispatch, extra: api}) => {
    await api.post<offerCard[]>(APIRoute.Favorites + pathOption);

    dispatch(fetchFavoriteOffersAction());
  },
);
export const checkAuthorizationStatus = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'CHECK_AUTHORIZATION_STATUS',
  async(_arg, { dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoriteOffersAction());
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER_LOGIN',
  async ({login: email, password}, { dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(fetchFavoriteOffersAction());
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER_LOGOUT',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const postReviewAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'POST_REVIEW',
  async ({id, review: comment, rating}, {dispatch, extra: api}) => {
    await api.post<TReview>(APIRoute.Comments + id, {comment, rating});
    dispatch(fetchReviewAction(id));
  },
);
