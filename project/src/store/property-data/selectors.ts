import {State} from '../../types/state';
import {OfferListType, OpenedOfferType} from '../../types/offer';
import {NameSpace} from '../root-reducer';
import {ReviewListType} from '../../types/review-type';

export const getOpenedOffer = (state: State):OpenedOfferType => state[NameSpace.property].openedOffer;
export const getReviewsList = (state: State):ReviewListType => state[NameSpace.property].reviewList;
export const getNearbyOffersList = (state: State): OfferListType => state[NameSpace.property].nearbyOfferList;
