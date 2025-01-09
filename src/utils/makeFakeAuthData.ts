import { AuthData } from '../types';
import { internet } from 'faker';

const makeFakeAuthData = (): AuthData => ({
  login: internet.email(),
  password: internet.password(),
});

export default makeFakeAuthData;
