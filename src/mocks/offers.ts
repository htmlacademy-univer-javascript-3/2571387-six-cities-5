import { offerCard, City } from '../types';

export const CITY: City = 'Amsterdam';

export const OFFERS_CARDS: offerCard[] = [
  {
    id: 1,
    img: 'img/appartment-01.jpg',
    category: 'Premium',
    price: 20,
    rating: 1,
    name: 'Test1',
    type: 'Apartament',
    inMarks: true,
  }, {
    id: 2,
    img: 'img/appartment-02.jpg',
    price: 30,
    rating: 2,
    name: 'Test2',
    type: 'Apartament',
    inMarks: false,
  }, {
    id: 3,
    img: 'img/appartment-03.jpg',
    price: 70,
    rating: 5,
    name: 'Test3',
    type: 'Room',
    inMarks: false,
  }, {
    id: 3,
    img: 'img/appartment-03.jpg',
    price: 200,
    rating: 2,
    name: 'Test4',
    type: 'Apartament',
    inMarks: true,
  }
];
