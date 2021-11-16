import {userProcess} from './user-process';
import {AuthorizationStatus} from '../../const';
import {ActionType} from '../../types/action';
import {requireLogout} from '../action';

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown});
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.Unknown};
    const requiredAuthorizationAction = {
      type: ActionType.RequireAuthorization,
      payload: AuthorizationStatus.Auth,
    };

    expect(userProcess(state, requiredAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });


  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.Unknown};
    expect(userProcess(state, requireLogout))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
