import { address } from 'faker';

type TLocation = {
  latitude: number;
  longitude: number;
}

const makeFakeLocation = (): TLocation => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
});

export default makeFakeLocation;
