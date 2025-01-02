import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import { offerReducer } from './offerSlice';
import { NameSpace } from '../types';

export const rootReducer = combineReducers({
  [NameSpace.USER]: userReducer,
  [NameSpace.OFFER]: offerReducer,
});
