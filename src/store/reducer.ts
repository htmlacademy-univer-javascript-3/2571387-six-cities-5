import { OFFERS_CARDS } from '../mocks/offers';
import { CITIES } from '../mocks/cities';
import { CityData, offerCard } from '../types';
import { createReducer } from '@reduxjs/toolkit';
import { changeSelectedCity, fillOffers } from './action';

type InitialState = {
  currentCity: CityData;
  cities: CityData[];
  offers: offerCard[];
};

const initialState: InitialState = {
  currentCity: CITIES[0],
  cities: CITIES,
  offers: OFFERS_CARDS,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSelectedCity, (state, action) => {
      state.currentCity = state.cities.find((city) => city.title === action.payload)!;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});
