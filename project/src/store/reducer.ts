import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {AuthorizationStatus, City} from '../const';

const initialState = {
  city: City.Paris,
  offerList: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  openedOffer: null,
  reviewList: [],
  nearbyOfferList: [],
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.FillOffersList:
      return {...state, offerList: action.payload};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload, isDataLoaded: true};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.FillOpenedOffer:
      return {...state, openedOffer: action.payload};
    case ActionType.FillReviewsList:
      return {...state, reviewList: action.payload};
    case ActionType.ResetPropertyScreen:
      return {...state, openedOffer: null, reviewList: [], nearbyOfferList: []};
    case ActionType.FillNearbyOffersList:
      return {...state, nearbyOfferList: action.payload};
    default: return state;
  }
};

export {reducer};
