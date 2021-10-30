import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {AuthorizationStatus, City} from '../const';

const initialState = {
  city: City.Paris,
  offerList: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.FillOffersList:
      return {...state, offerList: action.payload};
    case ActionType.ResetMainScreen:
      return {...initialState};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload, isDataLoaded: true};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default: return state;
  }
};

export {reducer};
