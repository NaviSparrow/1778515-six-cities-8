import {Location} from './offer';
/* eslint-disable camelcase */

export type UserFromServer = {
  avatar_url?: string;
  id?: number;
  is_pro?: boolean;
  name?: string;
}

export type OfferFromServer = {
  bedrooms: number;
  city: {
    location: Location;
    name: string;
  }
  description: string;
  goods: string[];
  host: UserFromServer;
  id: number;
  images: string[];
  is_favorite?: boolean;
  is_premium?: boolean;
  location: Location;
  max_adults?: number;
  preview_image?: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};
