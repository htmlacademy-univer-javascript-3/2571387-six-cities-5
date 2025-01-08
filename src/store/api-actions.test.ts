import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, State } from '../types';
import { AppThunkDispatch, mockOfferInitialState, mockUserInitialState, extractActionsTypes } from '../mocks/mocks';
import { changeFavoriteOfferAction, checkAuthorizationStatus, fetchFavoriteOffersAction, fetchNearOfferAction, fetchOfferAction, fetchOffersAction, fetchReviewAction, loginAction, logoutAction, postReviewAction } from './api-actions';
import { APIRoute } from '../types/constant';
import makeFakeUserData from '../mocks/makeFakeUserData';
import makeFakeOffer from '../mocks/makeFakeOffer';
import { datatype } from 'faker';
import * as tokenStorage from '../services/token';
import makeFakeReview from '../mocks/makeFakeReviews';
import makeFakeNewReviewData from '../mocks/makeFakeNewReviewData';
import makeFakeAuthData from '../mocks/makeFakeAuthData';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreater = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreater>;

  beforeEach(() => {
    store = mockStoreCreater({
      [NameSpace.USER]: mockUserInitialState,
      [NameSpace.OFFER]: mockOfferInitialState,
    });
  });

  describe('checkAuthorizationStatus', () => {
    it('should dispatch "checkAuthorizationStatus.pending", "fetchFavoriteOffersAction.pending" and "checkAuthorizationStatus.fulfilled" with thunk checkAuthorizationStatus', async () => {
      const expectedPayload = makeFakeUserData();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, expectedPayload);

      await store.dispatch(checkAuthorizationStatus());
      const actions = extractActionsTypes(store.getActions());
      const emittedActions = store.getActions();
      const checkAuthorizationStatusFulfilled = emittedActions.at(2) as ReturnType<typeof checkAuthorizationStatus.fulfilled>;

      expect(actions).toEqual([
        checkAuthorizationStatus.pending.type,
        fetchFavoriteOffersAction.pending.type,
        checkAuthorizationStatus.fulfilled.type,
      ]);

      expect(checkAuthorizationStatusFulfilled.payload).toEqual(expectedPayload);
    });

    it('should dispatch "checkAuthorizationStatus.pending", and "checkAuthorizationStatus.reject" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400, []);

      await store.dispatch(checkAuthorizationStatus());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorizationStatus.pending.type,
        checkAuthorizationStatus.rejected.type,
      ]);
    });
  });
  //------
  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response 200', async() => {
      const expectedPayload = new Array(3).fill(null).map(() => makeFakeOffer());
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, expectedPayload);

      await store.dispatch(fetchOffersAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fetchOffersActionFulfilled.payload)
        .toEqual(expectedPayload);
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });
  //----
  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.fulfilled" when server response 200', async() => {
      const expectedPayload = makeFakeOffer();
      const offerIdMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.Offer}${offerIdMock}`).reply(200, expectedPayload);

      await store.dispatch(fetchOfferAction(offerIdMock));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);
      expect(fetchOfferActionFulfilled.payload)
        .toEqual(expectedPayload);
    });

    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.rejected" when server response 400', async() => {
      const offerIdMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.Offer}${offerIdMock}`).reply(400, []);

      await store.dispatch(fetchOfferAction(offerIdMock));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });
  //-----
  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending" and "fetchFavoriteOffersAction.fulfilled" when server response 200', async() => {
      const expectedPayload = new Array(3).fill(null).map(() => makeFakeOffer());
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, expectedPayload);

      await store.dispatch(fetchFavoriteOffersAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);
      expect(fetchFavoriteOffersActionFulfilled.payload)
        .toEqual(expectedPayload);
    });

    it('should dispatch "fetchFavoriteOffersAction.pending" and "fetchFavoriteOffersAction.rejected" when server response 401', async() => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(401);

      await store.dispatch(fetchFavoriteOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.rejected.type,
      ]);
    });
  });
  //----
  describe('fetchNearOfferAction', () => {
    it('should dispatch "fetchNearOfferAction.pending" and "fetchNearOfferAction.fulfilled" when server response 200', async() => {
      const expectedPayload = new Array(3).fill(null).map(() => makeFakeOffer());
      const idMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.Offer}${idMock}/nearby`).reply(200, expectedPayload);

      await store.dispatch(fetchNearOfferAction(idMock));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearOfferAction.pending.type,
        fetchNearOfferAction.fulfilled.type,
      ]);
      expect(fetchNearOfferActionFulfilled.payload)
        .toEqual(expectedPayload);
    });

    it('should dispatch "fetchNearOfferAction.pending" and "fetchNearOfferAction.rejected" when server response 400', async() => {
      const idMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.Offer}${idMock}/nearby`).reply(400, []);

      await store.dispatch(fetchNearOfferAction(idMock));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearOfferAction.pending.type,
        fetchNearOfferAction.rejected.type,
      ]);
    });
  });
  //----
  describe('fetchReviewAction', () => {
    it('should dispatch "fetchReviewAction.pending" and "fetchReviewAction.fulfilled" when server response 200', async() => {
      const expectedPayload = new Array(3).fill(null).map(() => makeFakeReview());
      const idMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}${idMock}`).reply(200, expectedPayload);

      await store.dispatch(fetchReviewAction(idMock));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewAction.pending.type,
        fetchReviewAction.fulfilled.type,
      ]);
      expect(fetchReviewActionFulfilled.payload)
        .toEqual(expectedPayload);
    });

    it('should dispatch "fetchReviewAction.pending" and "fetchReviewAction.rejected" when server response 400', async() => {
      const idMock = datatype.string();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${idMock}`).reply(400, []);

      await store.dispatch(fetchReviewAction(idMock));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewAction.pending.type,
        fetchReviewAction.rejected.type,
      ]);
    });
  });
  //----
  describe('postReviewAction', () => {
    it('should dispatch "postReviewAction.pending", "postReviewAction.fulfilled" and "fetchComments.pending" when server response 200', async() => {
      const comment = makeFakeNewReviewData();
      const idMock = comment.id;
      mockAxiosAdapter.onPost(`${APIRoute.Comments}${idMock}`).reply(200);

      await store.dispatch(postReviewAction(comment));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postReviewAction.pending.type,
        fetchReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);

    });

    it('should dispatch "postReviewAction.pending" and "postReviewAction.rejected" when server response 400', async() => {
      const comment = makeFakeNewReviewData();
      const idMock = comment.id;
      mockAxiosAdapter.onPost(`${APIRoute.Comments}${idMock}`).reply(400, []);

      await store.dispatch(postReviewAction(comment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type,
      ]);
    });
  });
  //------
  describe('changeFavoriteOfferAction', () => {
    it('should dispatch "changeFavoriteOfferAction.pending", "fetchFavoriteOffersAction.pending", "changeFavoriteOfferAction.fulfilled" when server response 200', async() => {
      const optionParam = '/1';
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}${mockOffer.id}${optionParam}`).reply(200);

      await store.dispatch(changeFavoriteOfferAction(`${mockOffer.id}${optionParam}`));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        changeFavoriteOfferAction.pending.type,
        fetchFavoriteOffersAction.pending.type,
        changeFavoriteOfferAction.fulfilled.type,
      ]);
    });

    it('should dispatch "changeFavoriteOfferAction.pending" and "changeFavoriteOfferAction.rejected" when server response 400', async() => {
      const optionParam = '/1';
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}${mockOffer.id}`).reply(400, []);

      await store.dispatch(changeFavoriteOfferAction(`${mockOffer.id}${optionParam}`));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteOfferAction.pending.type,
        changeFavoriteOfferAction.rejected.type,
      ]);
    });
  });
  //----
  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "fetchFavoriteOffersAction.pending" and "loginAction.fulfilled" when server response 200', async () => {
      const fakeAuthData = makeFakeAuthData();
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(fakeAuthData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        fetchFavoriteOffersAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeAuthData = makeFakeAuthData();
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');
      await store.dispatch(loginAction(fakeAuthData));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReply.token);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" when server response 400', async () => {
      const fakeAuthData = makeFakeAuthData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(fakeAuthData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });
  //------
  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should call "dropToken" once', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);

      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });

    it('should dispatch "logoutAction.pending" and "logoutAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(401);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.rejected.type,
      ]);
    });
  });
});
