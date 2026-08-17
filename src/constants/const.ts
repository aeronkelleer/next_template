import { AppRoute } from './enums';

// %======================== const ========================% //

export const PREFIX = '';

export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
export const REQUEST_TIMEOUT = 5000;
export const COOKIE_LABEL_TIMEOUT = 3000;
export const COOKIE_NAME = 'cookiesAccepted';

// %------------------------ routing ------------------------% //

export const PagesNames = {
  [AppRoute.HOME]: 'Главная',
};

// %------------------------ rendering ------------------------% //

