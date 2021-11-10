import {PropertyData} from '../../types/state';
import {Actions, ActionType} from '../../types/action';

const initialState: PropertyData = {
  openedOffer: null,
  reviewList: [],
  nearbyOfferList: [],
};

const propertyData = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.FillOpenedOffer:
      return {...state, openedOffer: action.payload};
    case ActionType.FillReviewsList:
      return {...state, reviewList: action.payload};
    case ActionType.FillNearbyOffersList:
      return {...state, nearbyOfferList: action.payload};
    default: return state;
  }
};

export {propertyData};
