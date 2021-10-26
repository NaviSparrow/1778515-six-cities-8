import {CityType, OfferType} from './offer';
import {AuthorizationStatus} from '../const';

export type State = {
  city: CityType,
  offersList: OfferType,
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
}
