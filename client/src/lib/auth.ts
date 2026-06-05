import Cookies from 'js-cookie';
import { User } from './types';

const TOKEN_KEY = 'bk_token';
const USER_KEY = 'bk_user';

export const setAuth = (token: string, user: User) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: 'strict' });
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  Cookies.remove(TOKEN_KEY);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
