import uniqBy from 'lodash.uniqby';
import allCars from './cars.json';

export const cars = uniqBy(allCars, (car) => car.sku);
export tracks from '../data/tracks.json';
