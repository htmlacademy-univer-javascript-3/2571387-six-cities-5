enum Path {
    MainPage = '/',
    LoginPage = '/login',
    FavPage = '/favourites',
    OfferPage = '/offer/:id'
  }

  enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN'
  }

  enum OfferType {
    Apartment = 'apartment',
    Room = 'room',
    House = 'house',
    Hotel = 'hotel'
  }

export { Path, AuthorizationStatus, OfferType };
