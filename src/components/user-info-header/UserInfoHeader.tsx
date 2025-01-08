import { AuthorizationStatus } from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../types';
import React, { SyntheticEvent, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { selectAuthStatus, selectUserData, selectUserFavoritesData } from '../../store/user-slice/selectors';


const UserInfoHeader = (): JSX.Element => {
  const authStatus = useAppSelector(selectAuthStatus);
  const authorizationStatus = useMemo(() => authStatus, [authStatus]);

  const userDataEmail = useAppSelector(selectUserData)?.email;
  const userEmail = useMemo(() => userDataEmail, [userDataEmail]);

  const userFavoritesOffer = useAppSelector(selectUserFavoritesData);
  const userFavourite = useMemo(() => userFavoritesOffer, [userFavoritesOffer]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback((evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  },
  [dispatch]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <div className="header__logo-link header__logo-link--active"
              onClick={() => navigate(AppRoute.Main)}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </div>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus === AuthorizationStatus.Auth ?
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name" data-testid="user-email">
                        {userEmail}
                      </span>
                      <span className="header__favorite-count" data-testid="user-favorites">{userFavourite.length}</span>
                    </Link>
                  </li> :
                  null
              }
              <li className="header__nav-item">
                {
                  authorizationStatus === AuthorizationStatus.Auth ?
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__signout" onClick={handleClick}>Sign out</span>
                    </Link> :
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__signout">Sign in</span>
                    </Link>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default React.memo(UserInfoHeader);
