import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../types/constant';
import { AppDispatch, State, offerCard, AuthData, UserData, TReview, ReviewData } from '../types';
import { AxiosInstance } from 'axios';
import { dropToken, getToken, saveToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<offerCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
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
  'offers/fetchOffer',
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
  'offer/fetchReviews',
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
  'offers/fetchNearOffers',
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
  'user/fetchFavoriteOffers',
  async(_arg, { extra: api}) => {
    const { data } = await api.get<offerCard[]>(APIRoute.Favorites, {params: { 'X-Token': getToken()}});
    return data;
  },
);

export const changeFavoriteOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/changeFavoriteOffer',
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
  'user/checkAuthStatus',
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
  'user/userLogin',
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
  'user/userLogout',
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
  'offers/postReview',
  async ({id, review: comment, rating}, {dispatch, extra: api}) => {
    await api.post<TReview>(APIRoute.Comments + id, {comment, rating});
    dispatch(fetchReviewAction(id));
  },
);
