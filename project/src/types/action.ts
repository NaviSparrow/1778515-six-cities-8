import {
  changeCity,
  fillOffersList,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  resetPropertyScreen,
  getExpendedOffer,
  getReviewsList,
  getNearbyOffersList
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
  GetExpendedOffer = 'property/getExpendedOffer',
  GetReviewsList = 'property/getReviewsList',
  ResetPropertyScreen = 'property/reset',
  GetNearbyOffersList = 'property/getNearbyOffersList'
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffersList>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof getExpendedOffer>
  | ReturnType<typeof getReviewsList>
  | ReturnType<typeof resetPropertyScreen>
  | ReturnType<typeof getNearbyOffersList>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
