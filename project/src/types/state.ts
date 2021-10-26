import {CityType, OfferListType} from './offer';
import {AuthorizationStatus} from '../const';

export type State = {
  city: CityType,
  offerList: OfferListType,
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
}
