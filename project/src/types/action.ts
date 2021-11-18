import {Action, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
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

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
