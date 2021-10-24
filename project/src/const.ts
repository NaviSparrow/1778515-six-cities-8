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

export const Cities: City[] = [
  City.Paris,
  City.Cologne,
  City.Brussels,
  City.Amsterdam,
  City.Hamburg,
  City.Dusseldorf,
];

export const filterOffersByCity = (offersList: OfferType, city: CityType): OfferType=> {
  if (offersList) {
    const filteredOffers = offersList.filter((offer) => offer.city.name === city);
    if (filteredOffers.length === 0) {
      return null;
    }
    return filteredOffers;
  } else {
    return null;
  }
};
