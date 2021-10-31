import {Token} from '../services/token';
import {AuthInfoFromServer} from './auth-info-from-server';

export type AvatarURL = string;
export type Email = string;
export type id = number
export type isPro = boolean;
export type Name = string;

export type AuthInfo = {
  avatarUrl?: AvatarURL,
  email: Email,
  id: id,
  isPro?: isPro,
  name: Name,
  token: Token
};

export type AdaptedAuthInfoType = AuthInfoFromServer & { avatarUrl: AvatarURL | undefined, isPro: isPro | undefined };

