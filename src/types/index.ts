export type City = 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Amsterdam'
  | 'Hamburg'
  | 'Dusseldorf';

export type offerCard = {
  id: number;
  img: string;
  category?: string;
  price: number;
  rating: number;
  name: string;
  type: string;
  inMarks: boolean;
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  UnKnown = 'UNKNOWN'
}

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Main = '/',
  Offer = '/offer/:id',
}
