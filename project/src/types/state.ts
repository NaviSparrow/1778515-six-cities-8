import {CityType, ExpendedOfferType, OfferListType} from './offer';
import {AuthorizationStatus} from '../const';
import {ReviewListType} from './review-type';

export type State = {
  city: CityType,
  offerList: OfferListType,
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
  expendedOffer: ExpendedOfferType,
  reviewList: ReviewListType,
  nearbyOfferList: OfferListType,
}
