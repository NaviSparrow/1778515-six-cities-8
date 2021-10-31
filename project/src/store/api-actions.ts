import {ThunkActionResult} from '../types/action';
import {AuthData} from '../types/auth-data';
import {OfferFromServer} from '../types/offer-from-server';
import {AuthInfoFromServer} from '../types/auth-info-from-server';
import {dropToken, saveToken} from '../services/token';
import {saveEmail} from '../services/email';
import {
  adaptedToClientAuthInfo,
  adaptedToClientOfferList,
  APIRoute,
  AppRoute,
  AuthorizationStatus} from '../const';
import {
  fillOffersList,
  redirectToRoute,
  requireAuthorization,
  requireLogout} from './action';

export const fetchOffersAction = ():ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferFromServer[]>(APIRoute.Offers);
    dispatch(fillOffersList(
      adaptedToClientOfferList(data),
    ));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<AuthInfoFromServer>(APIRoute.Login, {email, password});
    const adaptedAuthInfo = adaptedToClientAuthInfo(data);
    saveToken(adaptedAuthInfo.token);
    saveEmail(adaptedAuthInfo.email);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
