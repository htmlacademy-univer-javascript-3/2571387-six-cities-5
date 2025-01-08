import { AuthorizationStatus, NameSpace } from '../../types';
import makeFakeUserData from '../../mocks/makeFakeUserData';
import makeFakeOffer from '../../mocks/makeFakeOffer';
import { selectAuthStatus, selectErrorUserDate, selectUserData, selectUserDataLoading, selectUserFavoritesData } from './selectors';

describe('User Selector', () => {
  const state = {
    [NameSpace.USER]: {
      error: '404. Not found',
      authorizationStatus: AuthorizationStatus.Auth,
      userData: makeFakeUserData(),
      loading: false,
      favoriteOffers: new Array(3).fill(null).map(() => makeFakeOffer()),
    }
  };

  it('should return authorizationStatus from state', () => {
    const rigthAuthorizationStatus = state[NameSpace.USER].authorizationStatus;

    const resultAuthorizationStatus = selectAuthStatus(state);

    expect(resultAuthorizationStatus).toBe(rigthAuthorizationStatus);
  });
  it('should return user error from state', () => {
    const rigthUserError = state[NameSpace.USER].error;

    const resultUserError = selectErrorUserDate(state);

    expect(resultUserError).toBe(rigthUserError);
  });

  it('should return user data from state', () => {
    const rigthUserData = state[NameSpace.USER].userData;

    const resultUserData = selectUserData(state);

    expect(resultUserData).toBe(rigthUserData);
  });

  it('should return user loading from state', () => {
    const rigthUserDataLoading = state[NameSpace.USER].loading;

    const resultUserDataLoading = selectUserDataLoading(state);

    expect(resultUserDataLoading).toBe(rigthUserDataLoading);
  });

  it('should return user favorite offers from state', () => {
    const rigthUserFavoriteOffers = state[NameSpace.USER].favoriteOffers;

    const resultUserFavoriteOffers = selectUserFavoritesData(state);

    expect(resultUserFavoriteOffers).toEqual(rigthUserFavoriteOffers);
  });
});
