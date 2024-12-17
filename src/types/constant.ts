export const URL_MARKER_DEFAULT = '../../markup/img/pin.svg';
export const URL_MARKER_CURRENT = '../../markup/img/pin-active.svg';
export const ZOOM = 10;
export const TIMEOUT_SHOW_ERROR = 2000;

export enum APIRoute {
  Offers = '/offers',
  Offer = '/offers/',
  Favorites = '/favorite',
  FavoriteSet = '/favorite/{offerId}/{status}',
  Comments = '/comments/',
  Login = '/login',
  Logout = 'logout',
}
