import {
  changeCity,
  fillOffersList,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  resetPropertyScreen,
  fillOpenedOffer,
  fillReviewsList,
  fillNearbyOffersList
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
  ResetPropertyScreen = 'property/reset',
  FillNearbyOffersList = 'property/fillNearbyOffersList'
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffersList>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof fillOpenedOffer>
  | ReturnType<typeof fillReviewsList>
  | ReturnType<typeof resetPropertyScreen>
  | ReturnType<typeof fillNearbyOffersList>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
