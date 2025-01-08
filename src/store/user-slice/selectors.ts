import { NameSpace, State } from '../../types';

export const selectUserData = (state: Pick<State, NameSpace.USER>) => state[NameSpace.USER].userData;

export const selectUserDataLoading = (state: Pick<State, NameSpace.USER>) => state[NameSpace.USER].loading;

export const selectAuthStatus = (state: Pick<State, NameSpace.USER>) => state[NameSpace.USER].authorizationStatus;

export const selectErrorUserDate = (state: Pick<State, NameSpace.USER>) => state[NameSpace.USER].error;

export const selectUserFavoritesData = (state: Pick<State, NameSpace.USER>) => state[NameSpace.USER].favoriteOffers;
