import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityData, offerCard, TReview, State, NameSpace } from '../types';
import { CITIES } from '../types/cities';
import { fetchOffersAction, fetchOfferAction, fetchReviewAction, fetchNearOfferAction } from './api-actions';

type InitialState = {
  currentCity: CityData;
  cities: CityData[];
  offers: offerCard[];
  offer: offerCard | null;
  offerLoading: boolean;
  offersLoading: boolean;
  error: string | null;
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
  offer: null,
  offerLoading: false,
  nearOffers: [],
  nearOffersLoading: false,
  reviews: [],
  reviewsLoading: false,
};

const offerSlice = createSlice({
  name: NameSpace.OFFER,
  initialState,
  reducers: {
    setOfferError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    changeSelectedCity: (state, action: PayloadAction<CityData>) => {
      state.currentCity = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersLoading = true;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.offersLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offersLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.offerLoading = true;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.offerLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offerLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchReviewAction.pending, (state) => {
        state.reviewsLoading = true;
      })
      .addCase(fetchReviewAction.rejected, (state, action) => {
        state.reviewsLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.reviewsLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchNearOfferAction.pending, (state) => {
        state.nearOffersLoading = true;
      })
      .addCase(fetchNearOfferAction.rejected, (state, action) => {
        state.nearOffersLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(fetchNearOfferAction.fulfilled, (state, action) => {
        state.nearOffersLoading = false;
        state.nearOffers = action.payload;
      });
  }
});

export const offerReducer = offerSlice.reducer;

export const selectOffersData = (state: State) => state[NameSpace.OFFER].offers;

export const selectOfferData = (state: State) => state[NameSpace.OFFER].offer;

export const selectOfferLoading = (state: State) => state[NameSpace.OFFER].offerLoading;

export const selectOffersLoading = (state: State) => state[NameSpace.OFFER].offersLoading;

export const selectErrorOfferData = (state: State) => state[NameSpace.OFFER].error;

export const selectNearOffersData = (state: State) => state[NameSpace.OFFER].nearOffers;

export const selectNearOffersLoading = (state: State) => state[NameSpace.OFFER].nearOffersLoading;

export const selectReviewsData = (state: State) => state[NameSpace.OFFER].reviews;

export const selectReviewsLoading = (state: State) => state[NameSpace.OFFER].reviewsLoading;

export const selectCurrentCity = (state: State) => state[NameSpace.OFFER].currentCity;

export const selectCities = (state: State) => state[NameSpace.OFFER].cities;

export const { setOfferError, changeSelectedCity } = offerSlice.actions;
