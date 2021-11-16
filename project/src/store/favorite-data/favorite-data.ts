import {FavoriteData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {fillFavoritesOfferList, removeFromFavoritesList} from '../action';

const initialState: FavoriteData = {
  favoritesOfferList: [],
};

const favoriteData = createReducer(initialState, (builder) => {
  builder.addCase(fillFavoritesOfferList, (state, action) => {
    state.favoritesOfferList = action.payload;
  })
    .addCase(removeFromFavoritesList, (state, action) => {
      const index = state.favoritesOfferList.findIndex((offer) => offer.id === action.payload);

      state.favoritesOfferList = [
        ...state.favoritesOfferList.slice(0, index),
        ...state.favoritesOfferList.slice(index + 1),
      ];
    });
});

export {favoriteData};
