import {ActionType} from '../types/action';
import {Offer} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

export const fillOffersList = (offersList: Offer[]) => ({
  type: ActionType.FillOffersList,
  payload: offersList,
} as const);

export const resetMainScreen = () => ({
  type: ActionType.ResetMainScreen,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);
