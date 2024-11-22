import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../types';

interface IPrivateRouterProps {
  authorizationStatus: AuthorizationStatus;
  children?: React.ReactNode;
}

export const PrivateRoute: React.FC<IPrivateRouterProps> = ({
  authorizationStatus,
  children
}: IPrivateRouterProps) => (
  authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />
);
