import fixText from './fixText';

export default function carsFilter(cars) {
  return cars.map(car => ({
    freeWithSubscription: car.freeWithSubscription,
    skuname: fixText(car.skuname),
    name: fixText(car.name),
    sku: car.sku,
  }));
}
