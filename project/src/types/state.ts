import {CityType, OpenedOfferType, OfferListType} from './offer';
import {AuthorizationStatus} from '../const';
import {ReviewListType} from './review-type';
import {RootState} from '../store/root-reducer';

// export type State = {
//   city: CityType,
//   offerList: OfferListType,
//   isDataLoaded: boolean,
//   authorizationStatus: AuthorizationStatus,
//   openedOffer: OpenedOfferType,
//   reviewList: ReviewListType,
//   nearbyOfferList: OfferListType,
// }

export type MainData = {
  city: CityType,
  offerList: OfferListType,
  isDataLoaded: boolean,
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type PropertyData = {
  openedOffer: OpenedOfferType,
  reviewList: ReviewListType,
  nearbyOfferList: OfferListType,
};

export type State = RootState;
