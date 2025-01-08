import { changeSelectedCity, offerReducer, setOfferError } from './offerSlice';
import { CITIES } from '../../types/cities';
import { fetchNearOfferAction, fetchOfferAction, fetchOffersAction, fetchReviewAction } from '../api-actions';
import makeFakeOffer from '../../mocks/makeFakeOffer';
import makeFakeReview from '../../mocks/makeFakeReviews';

describe('Offer Reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
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

    const resultState = offerReducer(expectedState, emptyAction);

    expect(resultState).toEqual(expectedState);
  });

  it('should return default initial state with undefined and empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
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

    const resultState = offerReducer(undefined, emptyAction);

    expect(resultState).toEqual(expectedState);
  });

  it('should return new  value of current city from state', () => {
    const initialState = {
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
    const expectedState = {
      currentCity: CITIES[2],
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

    const resultState = offerReducer(initialState, changeSelectedCity(CITIES[2]));

    expect(resultState).toEqual(expectedState);
  });

  it('should return new  value of current city from state', () => {
    const initialState = {
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
    const customError = '404. Not found';
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: false,
      error: customError,
      offer: null,
      offerLoading: false,
      nearOffers: [],
      nearOffersLoading: false,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(initialState, setOfferError(customError));

    expect(resultState).toEqual(expectedState);
  });

  it('should return true of loading status of offers from state while "fetchOffersAction.pending"', () => {
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: true,
      error: null,
      offer: null,
      offerLoading: false,
      nearOffers: [],
      nearOffersLoading: false,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchOffersAction.pending);

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading status and new value error of offers from state after "fetchOffersAction.rejected"', () => {
    const customError = new Error('404. Not found');
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: false,
      error: customError.message,
      offer: null,
      offerLoading: false,
      nearOffers: [],
      nearOffersLoading: false,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchOffersAction.rejected(customError, '', undefined));

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading status and new value of offers from state after "fetchOffersAction.fulfilled"', () => {
    const fakeOffers = new Array(3).fill(null).map(() => makeFakeOffer());
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: fakeOffers,
      offersLoading: false,
      error: null,
      offer: null,
      offerLoading: false,
      nearOffers: [],
      nearOffersLoading: false,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchOffersAction.fulfilled(fakeOffers, '', undefined));

    expect(resultState).toEqual(expectedState);
  });

  it('should return true of loading status of offer from state while "fetchOfferAction.pending"', () => {
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: false,
      error: null,
      offer: null,
      offerLoading: true,
      nearOffers: [],
      nearOffersLoading: false,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchOfferAction.pending);

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading status and new value error of offer from state after "fetchOfferAction.rejected"', () => {
    const customError = new Error('404. Not found');
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: false,
      error: customError.message,
      offer: null,
      offerLoading: false,
      nearOffers: [],
      nearOffersLoading: false,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchOfferAction.rejected(customError, '', ''));

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading status and new value of offers from state after "fetchOffersAction.fulfilled"', () => {
    const fakeOffer = makeFakeOffer();
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: false,
      error: null,
      offer: fakeOffer,
      offerLoading: false,
      nearOffers: [],
      nearOffersLoading: false,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchOfferAction.fulfilled(fakeOffer, '', ''));

    expect(resultState).toEqual(expectedState);
  });

  it('should return true of loading status of reviews from state while "fetchReviewAction.pending"', () => {
    const expectedState = {
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
      reviewsLoading: true,
    };

    const resultState = offerReducer(undefined, fetchReviewAction.pending);

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading status and new value error of reviews from state after "fetchReviewAction.rejected"', () => {
    const customError = new Error('404. Not found');
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: false,
      error: customError.message,
      offer: null,
      offerLoading: false,
      nearOffers: [],
      nearOffersLoading: false,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchReviewAction.rejected(customError, '', ''));

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading status and new value of reviews from state after "fetchReviewAction.fulfilled"', () => {
    const fakeReviews = new Array(3).fill(null).map(() => makeFakeReview());
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: false,
      error: null,
      offer: null,
      offerLoading: false,
      nearOffers: [],
      nearOffersLoading: false,
      reviews: fakeReviews,
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchReviewAction.fulfilled(fakeReviews, '', ''));

    expect(resultState).toEqual(expectedState);
  });

  it('should return true of loading status of near offers from state while "fetchNearOfferAction.pending"', () => {
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: false,
      error: null,
      offer: null,
      offerLoading: false,
      nearOffers: [],
      nearOffersLoading: true,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchNearOfferAction.pending);

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading status and new value error of near offers from state after "fetchNearOfferAction.rejected"', () => {
    const customError = new Error('404. Not found');
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: false,
      error: customError.message,
      offer: null,
      offerLoading: false,
      nearOffers: [],
      nearOffersLoading: false,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchNearOfferAction.rejected(customError, '', ''));

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading status and new value of near offers from state after "fetchNearOfferAction.fulfilled"', () => {
    const fakeNearOffers = new Array(3).fill(null).map(() => makeFakeOffer());
    const expectedState = {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: [],
      offersLoading: false,
      error: null,
      offer: null,
      offerLoading: false,
      nearOffers: fakeNearOffers,
      nearOffersLoading: false,
      reviews: [],
      reviewsLoading: false,
    };

    const resultState = offerReducer(undefined, fetchNearOfferAction.fulfilled(fakeNearOffers, '', ''));
    expect(resultState).toEqual(expectedState);
  });
});
