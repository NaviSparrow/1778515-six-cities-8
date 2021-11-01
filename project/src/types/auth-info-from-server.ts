import {Token} from '../services/token';
import {AvatarURL, Email, id, isPro, Name} from './auth-info';
/* eslint-disable camelcase */

export type AuthInfoFromServer = {
  avatar_url?: AvatarURL,
  email: Email,
  id: id,
  is_pro?: isPro,
  name: Name,
  token: Token
};
