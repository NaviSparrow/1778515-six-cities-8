import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';
import {State} from '../types/state';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {APIRoute, AuthorizationStatus} from '../const';
import {checkAuthAction, fetchOffersAction} from './api-actions';
import {fillOffersList, requireAuthorization} from './action';
import {makeFakeOfferList} from '../utils/mocks';

const mockOfferList = makeFakeOfferList();

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

  it('should dispatch fillOffersList when GET/offers', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOfferList);

    const store = mockStore();
    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      fillOffersList(mockOfferList),
    ]);
  });
});
