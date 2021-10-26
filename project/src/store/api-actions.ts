import {ThunkActionResult} from '../types/action';
import {adaptToClient, APIRoute, AuthorizationStatus} from '../const';
import {fillOffersList, requireAuthorization, requireLogout} from './action';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken, Token} from '../services/token';
import {OfferFromServer} from '../types/offer-from-server';

export const fetchOffersAction = ():ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferFromServer[]>(APIRoute.Offers);
    dispatch(fillOffersList(
      adaptToClient(data),
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
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
