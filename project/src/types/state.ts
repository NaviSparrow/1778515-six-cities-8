import {CityType, OpenedOfferType, OfferListType} from './offer';
import {AuthorizationStatus} from '../const';
import {ReviewListType} from './review-type';

export type State = {
  city: CityType,
  offerList: OfferListType,
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
  openedOffer: OpenedOfferType,
  reviewList: ReviewListType,
  nearbyOfferList: OfferListType,
}
