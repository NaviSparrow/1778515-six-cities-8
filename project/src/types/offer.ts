
export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Offer = {
  bedrooms: number;
  city: {
    location: Location;
    name: string;
  }
  description: string;
  goods: string[];
  host: User;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type ImageWrapper = {
  image: string;
 }

export type OfferListType = Offer[] | [];

export type OpenedOfferType = Offer | null;

export type CityType = string;

export type idType = {
  id: number;
}

