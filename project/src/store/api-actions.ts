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
  fillOpenedOffer,
  fillNearbyOffersList,
  fillReviewsList,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  fillFavoritesOfferList,
  updateOffer,
  removeFromFavoritesList
} from './action';
import {ActionsOnFormSubmit, ReviewPostType} from '../types/review-post-type';
import {AxiosResponse} from 'axios';
import {toast} from 'react-toastify';

const POST_NEW_COMMENT_FAIL_MESSAGE = 'Ошибка при отправке отзыва. Попробуйте ещё раз.';

export const fetchOffersAction = ():ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferFromServer[]>(APIRoute.Offers);
    dispatch(fillOffersList(
      adaptedToClientOfferList(data),
    ));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get(APIRoute.Login)
      .then((response:AxiosResponse<AuthInfoFromServerType>) => {
        response.data === undefined
          ? dispatch(requireAuthorization(AuthorizationStatus.NoAuth))
          : dispatch(requireAuthorization(AuthorizationStatus.Auth));
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

export const fetchOpenedOfferAction = (id: number):ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferFromServer>(`${APIRoute.Offers}/${id}`);
    dispatch(fillOpenedOffer(
      adaptedToClientOffer(data)),
    );
  };

export const fetchReviewsAction = (id: number):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<ReviewFromServerType[]>(`${APIRoute.Comments}/${id}`);
    dispatch(fillReviewsList(
      adaptedToClientReviewsList(data)),
    );
  };

export const fetchNearbyOffersAction = (id: number):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<OfferFromServer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(fillNearbyOffersList(
      adaptedToClientOfferList(data)),
    );
  };

export const postNewReviewAction = ({comment, rating, id}:ReviewPostType, {onSuccessResetForm, setDisableForm}: ActionsOnFormSubmit):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<ReviewFromServerType[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
      dispatch(fillReviewsList(
        adaptedToClientReviewsList(data)),
      );
      onSuccessResetForm();
      setDisableForm(false);
    } catch {
      toast.info(POST_NEW_COMMENT_FAIL_MESSAGE);
      setDisableForm(false);
    }
  };

export const addOfferToFavoritesAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<OfferFromServer>(`${APIRoute.Favorite}/${id}/1`);
    dispatch(updateOffer(
      adaptedToClientOffer(data)),
    );
  };

export const deleteOfferFromFavoriteAction = (id:number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<OfferFromServer>(`${APIRoute.Favorite}/${id}/0`);
    dispatch(updateOffer(
      adaptedToClientOffer(data)),
    );
    dispatch(removeFromFavoritesList(id));
  };

export const fetchFavoritesOfferList = ():ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<OfferFromServer[]>(APIRoute.Favorite);
    dispatch(fillFavoritesOfferList(
      adaptedToClientOfferList(data),
    ));
  };

