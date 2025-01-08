import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user-slice/userSlice';
import { offerReducer } from './offer-slice/offerSlice';
import { NameSpace } from '../types';

export const rootReducer = combineReducers({
  [NameSpace.USER]: userReducer,
  [NameSpace.OFFER]: offerReducer,
});
