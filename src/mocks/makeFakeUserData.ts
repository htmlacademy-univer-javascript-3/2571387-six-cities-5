import { name, internet, datatype } from 'faker';
import { UserData } from '../types';

const makeFakeUserData = (): UserData => ({
  name: name.title(),
  avatarUrl: internet.avatar(),
  isPro: true,
  email: internet.email(),
  token: datatype.uuid(),
});

export default makeFakeUserData;
