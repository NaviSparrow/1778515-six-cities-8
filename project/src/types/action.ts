import {
  changeCity,
  fillOffersList,
  resetMainScreen} from '../store/action';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillOffersList = 'main/fillOffersList',
  ResetMainScreen = 'main/reset',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffersList>
  | ReturnType<typeof resetMainScreen>;
