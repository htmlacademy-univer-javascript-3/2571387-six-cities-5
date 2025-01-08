import makeFakeOffer from '../../mocks/makeFakeOffer';
import makeFakeReview from '../../mocks/makeFakeReviews';
import { NameSpace } from '../../types';
import { CITIES } from '../../types/cities';
import { selectCities, selectCurrentCity, selectErrorOfferData, selectNearOffersData, selectNearOffersLoading, selectOfferData, selectOfferLoading, selectOffersData, selectOffersLoading, selectReviewsData, selectReviewsLoading } from './selectors';

describe('Offer Selector', () => {
  const state = {
    [NameSpace.OFFER]: {
      currentCity: CITIES[0],
      cities: CITIES,
      offers: new Array(3).fill(null).map(() => makeFakeOffer()),
      offersLoading: false,
      error: '404. Not found',
      offer: makeFakeOffer(),
      offerLoading: false,
      nearOffers: new Array(3).fill(null).map(() => makeFakeOffer()),
      nearOffersLoading: false,
      reviews: new Array(3).fill(null).map(() => makeFakeReview()),
      reviewsLoading: false,
    }
  };

  it('should return current city data from state', () => {
    const rigthCurrentCity = state[NameSpace.OFFER].currentCity;
    const resultCurrentCity = selectCurrentCity(state);
    expect(resultCurrentCity).toBe(rigthCurrentCity);
  });

  it('should return cities from state', () => {
    const rigthCities = state[NameSpace.OFFER].cities;

    const resultCities = selectCities(state);

    expect(resultCities).toEqual(rigthCities);
  });

  it('should return offers from state', () => {
    const rigthOffers = state[NameSpace.OFFER].offers;

    const resultOffers = selectOffersData(state);

    expect(resultOffers).toEqual(rigthOffers);
  });

  it('should return offers loading status from state', () => {
    const rigthOffersLoading = state[NameSpace.OFFER].offersLoading;

    const resultOffersLoading = selectOffersLoading(state);

    expect(resultOffersLoading).toBe(rigthOffersLoading);
  });

  it('should return error from state', () => {
    const rigthOffersError = state[NameSpace.OFFER].error;

    const resultOffersError = selectErrorOfferData(state);

    expect(resultOffersError).toBe(rigthOffersError);
  });

  it('should return offer data from state', () => {
    const rigthOffer = state[NameSpace.OFFER].offer;

    const resultOffer = selectOfferData(state);

    expect(resultOffer).toBe(rigthOffer);
  });

  it('should return offer data loading status from state', () => {
    const rigthOfferLoading = state[NameSpace.OFFER].offerLoading;

    const resultOfferLoading = selectOfferLoading(state);

    expect(resultOfferLoading).toBe(rigthOfferLoading);
  });

  it('should return near offers data from state', () => {
    const rigthNearOffers = state[NameSpace.OFFER].nearOffers;

    const resultNearOffers = selectNearOffersData(state);

    expect(resultNearOffers).toEqual(rigthNearOffers);
  });

  it('should return near offers data loading status from state', () => {
    const rigthNearOffersLoading = state[NameSpace.OFFER].nearOffersLoading;

    const resultNearOffersLoading = selectNearOffersLoading(state);

    expect(resultNearOffersLoading).toBe(rigthNearOffersLoading);
  });

  it('should return reviews from state', () => {
    const rigthReviews = state[NameSpace.OFFER].reviews;

    const resultReviews = selectReviewsData(state);

    expect(resultReviews).toEqual(rigthReviews);
  });

  it('should return reviews loading status from state', () => {
    const rigthReviewsLoading = state[NameSpace.OFFER].reviewsLoading;

    const resultReviewsLoading = selectReviewsLoading(state);

    expect(resultReviewsLoading).toBe(rigthReviewsLoading);
  });
});
