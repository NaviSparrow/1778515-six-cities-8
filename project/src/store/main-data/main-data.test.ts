import {makeFakeOffer, makeFakeOfferList} from '../../utils/mocks';
import {City} from '../../const';
import {mainData} from './main-data';
import {changeCity, fillOffersList, updateOffer} from '../action';

const mockOfferList = makeFakeOfferList();
const mockOffer = makeFakeOffer();

describe('Reducer: mainData', () => {
  it('without additional parameters should return initial state', () => {
    expect(mainData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({city: City.Paris, offerList: [], isDataLoaded: false});
  });

  it('should change the city',  () => {
    const state = {
      city: City.Paris,
      offerList: [],
      isDataLoaded: false,
    };
    expect(mainData(state, changeCity(mockOffer.city.name)))
      .toEqual({city: mockOffer.city.name, offerList: [], isDataLoaded: false});
  });

  it('should fill offerList and change isDataLoad',  () => {
    const state = {
      city: City.Paris,
      offerList: [],
      isDataLoaded: false,
    };
    expect(mainData(state, fillOffersList(mockOfferList)))
      .toEqual({city: City.Paris, offerList: mockOfferList, isDataLoaded: true});
  });

  it('should update offer in offerList',  () => {
    const state = {
      city: City.Paris,
      offerList: [...mockOfferList, mockOffer],
      isDataLoaded: true,
    };
    const updatedOffer = mockOffer;
    updatedOffer.city.name = City.Hamburg;
    expect(mainData(state, updateOffer(updatedOffer)))
      .toEqual({city: City.Paris, offerList: [...mockOfferList, updatedOffer], isDataLoaded: true});
  });
});
