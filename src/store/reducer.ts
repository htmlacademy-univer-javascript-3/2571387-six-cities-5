import { CityData, offerCard } from '../types';
import { createReducer } from '@reduxjs/toolkit';
import { changeSelectedCity, fillOffers, setError, setOffersLoadingStatus } from './action';
import { CITIES } from '../types/cities';

type InitialState = {
  currentCity: CityData;
  cities: CityData[];
  offers: offerCard[];
  offersLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  currentCity: CITIES[0],
  cities: CITIES,
  offers: [],
  offersLoading: false,
  error: null,
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
    });
});

