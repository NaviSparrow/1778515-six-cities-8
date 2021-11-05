import {ThunkActionResult} from '../types/action';
import {AuthData} from '../types/auth-data';
import {OfferFromServer} from '../types/offer-from-server';
import {ReviewFromServerType} from '../types/review-from-server-type';
import {AuthInfoFromServerType} from '../types/auth-info-from-server-type';
import {dropToken, saveToken} from '../services/token';
import {dropEmail, saveEmail} from '../services/email';
import {
  adaptedToClientAuthInfo,
  adaptedToClientOffer,
  adaptedToClientOfferList,
  adaptedToClientReviewsList,
  APIRoute,
  AppRoute,
  AuthorizationStatus
} from '../const';
import {
  fillOffersList,
  getExpendedOffer, getNearbyOffersList,
  getReviewsList,
  redirectToRoute,
  requireAuthorization,
  requireLogout
} from './action';
import {ReviewPostType} from '../types/review-post-type';

export const fetchOffersAction = ():ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferFromServer[]>(APIRoute.Offers);
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch(fillOffersList(
      adaptedToClientOfferList(data),
    ));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.post<AuthInfoFromServerType>(APIRoute.Login, {email, password});
    const adaptedAuthInfo = adaptedToClientAuthInfo(data);
    saveToken(adaptedAuthInfo.token);
    saveEmail(adaptedAuthInfo.email);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    api.delete(APIRoute.Logout);
    dropToken();
    dropEmail();
    dispatch(requireLogout());
  };

export const fetchExpendedOfferAction = (id: number):ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferFromServer>(`${APIRoute.Offers}/${id}`);
    dispatch(getExpendedOffer(
      adaptedToClientOffer(data)),
    );
  };

export const fetchReviewsAction = (id: number):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<ReviewFromServerType[]>(`${APIRoute.Comments}/${id}`);
    dispatch(getReviewsList(
      adaptedToClientReviewsList(data)),
    );
  };

export const fetchNearbyOffersAction = (id: number):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<OfferFromServer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(getNearbyOffersList(
      adaptedToClientOfferList(data)),
    );
  };

export const postNewReviewAction = ({comment, rating, id}:ReviewPostType):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<ReviewFromServerType[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch(getReviewsList(
      adaptedToClientReviewsList(data)),
    );
  };


