import {address, datatype, image, internet, name, random} from 'faker';
import {Offer} from '../types/offer';
import {ReviewType} from '../types/review-type';

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
  date: datatype.string(10),
  id: datatype.number(50),
  rating: datatype.number(5),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(50),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
} as ReviewType);

export const makeFakeOfferList = (): Offer[] => new Array(10).fill(null).map(() => makeFakeOffer());
export const makeFakeReviewList = (): ReviewType[] => new Array(10).fill(null).map(() => makeFakeReview());
