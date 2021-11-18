import {favoriteData} from './favorite-data';
import {fillFavoritesOfferList, removeFromFavoritesList} from '../action';
import {makeFakeOffer, makeFakeOfferList} from '../../utils/mocks';

const mockOfferList = makeFakeOfferList();
const mockOffer = makeFakeOffer();

describe('Reducer: favoriteData', () => {
  it('without additional parameters should return initial state',  () => {
    expect(favoriteData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({favoritesOfferList: []});
  });

  it('should fill favoriteOfferList',  () => {
    const state = {favoritesOfferList: []};
    expect(favoriteData(state, fillFavoritesOfferList(mockOfferList)))
      .toEqual({favoritesOfferList: mockOfferList});
  });

  it('should remove offer from favoritesOfferList',  () => {
    const state = {favoritesOfferList: [...mockOfferList, mockOffer]};
    expect(favoriteData(state, removeFromFavoritesList(mockOffer.id)))
      .toEqual({favoritesOfferList: mockOfferList});
  });
});
