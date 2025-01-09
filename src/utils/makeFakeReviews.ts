import { TReview } from '../types';
import { helpers, datatype, date } from 'faker';
import makeFakeUserData from './makeFakeUserData';

const makeFakeReview = (): TReview => ({
  id: datatype.uuid(),
  user: makeFakeUserData(),
  rating: datatype.number(),
  comment: helpers.randomize(),
  date: date.recent().toString(),
});

export default makeFakeReview;
