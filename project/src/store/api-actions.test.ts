import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';
import {State} from '../types/state';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {
  adaptedToClientOffer,
  adaptedToClientOfferList,
  adaptedToClientReviewsList,
  APIRoute,
  AppRoute,
  AuthorizationStatus
} from '../const';
import {
  addOfferToFavoritesAction,
  checkAuthAction, deleteOfferFromFavoriteAction, fetchFavoritesOfferList,
  fetchNearbyOffersAction,
  fetchOffersAction,
  fetchOpenedOfferAction,
  fetchReviewsAction,
  loginAction,
  logoutAction,
  postNewReviewAction
} from './api-actions';
import {
  fillFavoritesOfferList,
  fillNearbyOffersList,
  fillOffersList,
  fillOpenedOffer,
  fillReviewsList,
  redirectToRoute, removeFromFavoritesList,
  requireAuthorization,
  requireLogout, updateOffer
} from './action';
import {
  makeFakeOffer,
  makeFakeOfferFromServer,
  makeFakeOfferListFromServer,
  makeFakeReviewListFromServer
} from '../utils/mocks';
import {AuthData} from '../types/auth-data';
import {ActionsOnFormSubmit, ReviewPostType} from '../types/review-post-type';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('authorization status should become «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
    ]);
  });

  it('should dispatch fillOffersList when GET/hotels', async () => {
    const mockOfferListFromServer = makeFakeOfferListFromServer();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOfferListFromServer);

    const store = mockStore();
    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      fillOffersList(
        adaptedToClientOfferList(mockOfferListFromServer)),
    ]);
  });

  it('should dispatch requireAuthorization and redirectToRoute when POST/login', async () => {
    const fakeUserData: AuthData = {login: 'fake@mail.ru', password: '123'};
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'mockToken', email: 'fake@mail.ru'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUserData));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      redirectToRoute(AppRoute.Root),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'mockToken');
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-user-email', 'fake@mail.ru');
  });

  it('should dispatch requireLogout when Delete/logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([requireLogout()]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(2);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-user-email');
  });

  it('should dispatch fillOpenedOffer when GET/hotels/id', async () => {
    const mockOpenedOfferFromServer = makeFakeOfferFromServer();
    const mockid = mockOpenedOfferFromServer.id;
    mockAPI
      .onGet(`${APIRoute.Offers}/${mockOpenedOfferFromServer.id}`)
      .reply(200, mockOpenedOfferFromServer);

    const store = mockStore();
    await store.dispatch(fetchOpenedOfferAction(mockid));

    expect(store.getActions()).toEqual([
      fillOpenedOffer(
        adaptedToClientOffer(mockOpenedOfferFromServer)),
    ]);
  });

  it('should dispatch fillReviewsList when GET/comments/id', async () => {
    const mockOpenedOfferFromServer = makeFakeOfferFromServer();
    const mockid = mockOpenedOfferFromServer.id;
    const mockReviewListFromServer = makeFakeReviewListFromServer();
    mockAPI
      .onGet(`${APIRoute.Comments}/${mockid}`)
      .reply(200, mockReviewListFromServer);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(mockid));

    expect(store.getActions()).toEqual([
      fillReviewsList(
        adaptedToClientReviewsList(mockReviewListFromServer)),
    ]);
  });

  it('should dispatch fillNearbyOffersList when GET/hotels/id/nearby', async () => {
    const mockOpenedOfferFromServer = makeFakeOfferFromServer();
    const mockid = mockOpenedOfferFromServer.id;
    const mockOfferListFromServer = makeFakeOfferListFromServer();
    mockAPI
      .onGet(`${APIRoute.Offers}/${mockid}/nearby`)
      .reply(200, mockOfferListFromServer);

    const store = mockStore();
    await store.dispatch(fetchNearbyOffersAction(mockid));

    expect(store.getActions()).toEqual([
      fillNearbyOffersList(
        adaptedToClientOfferList(mockOfferListFromServer)),
    ]);
  });

  it('should dispatch fillReviewsList when POST/comments/id', async () => {
    const FAKE_RATING = 5;
    const FAKE_COMMENT = 'fake comment';

    const mockOpenedOfferFromServer = makeFakeOfferFromServer();
    const mockReviewListFromServer = makeFakeReviewListFromServer();
    const mockid = mockOpenedOfferFromServer.id;
    const onSuccessResetForm = jest.fn();
    const setDisableForm = jest.fn();

    const fakeReview:ReviewPostType = {comment: FAKE_COMMENT, rating: FAKE_RATING, id: mockid};
    const fakeFormActions: ActionsOnFormSubmit = {onSuccessResetForm, setDisableForm};
    mockAPI
      .onPost(`${APIRoute.Comments}/${mockid}`)
      .reply(200, mockReviewListFromServer);

    const store = mockStore();
    await store.dispatch(postNewReviewAction(fakeReview, fakeFormActions));

    expect(store.getActions()).toEqual([
      fillReviewsList(
        adaptedToClientReviewsList(mockReviewListFromServer)),
    ]);
  });

  it('should dispatch updateOffer when POST/favorite/id/1', async () => {
    const mockOffer = makeFakeOffer();
    const mockUpdatedOffer = mockOffer;
    mockUpdatedOffer.isFavorite = true;
    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockOffer.id}/1`)
      .reply(200, mockUpdatedOffer);

    const store = mockStore();
    await store.dispatch(addOfferToFavoritesAction(mockOffer.id));

    expect(store.getActions()).toEqual([
      updateOffer(
        adaptedToClientOffer(mockUpdatedOffer)),
    ]);
  });

  it('should dispatch updateOffer and removeFromFavoritesList when POST/favorite/id/0', async () => {
    const mockOffer = makeFakeOffer();
    const mockUpdatedOffer = mockOffer;
    mockUpdatedOffer.isFavorite = false;
    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockOffer.id}/0`)
      .reply(200, mockUpdatedOffer);

    const store = mockStore();
    await store.dispatch(deleteOfferFromFavoriteAction(mockOffer.id));

    expect(store.getActions()).toEqual([
      updateOffer(adaptedToClientOffer(mockUpdatedOffer)),
      removeFromFavoritesList(mockOffer.id),
    ]);
  });

  it('should dispatch fillFavoritesOfferList when GET/favorite', async () => {
    const mockOfferListFromServer = makeFakeOfferListFromServer();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockOfferListFromServer);

    const store = mockStore();
    await store.dispatch(fetchFavoritesOfferList());

    expect(store.getActions()).toEqual([
      fillFavoritesOfferList(
        adaptedToClientOfferList(mockOfferListFromServer)),
    ]);
  });
});
