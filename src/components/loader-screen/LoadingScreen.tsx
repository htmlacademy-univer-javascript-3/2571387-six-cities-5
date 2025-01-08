import './loading-screen.css';
import React from 'react';

function LoadingScreen(): JSX.Element {
  return (
    <div className="page-loader">
      <div className="spinner" data-testid="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default React.memo(LoadingScreen);
