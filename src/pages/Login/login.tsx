import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types';
import React, { FormEvent, useCallback, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { selectAuthStatus } from '../../store/user-slice/selectors';
import { CITIES } from '../../types/cities';
import { changeSelectedCity } from '../../store/offer-slice/offerSlice';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectAuthStatus);
  const authorizationStatus = useMemo(() => authStatus, [authStatus]);

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const getRandomCity = () => {
    const randomIndex = Math.floor(Math.random() * CITIES.length);
    return CITIES[randomIndex];
  };

  const randomCity = getRandomCity();

  const handleSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();
    const login = emailInput.current!.value;
    const password = passwordInput.current!.value;
    dispatch(loginAction({login, password}));
  },
  [passwordInput, emailInput]);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title" data-testid="login-title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit} data-testid="login-form">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={emailInput}
                  required
                  data-testid="email-input"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordInput}
                  required
                  data-testid="password-input"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} onClick={() => dispatch(changeSelectedCity(randomCity))}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default React.memo(Login);
