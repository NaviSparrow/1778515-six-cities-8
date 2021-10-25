import {CityType, OfferType} from './types/offer';

export enum AppRoute {
  Root = '/',
  Auth = '/login',
  Favorites = '/favorites',
  Room = '/offer/{id}',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow ='Price: high to low',
  TopRated = 'Top rated first',
}

export const filterOffersByCity = (offersList: OfferType, city: CityType): OfferType=> {
  if (!offersList) {
    return [];
  }
  return offersList.filter((offer) => offer.city.name === city);
};
