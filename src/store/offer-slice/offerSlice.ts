import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityData, offerCard, TReview, NameSpace } from '../../types';
import { CITIES } from '../../types/cities';
import { fetchOffersAction, fetchOfferAction, fetchReviewAction, fetchNearOfferAction } from '../api-actions';

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
    },
    clearOffer: (state) => {
      state.offer = null;
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
    clearNearOffers: (state) => {
      state.nearOffers = [];
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

export const { setOfferError, changeSelectedCity, clearReviews, clearNearOffers, clearOffer } = offerSlice.actions;
