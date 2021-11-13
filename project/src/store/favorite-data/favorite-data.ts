import {FavoriteData} from '../../types/state';
import {Actions, ActionType} from '../../types/action';

const initialState: FavoriteData = {
  favoritesOfferList: [],
};

const favoriteData = (state = initialState, action: Actions): FavoriteData => {
  let index = -1;
  switch (action.type) {
    case ActionType.FillFavoritesOffersList:
      return {...state, favoritesOfferList: action.payload};
    case ActionType.RemoveFromFavoritesList:
      index = state.favoritesOfferList.findIndex((offer) => offer.id === action.payload);
      return {...state, favoritesOfferList: [
        ...state.favoritesOfferList.slice(0, index),
        ...state.favoritesOfferList.slice(index + 1),
      ],
      };
    default:
      return state;
  }
};

export {favoriteData};
