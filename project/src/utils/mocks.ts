import {address, datatype, image, internet, name, random} from 'faker';
import {Offer} from '../types/offer';
import {ReviewType} from '../types/review-type';
import {OfferFromServer} from '../types/offer-from-server';
import {ReviewFromServerType} from '../types/review-from-server-type';

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(5),
  city: {
    location: {
      latitude: datatype.float(30),
      longitude: datatype.float(30),
      zoom: datatype.number(10),
    },
    name: address.city(),
  },
  description: datatype.string(50),
  goods: new Array(6).fill(null).map(() => datatype.string(10)),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(50),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.number(50),
  images: new Array(6).fill(null).map(() => image.image()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.float(30),
    longitude: datatype.float(30),
    zoom: datatype.number(10),
  },
  maxAdults: datatype.number(5),
  previewImage: image.image(),
  price: datatype.number(100),
  rating: datatype.number(5),
  title: name.title(),
  type: random.word(),
} as Offer);

export const makeFakeReview = (): ReviewType => ({
  comment: datatype.string(50),
  date: '2019-05-08T14:13:56.569Z',
  id: datatype.number(50),
  rating: datatype.number(5),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(50),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
} as ReviewType);

export const makeFakeOfferFromServer = ():OfferFromServer => ({
  bedrooms: datatype.number(5),
  city: {
    location: {
      latitude: datatype.float(30),
      longitude: datatype.float(30),
      zoom: datatype.number(10),
    },
    name: address.city(),
  },
  description: datatype.string(50),
  goods: new Array(6).fill(null).map(() => datatype.string(10)),
  host: {
    'avatar_url': internet.avatar(),
    id: datatype.number(50),
    'is_pro': datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.number(50),
  images: new Array(6).fill(null).map(() => image.image()),
  'is_favorite': datatype.boolean(),
  'is_premium': datatype.boolean(),
  location: {
    latitude: datatype.float(30),
    longitude: datatype.float(30),
    zoom: datatype.number(10),
  },
  'max_adults': datatype.number(5),
  'preview_image': image.image(),
  price: datatype.number(100),
  rating: datatype.number(5),
  title: name.title(),
  type: random.word(),
} as OfferFromServer);

export const makeFakeReviewFromServer = (): ReviewFromServerType => ({
  comment: datatype.string(50),
  date: '2019-05-08T14:13:56.569Z',
  id: datatype.number(50),
  rating: datatype.number(5),
  user: {
    'avatar_url': internet.avatar(),
    id: datatype.number(50),
    'is_pro': datatype.boolean(),
    name: name.firstName(),
  },
} as ReviewFromServerType);

export const makeFakeOfferList = (): Offer[] => new Array(6).fill(null).map(() => makeFakeOffer());
export const makeFakeReviewList = (): ReviewType[] => new Array(5).fill(null).map(() => makeFakeReview());
export const makeFakeOfferListFromServer = ():OfferFromServer[] => new Array(10).fill(null).map(() => makeFakeOfferFromServer());
export const makeFakeReviewListFromServer = (): ReviewFromServerType[] => new Array(10).fill(null).map(() => makeFakeReviewFromServer());
