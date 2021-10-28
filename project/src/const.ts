import {CityType, Offer, OfferListType} from './types/offer';

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
  PriceHighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const filterOffersByCity = (offersList: OfferListType, city: CityType): OfferListType=> {
  if (!offersList) {
    return [];
  }
  return offersList.filter((offer) => offer.city.name === city);
};

const sortByPriceLowToHigh = (offerA: Offer, offerB: Offer): number => offerA.price - offerB.price;

const sortByPriceHighToLow = (offerA: Offer, offerB: Offer): number => offerB.price - offerA.price;

const sortByRating = (offerA: Offer, offerB: Offer): number => offerB.rating - offerA.rating;

export const getSortedOffers = (sortType: string, offers: Offer[]): Offer[] => {
  switch (sortType) {
    case SortType.Popular:
      return offers;
    case SortType.PriceLowToHigh:
      return offers.slice().sort(sortByPriceLowToHigh);
    case SortType.PriceHighToLow:
      return offers.slice().sort(sortByPriceHighToLow);
    case SortType.TopRated:
      return offers.slice().sort(sortByRating);
    default: return offers;
  }
};
