import {CityType, Offer, OfferListType} from './types/offer';
import {OfferFromServer} from './types/offer-from-server';
import {AdaptedAuthInfoType, AuthInfoType} from './types/auth-info-type';
import {AuthInfoFromServerType} from './types/auth-info-from-server-type';
import {ReviewFromServerType} from './types/review-from-server-type';
import {ReviewType} from './types/review-type';

export enum AppRoute {
  Root = '/',
  Auth = '/login',
  Favorites = '/favorites',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Room = '/offer',
  Comments = '/comments'
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

export const StarRating = {
  'perfect': 5,
  'good': 4,
  'not bad': 3,
  'badly': 2,
  'terribly': 1,
};

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

export const adaptedToClientOffer = (offer: OfferFromServer):Offer => {
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

  return adaptedOffer as Offer;
};

export const adaptedToClientOfferList = (offerList: OfferFromServer[]):Offer[] => {
  const adaptedOfferList:Offer[] = [];
  offerList.map((offer) => adaptedOfferList.push(adaptedToClientOffer(offer)));
  return adaptedOfferList;
};

export const adaptedToClientAuthInfo = (serverInfo:AuthInfoFromServerType):AuthInfoType => {
  const adaptedInfo: AdaptedAuthInfoType = Object.assign(
    {},
    serverInfo,
    {
      avatarUrl: serverInfo['avatar_url'],
      isPro: serverInfo['is_pro'],
    },
  );
  delete adaptedInfo['avatar_url'];
  delete adaptedInfo['is_pro'];

  return adaptedInfo;
};

export const adaptedToClientReviewsList = (reviewsList: ReviewFromServerType[]):ReviewType[] => {
  const adaptedReviewsList: ReviewType[] = [];
  reviewsList.map((review) => {
    const adaptedReview = Object.assign(
      {},
      review,
      {
        user: {
          avatarUrl: review['user']['avatar_url'],
          id: review['user']['id'],
          isPro: review['user']['is_pro'],
          name: review['user']['name'],
        },
      },
    );
    delete adaptedReview['user']['avatar_url'];
    delete adaptedReview['user']['is_pro'];

    adaptedReviewsList.push(adaptedReview as ReviewType);
  });

  return adaptedReviewsList;
};

export const getRandomCity = (): CityType => {
  const cities = Object.values(City);
  const randomInt = Math.floor(Math.random() * cities.length);
  return cities[randomInt];
};
