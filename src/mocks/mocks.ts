import { createAPI } from '../services/api';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { NameSpace, State } from '../types';
import { AuthorizationStatus } from '../types';
import { CITIES } from '../types/cities';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const mockUserInitialState = {
  error: null,
  authorizationStatus: AuthorizationStatus.UnKnown,
  userData: null,
  loading: false,
  favoriteOffers: [],
};

export const mockOfferInitialState = {
  currentCity: CITIES[0],
  cities: CITIES,
  offers: [],
  offersLoading: false,
  error: null,
  offer: null,
  offerLoading: false,
  nearOffers: [],
  nearOffersLoading: false,
  reviews: [],
  reviewsLoading: false,
};

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [NameSpace.USER]: mockUserInitialState,
  [NameSpace.OFFER]: mockOfferInitialState,
  ...initialState ?? {},
});
