import { clientGet } from '../helpers/iracing-client';

const catsToDiscountGroupNames = {
  oval: 'oval car',
  road: 'road car',
};

export default async function getCars() {
  const carsResponse = await clientGet('/data/car/get');
  return carsResponse.data.map((car) => ({
    freeWithSubscription: car.free_with_subscription,
    skuname: car.car_name, // @todo check
    name: car.car_name,
    sku: car.sku,
    id: car.car_id,
    packageId: car.packageId,
    categories: car.categories,
    discountGroupNames: car.categories.map((category) => catsToDiscountGroupNames[category]),
    price: car.price,
  }));
}
