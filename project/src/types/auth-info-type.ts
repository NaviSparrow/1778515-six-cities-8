import {Token} from '../services/token';
import {AuthInfoFromServerType} from './auth-info-from-server-type';

export type AvatarURL = string;
export type Email = string;
export type id = number
export type isPro = boolean;
export type Name = string;

export type AuthInfoType = {
  avatarUrl?: AvatarURL,
  email: Email,
  id: id,
  isPro?: isPro,
  name: Name,
  token: Token
};

export type AdaptedAuthInfoType = AuthInfoFromServerType & { avatarUrl: AvatarURL | undefined, isPro: isPro | undefined };

