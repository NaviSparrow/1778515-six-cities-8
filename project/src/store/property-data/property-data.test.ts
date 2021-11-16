import {makeFakeOffer, makeFakeOfferList, makeFakeReviewList} from '../../utils/mocks';
import {propertyData} from './property-data';
import {fillNearbyOffersList, fillOpenedOffer, fillReviewsList} from '../action';

const mockOffer = makeFakeOffer();
const mockReviewList = makeFakeReviewList();
const mockOfferList = makeFakeOfferList();


describe('Reducer: propertyData', () => {
  it('without additional parameters should return initial state', () => {
    expect(propertyData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({openedOffer: null, reviewList: [], nearbyOfferList: []});
  });

  it('should fill openedOffer', () => {
    const state = {openedOffer: null, reviewList: [], nearbyOfferList: []};
    expect(propertyData(state, fillOpenedOffer(mockOffer)))
      .toEqual({openedOffer: mockOffer, reviewList: [], nearbyOfferList: []});
  });

  it('should fill reviewList', () => {
    const state = {openedOffer: null, reviewList: [], nearbyOfferList: []};
    expect(propertyData(state, fillReviewsList(mockReviewList)))
      .toEqual({openedOffer: null, reviewList: mockReviewList, nearbyOfferList: []});
  });

  it('should fill nearbyOfferList', () => {
    const state = {openedOffer: null, reviewList: [], nearbyOfferList: []};
    expect(propertyData(state, fillNearbyOffersList(mockOfferList)))
      .toEqual({openedOffer: null, reviewList: [], nearbyOfferList: mockOfferList});
  });
});
