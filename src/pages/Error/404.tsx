import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../types';

const Error404: React.FC = () => (
  <Fragment>
    <h2> Error404.</h2>
    <Link to={AppRoute.Main}>
      На главную страницу
    </Link>
  </Fragment>
);

export default React.memo(Error404);
