import { Login } from '../Login/login';

type AuthorizedRouteProps = {
  element: JSX.Element;
  isAuthorized: boolean;
}

function AuthChecker({ element, isAuthorized }: AuthorizedRouteProps): JSX.Element {
  return (isAuthorized ? element : <Login />);
}

export default AuthChecker;
