import {ActionType} from '../types/action';
import {CityType, Offer} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';
import {ReviewType} from '../types/review-type';
import {createAction} from '@reduxjs/toolkit';

export const changeCity = createAction(
  ActionType.ChangeCity,
  (city: CityType) => ({
    payload: city,
  }),
);

export const fillOffersList = createAction(
  ActionType.FillOffersList,
  (offerList: Offer[]) => ({
    payload: offerList,
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export const fillOpenedOffer = createAction(
  ActionType.FillOpenedOffer,
  (offer: Offer) => ({
    payload: offer,
  }),
);

export const fillReviewsList = createAction(
  ActionType.FillReviewsList,
  (reviewsList: ReviewType[]) => ({
    payload: reviewsList,
  }),
);

export const fillNearbyOffersList = createAction(
  ActionType.FillNearbyOffersList,
  (offersList: Offer[]) => ({
    payload: offersList,
  }),
);

export const fillFavoritesOfferList = createAction(
  ActionType.FillFavoritesOffersList,
  (offersList: Offer[]) => ({
    payload: offersList,
  }),
);

export const updateOffer = createAction(
  ActionType.UpdateOffer,
  (offer: Offer) => ({
    payload: offer,
  }),
);

export const removeFromFavoritesList = createAction(
  ActionType.RemoveFromFavoritesList,
  (id: number) => ({
    payload: id,
  }),
);
