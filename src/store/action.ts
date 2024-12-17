import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, City, offerCard, UserData } from '../types';

export const changeSelectedCity = createAction<City>('CHANGE_SELECTED_CITY');
export const fillOffers = createAction<offerCard[]>('FILL_OFFERS');
export const setOffersLoadingStatus = createAction<boolean>('OFFERS_IS_LOADING');
export const setError = createAction<string | null>('SET_ERROR');
export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');
export const setUserData = createAction<UserData>('SET_USER_DATA');
