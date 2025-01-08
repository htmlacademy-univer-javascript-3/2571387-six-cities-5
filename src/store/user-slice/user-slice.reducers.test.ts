import makeFakeAuthData from '../../mocks/makeFakeAuthData';
import makeFakeOffer from '../../mocks/makeFakeOffer';
import makeFakeUserData from '../../mocks/makeFakeUserData';
import { AuthorizationStatus } from '../../types';
import { checkAuthorizationStatus, fetchFavoriteOffersAction, loginAction, logoutAction } from '../api-actions';
import { setUserError, userReducer } from './userSlice';

describe('User Reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      error: '404. Not Found',
      authorizationStatus: AuthorizationStatus.UnKnown,
      userData: makeFakeUserData(),
      loading: false,
      favoriteOffers: new Array(3).fill(null).map(() => makeFakeOffer()),
    };

    const resultState = userReducer(expectedState, emptyAction);

    expect(resultState).toEqual(expectedState);
  });

  it('should return default initial state with undefined and empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      error: null,
      authorizationStatus: AuthorizationStatus.UnKnown,
      userData: null,
      loading: false,
      favoriteOffers: [],
    };

    const resultState = userReducer(undefined, emptyAction);

    expect(resultState).toEqual(expectedState);
  });

  it('should return new value of error from state', () => {
    const initialState = {
      error: null,
      authorizationStatus: AuthorizationStatus.UnKnown,
      userData: null,
      loading: false,
      favoriteOffers: [],
    };
    const customError = '404. Not found';
    const expectedState = {
      error: customError,
      authorizationStatus: AuthorizationStatus.UnKnown,
      userData: null,
      loading: false,
      favoriteOffers: [],
    };

    const resultState = userReducer(initialState, setUserError(customError));

    expect(resultState).toEqual(expectedState);
  });

  it('should return true of "loading" while action "checkAuthorizatioStatus.pending"', () => {
    const expectedState = {
      error: null,
      authorizationStatus: AuthorizationStatus.UnKnown,
      userData: null,
      loading: true,
      favoriteOffers: [],
    };

    const resultState = userReducer(undefined, checkAuthorizationStatus.pending);

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading and new value for error after action "checkAuthorizatioStatus.rejected"', () => {
    const customError = new Error('404. Not found');
    const expectedState = {
      error: customError.message,
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
      loading: false,
      favoriteOffers: [],
    };

    const resultState = userReducer(undefined, checkAuthorizationStatus.rejected(customError, '', undefined));

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading and new Auth status and user data after action "checkAuthorizatioStatus.fulfilled"', () => {
    const fakeUserData = makeFakeUserData();
    const expectedState = {
      error: null,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: false,
      favoriteOffers: [],
    };

    const resultState = userReducer(undefined, checkAuthorizationStatus.fulfilled(fakeUserData, '', undefined));

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading and new Auth status and user data after action "loginAction.fulfilled"', () => {
    const fakeUserData = makeFakeUserData();
    const fakeAuthData = makeFakeAuthData();
    const expectedState = {
      error: null,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: false,
      favoriteOffers: [],
    };

    const resultState = userReducer(undefined, loginAction.fulfilled(fakeUserData, '', fakeAuthData));

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading and new value for error after action "loginAction.rejected"', () => {
    const customError = new Error('404. Not found');
    const fakeAuthData = makeFakeAuthData();
    const expectedState = {
      error: customError.message,
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
      loading: false,
      favoriteOffers: [],
    };

    const resultState = userReducer(undefined, loginAction.rejected(customError, '', fakeAuthData));

    expect(resultState).toEqual(expectedState);
  });

  it('should return true of "loading" while action "loginAction.pending"', () => {
    const fakeAuthData = makeFakeAuthData();
    const expectedState = {
      error: null,
      authorizationStatus: AuthorizationStatus.UnKnown,
      userData: null,
      loading: true,
      favoriteOffers: [],
    };

    const resultState = userReducer(undefined, loginAction.pending('', fakeAuthData));

    expect(resultState).toEqual(expectedState);
  });
  it('should return false of loading and new Auth status and reset user data after action "logoutAction.fulfilled"', () => {
    const fakeUserData = makeFakeUserData();
    const initialState = {
      error: null,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: false,
      favoriteOffers: [],
    };
    const expectedState = {
      error: null,
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
      loading: false,
      favoriteOffers: [],
    };

    const resultState = userReducer(initialState, logoutAction.fulfilled);

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading and new value for error after action "logoutAction.rejected"', () => {
    const customError = new Error('404. Not found');
    const fakeUserData = makeFakeUserData();
    const initialState = {
      error: null,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: false,
      favoriteOffers: [],
    };
    const expectedState = {
      error: customError.message,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: false,
      favoriteOffers: [],
    };

    const resultState = userReducer(initialState, logoutAction.rejected(customError, '', undefined));

    expect(resultState).toEqual(expectedState);
  });

  it('should return true of "loading" while action "logoutAction.pending"', () => {
    const fakeUserData = makeFakeUserData();
    const initialState = {
      error: null,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: false,
      favoriteOffers: [],
    };
    const expectedState = {
      error: null,
      authorizationStatus: AuthorizationStatus.UnKnown,
      userData: fakeUserData,
      loading: true,
      favoriteOffers: [],
    };

    const resultState = userReducer(initialState, logoutAction.pending);

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading and favorite offer data after action "fetchFavoriteOffersAction.fulfilled"', () => {
    const fakeUserData = makeFakeUserData();
    const fakeFavoriteOffers = new Array(3).fill(null).map(() => makeFakeOffer());
    const initialState = {
      error: null,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: true,
      favoriteOffers: [],
    };
    const expectedState = {
      error: null,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: false,
      favoriteOffers: fakeFavoriteOffers,
    };

    const resultState = userReducer(initialState, fetchFavoriteOffersAction.fulfilled(fakeFavoriteOffers, '', undefined));

    expect(resultState).toEqual(expectedState);
  });

  it('should return false of loading and new value for error after action "fetchFavoriteOffersAction.rejected"', () => {
    const customError = new Error('404. Not found');
    const fakeUserData = makeFakeUserData();
    const initialState = {
      error: null,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: true,
      favoriteOffers: [],
    };
    const expectedState = {
      error: customError.message,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: false,
      favoriteOffers: [],
    };

    const resultState = userReducer(initialState, fetchFavoriteOffersAction.rejected(customError, '', undefined));

    expect(resultState).toEqual(expectedState);
  });

  it('should return true of "loading" while action "fetchFavoriteOffersAction.pending"', () => {
    const fakeUserData = makeFakeUserData();
    const initialState = {
      error: null,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: false,
      favoriteOffers: [],
    };
    const expectedState = {
      error: null,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
      loading: true,
      favoriteOffers: [],
    };

    const resultState = userReducer(initialState, fetchFavoriteOffersAction.pending);

    expect(resultState).toEqual(expectedState);
  });
});
