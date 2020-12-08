import uniqBy from 'lodash.uniqby';
import allCars from './cars.json';

export { default as tracks } from './tracks.json';

export const cars = uniqBy(allCars, (car) => car.sku);
