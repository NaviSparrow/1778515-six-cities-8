import {Email} from '../types/auth-info-type';

const AUTH_EMAIL = 'six-cities-user-email';

export const getEmail = (): Email => {
  const email = localStorage.getItem(AUTH_EMAIL);
  return  email ?? '';
};

export const saveEmail = (email: Email): void => {
  localStorage.setItem(AUTH_EMAIL, email);
};

export const dropEmail = (): void => {
  localStorage.removeItem(AUTH_EMAIL);
};
