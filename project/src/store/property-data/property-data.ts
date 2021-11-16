import {PropertyData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {fillNearbyOffersList, fillOpenedOffer, fillReviewsList} from '../action';

const initialState: PropertyData = {
  openedOffer: null,
  reviewList: [],
  nearbyOfferList: [],
};

const propertyData = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOpenedOffer, (state, action) => {
      state.openedOffer = action.payload;
    })
    .addCase(fillReviewsList, (state, action) => {
      state.reviewList = action.payload;
    })
    .addCase(fillNearbyOffersList, (state, action) => {
      state.nearbyOfferList = action.payload;
    });
});

export {propertyData};
