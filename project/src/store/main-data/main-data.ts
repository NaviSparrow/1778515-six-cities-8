import {MainData} from '../../types/state';
import {City} from '../../const';
import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fillOffersList, updateOffer} from '../action';

const initialState: MainData = {
  city: City.Paris,
  offerList: [],
  isDataLoaded: false,
};

const mainData = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  })
    .addCase(fillOffersList, (state, action) => {
      state.offerList = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(updateOffer, (state, action) => {
      const index = state.offerList.findIndex((offer) => offer.id === action.payload.id);
      state.offerList = [
        ...state.offerList.slice(0, index),
        action.payload,
        ...state.offerList.slice(index + 1),
      ];
    });
});

export {mainData};
