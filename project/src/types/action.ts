import {
  changeCity,
  fillOffersList,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  fillOpenedOffer,
  fillReviewsList,
  fillNearbyOffersList, updateOffer, fillFavoritesOfferList, removeFromFavoritesList
} from '../store/action';
import {ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {State} from './state';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillOffersList = 'main/fillOffersList',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute',
  FillOpenedOffer = 'property/fillOpenedOffer',
  FillReviewsList = 'property/fillReviewsList',
  FillNearbyOffersList = 'property/fillNearbyOffersList',
  FillFavoritesOffersList = 'favorites/fillFavoritesOffersList',
  RemoveFromFavoritesList = 'favorites/removeFromFavoritesList',
  UpdateOffer = 'main/updateOffer',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffersList>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof fillOpenedOffer>
  | ReturnType<typeof fillReviewsList>
  | ReturnType<typeof fillNearbyOffersList>
  | ReturnType<typeof fillFavoritesOfferList>
  | ReturnType<typeof removeFromFavoritesList>
  | ReturnType<typeof updateOffer>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
