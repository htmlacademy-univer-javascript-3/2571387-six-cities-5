import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../types';
//import styles from './styles.module.css';

const NotFound: React.FC = () => (
  <Fragment>
    <h2> Not Found 404.</h2>
    <Link to={AppRoute.Main}>
      На главную страницу
    </Link>
  </Fragment>
);

export default React.memo(NotFound);
