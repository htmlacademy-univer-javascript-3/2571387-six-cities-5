import { store } from '../store';

export type City = 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Amsterdam'
  | 'Hamburg'
  | 'Dusseldorf'
  | '';

export type CityData = {
  name: City;
  location: {
    latitude: number;
    longitude: number;
  };
}

export type offerCard = {
  id: number;
  previewImage: string;
  category?: string;
  price: number;
  rating: number;
  name: string;
  type: string;
  inMarks: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  city: CityData;
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

type User = {
  name: string;
  avatar: string;
}

export type TReview = {
  id: number;
  user: User;
  rating: number;
  text: string;
  date: Date;
}

export const enum CardClassNameList {
  citiesList = 'cities__card',
  neardPlace = 'near-places__card',
  favoritePlace = 'favorites__card',
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const enum SortName {
  popular = 'popular',
  lowToHigh = 'lowToHigh',
  highToLow = 'highToLow',
  topRated = 'topRated',
}
