import { Token } from '../services/token';
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
  id: string;
  previewImage: string;
  isPremium?: boolean;
  price: number;
  rating: number;
  title: string;
  type: string;
  isFavorite: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  images: string[];
  bedrooms: number;
  maxAdults: number;
  city: CityData;
  description: string[];
  goods: string[];
  host: User;
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
  Offer = '/offer/',
}

type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type TReview = {
  id: string;
  user: User;
  rating: number;
  comment: string;
  date: string;
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

export type AuthData = {
  login: string;
  password: string;
}

export type ReviewData = {
  id: string;
  review: string;
  rating: number;
}

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: Token;
}

export enum NameSpace {
  OFFER = 'offer',
  USER = 'user',
}
