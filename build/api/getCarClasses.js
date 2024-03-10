import { clientGet } from './iracingClient';

// Only used to help get Ring Meister / Draftmaster in check
export default async function getCarClasses() {
  const carClassResponse = await clientGet('/data/carclass/get');
  return carClassResponse.data.map((carClass) => ({
    id: carClass.id,
    cars_in_class: carClass.cars_in_class,
    name: carClass.car_name,
    short_name: carClass.short_name,
  }));
}
