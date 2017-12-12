import { duration } from 'moment';

export default [
  {
    // Late model
    seriesId: 33,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes')
  },
  {
    // National
    seriesId: 167,
    everyTime: duration(2, 'hours'),
    offset: duration(105, 'minutes'),
  },
  {
    // SK Modified
    seriesId: 45,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  }
];
