import {MainData} from '../../types/state';
import {City} from '../../const';
import {Actions, ActionType} from '../../types/action';

const initialState: MainData = {
  city: City.Paris,
  offerList: [],
  isDataLoaded: false,
};

const mainData = (state = initialState, action:Actions): MainData => {
  let index = -1;
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.FillOffersList:
      return {...state, offerList: action.payload, isDataLoaded: true};
    case ActionType.UpdateOffer:
      index = state.offerList.findIndex((offer) => offer.id === action.payload.id);
      return {...state, offerList: [
        ...state.offerList.slice(0, index),
        action.payload,
        ...state.offerList.slice(index + 1),
      ],
      };
    default:
      return state;
  }
};

export {mainData};
