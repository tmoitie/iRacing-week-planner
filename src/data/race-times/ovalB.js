import { duration } from 'moment';

export default [
  {
    // Silver Crown
    seriesId: 53,
    everyTime: duration(2, 'hours'),
    offset: duration(105, 'minutes'),
  },
  {
    // Sprint Car
    seriesId: 131,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  },
  {
    // Xfinity Open
    seriesId: 62,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes'),
  },
  {
    // Xfinity Fixed
    seriesId: 103,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  }
];
