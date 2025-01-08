import { State, NameSpace } from '../../types';

export const selectOffersData = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].offers;

export const selectOfferData = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].offer;

export const selectOfferLoading = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].offerLoading;

export const selectOffersLoading = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].offersLoading;

export const selectErrorOfferData = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].error;

export const selectNearOffersData = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].nearOffers;

export const selectNearOffersLoading = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].nearOffersLoading;

export const selectReviewsData = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].reviews;

export const selectReviewsLoading = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].reviewsLoading;

export const selectCurrentCity = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].currentCity;

export const selectCities = (state: Pick<State, NameSpace.OFFER>) => state[NameSpace.OFFER].cities;
