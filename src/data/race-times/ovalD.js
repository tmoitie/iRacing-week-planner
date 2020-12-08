import { duration } from 'moment';

export default [
  {
    // Late model
    seriesId: 33,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes'),
  },
  {
    // ARCA
    seriesId: 167,
    everyTime: duration(1, 'hours'),
    offset: duration(45, 'minutes'),
  },
  {
    // SK Modified
    seriesId: 45,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  }
];
