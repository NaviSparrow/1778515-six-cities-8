import {MainData} from '../../types/state';
import {City} from '../../const';
import {Actions, ActionType} from '../../types/action';

const initialState: MainData = {
  city: City.Paris,
  offerList: [],
  isDataLoaded: false,
};

const mainData = (state = initialState, action:Actions): MainData => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.FillOffersList:
      return {...state, offerList: action.payload, isDataLoaded: true};
    default:
      return state;
  }
};

export {mainData};
