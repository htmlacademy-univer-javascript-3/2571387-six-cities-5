import { CityData, offerCard, AuthorizationStatus, UserData, TReview } from '../types';
import { createReducer } from '@reduxjs/toolkit';
import { changeSelectedCity, fillOffers, requireAuthorization, setError, setOffer, setOffersLoadingStatus, setUserData, setOfferLoadingStatus, setReviews, setReviewsLoadingStatus, setNearOffers, setNearOffersLoadingStatus, clearOffer, clearReviews, clearNearOffers } from './action';
import { CITIES } from '../types/cities';

type InitialState = {
  currentCity: CityData;
  cities: CityData[];
  offers: offerCard[];
  offer: offerCard | null;
  offerLoading: boolean;
  offersLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  nearOffers: offerCard[];
  nearOffersLoading: boolean;
  reviews: TReview[];
  reviewsLoading: boolean;
};

const initialState: InitialState = {
  currentCity: CITIES[0],
  cities: CITIES,
  offers: [],
  offersLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.UnKnown,
  userData: null,
  offer: null,
  offerLoading: false,
  nearOffers: [],
  nearOffersLoading: false,
  reviews: [],
  reviewsLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSelectedCity, (state, action) => {
      state.currentCity = state.cities.find((city) => city.name === action.payload)!;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.offersLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      if (action.payload) {
        state.userData = action.payload;
      } else {
        state.userData = null;
      }
    })
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.offerLoading = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setReviewsLoadingStatus, (state, action) => {
      state.reviewsLoading = action.payload;
    })
    .addCase(setNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(setNearOffersLoadingStatus, (state, action) => {
      state.nearOffersLoading = action.payload;
    })
    .addCase(clearOffer, (state) => {
      state.offer = null;
    })
    .addCase(clearReviews, (state) => {
      state.reviews = [];
    })
    .addCase(clearNearOffers, (state) => {
      state.nearOffers = [];
    });
});
