import {CityType, Offer, OfferListType} from './types/offer';
import {OfferFromServer} from './types/offer-from-server';

export enum AppRoute {
  Root = '/',
  Auth = '/login',
  Favorites = '/favorites',
  Room = '/offer/{id}',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
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

export const adaptToClient = (offers: OfferFromServer[]):Offer[] => {
  const adaptedOffers:Offer[] = [];
  offers.map((offer) => {
    const adaptedOffer = Object.assign(
      {},
      offer,
      {
        host: {
          avatarUrl: offer['host']['avatar_url'],
          id: offer['host']['id'],
          isPro: offer['host']['is_pro'],
          name: offer['host']['name'],
        },
        isFavorite: offer['is_favorite'],
        isPremium: offer['is_premium'],
        maxAdults: offer['max_adults'],
        previewImage: offer['preview_image'],
      },
    );
    delete adaptedOffer['host']['avatar_url'];
    delete adaptedOffer['host']['is_pro'];
    delete adaptedOffer['is_favorite'];
    delete adaptedOffer['is_premium'];
    delete adaptedOffer['max_adults'];
    delete adaptedOffer['preview_image'];

    adaptedOffers.push(<Offer>adaptedOffer);
  });
  return adaptedOffers;
};

