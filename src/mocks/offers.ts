import { offerCard } from '../types';

export const OFFERS_CARDS: offerCard[] = [
  {
    id: 1,
    img: 'img/apartment-01.jpg',
    category: 'Premium',
    price: 20,
    rating: 1,
    name: 'Test1',
    type: 'Apartament',
    inMarks: true,
    lat: 52.3909553943508,
    lng: 4.85309666406198,
  }, {
    id: 2,
    img: 'img/apartment-02.jpg',
    price: 70,
    rating: 2,
    name: 'Test2',
    type: 'Apartament',
    inMarks: false,
    lat: 52.3609553943508,
    lng: 4.85309666406198,
  },
  {
    id: 3,
    img: 'img/apartment-03.jpg',
    price: 40,
    rating: 5,
    name: 'Test3',
    type: 'Room',
    inMarks: false,
    lat: 52.3909553943508,
    lng: 4.929309666406198,
  }, {
    id: 4,
    img: 'img/apartment-03.jpg',
    price: 200,
    rating: 2,
    name: 'Test4',
    type: 'Apartament',
    inMarks: true,
    lat: 52.3809553943508,
    lng: 4.939309666406198,
  }
];
