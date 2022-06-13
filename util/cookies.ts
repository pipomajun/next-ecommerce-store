import Cookies from 'js-cookie';
import { CookiesType } from './types';

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key); // Type is string | undefined

  if (!cookieValue) {
    return []; // change from undefined to empty array
  }

  try {
    return JSON.parse(cookieValue); // Type is string
  } catch (err) {
    return []; // change from undefined to empty array
  }
}

export function setStringifiedCookie(key: string, value: CookiesType[]) {
  Cookies.set(key, JSON.stringify(value));
}
