import { AuthorizationStatus } from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../types';
import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';


export const UserInfoHeader = (): JSX.Element => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userEmail = useAppSelector((state) => state.userData?.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };
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
                      to={AppRoute.Main}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">
                        {userEmail}
                      </span>
                      <span className="header__favorite-count">3</span>
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
