import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../types';
import LoadingScreen from '../loader-screen/LoadingScreen';

interface IPrivateRouterProps {
  authorizationStatus: AuthorizationStatus;
  children?: React.ReactNode;
}

export const PrivateRoute: React.FC<IPrivateRouterProps> = ({
  authorizationStatus,
  children
}: IPrivateRouterProps) => {
  if (authorizationStatus === AuthorizationStatus.UnKnown) {
    return <LoadingScreen />;
  }
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};
