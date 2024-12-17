import { createAction } from '@reduxjs/toolkit';
import { City, offerCard } from '../types';

export const changeSelectedCity = createAction<City>('CHANGE_SELECTED_CITY');
export const fillOffers = createAction<offerCard[]>('FILL_OFFERS');
export const setOffersLoadingStatus = createAction<boolean>('OFFERS_IS_LOADING');
export const setError = createAction<string | null>('SET_ERROR');
