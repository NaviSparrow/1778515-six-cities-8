import {Token} from '../services/token';
import {AvatarURL, Email, id, isPro, Name} from './auth-info-type';

export type AuthInfoFromServerType = {
  'avatar_url'?: AvatarURL,
  email: Email,
  id: id,
  'is_pro'?: isPro,
  name: Name,
  token: Token
};
