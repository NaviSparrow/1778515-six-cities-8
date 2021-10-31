import {
  changeCity,
  fillOffersList,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  resetMainScreen
} from '../store/action';
import {ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {State} from './state';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillOffersList = 'main/fillOffersList',
  ResetMainScreen = 'main/reset',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffersList>
  | ReturnType<typeof resetMainScreen>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
