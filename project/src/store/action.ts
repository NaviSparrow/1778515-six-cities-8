import {ActionType} from '../types/action';
import {Offer} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';
import {ReviewType} from '../types/review-type';

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

export const fillOffersList = (offersList: Offer[]) => ({
  type: ActionType.FillOffersList,
  payload: offersList,
} as const);

export const resetPropertyScreen = () => ({
  type: ActionType.ResetPropertyScreen,
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

export const getExpendedOffer = (offer: Offer) => ({
  type: ActionType.GetExpendedOffer,
  payload: offer,
} as const);

export const getReviewsList = (reviewsList: ReviewType[]) => ({
  type: ActionType.GetReviewsList,
  payload: reviewsList,
} as const);

export const getNearbyOffersList = (offersList: Offer[]) => ({
  type: ActionType.GetNearbyOffersList,
  payload: offersList,
} as const);
