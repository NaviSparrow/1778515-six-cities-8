import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {City} from '../const';

const initialState = {
  city: City.Paris,
  offersList: [],
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.FillOffersList:
      return {...state, offersList: action.payload};
    case ActionType.ResetMainScreen:
      return {...initialState};
    default: return state;
  }
};

export {reducer};
