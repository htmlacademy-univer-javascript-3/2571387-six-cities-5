import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, City, offerCard, TReview, UserData } from '../types';

export const changeSelectedCity = createAction<City>('CHANGE_SELECTED_CITY');
export const fillOffers = createAction<offerCard[]>('FILL_OFFERS');
export const setOffersLoadingStatus = createAction<boolean>('OFFERS_IS_LOADING');
export const setError = createAction<string | null>('SET_ERROR');
export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');
export const setUserData = createAction<UserData>('SET_USER_DATA');
export const setOffer = createAction<offerCard>('SET_OFFER');
export const setOfferLoadingStatus = createAction<boolean>('OFFER_IS_LOADING');
export const setReviews = createAction<TReview[]>('SET_REVIEW');
export const setReviewsLoadingStatus = createAction<boolean>('REVIEW_IS_LOADING');
export const setNearOffers = createAction<offerCard[]>('SET_NEAR_OFFER');
export const setNearOffersLoadingStatus = createAction<boolean>('NEAR_OFFER_IS_LOADING');
export const clearNearOffers = createAction('CLEAR_NEAR_OFFERS');
export const clearReviews = createAction('CLEAR_REVIEW');
export const clearOffer = createAction('CLEAR_OFFER');
