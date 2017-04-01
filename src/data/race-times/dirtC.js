import { duration } from 'moment';

export default [
  {
    // Dirt 360 Sprint Car
    seriesId: 305,
    everyTime: duration(2, 'hours'),
    offset: duration(90, 'minutes')
  },
  {
    // Dirt Pro Late Model
    seriesId: 306,
    everyTime: duration(2, 'hours'),
    offset: duration(30, 'minutes')
  },
];
