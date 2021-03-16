import { duration } from 'moment';

export default [
  {
    // Late model
    seriesId: 33,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes'),
  },
  {
    // Late model tour
    seriesId: 440,
    everyTime: duration(2, 'hours'),
    offset: duration(75, 'minutes'),
  },
  {
    // ARCA
    seriesId: 167,
    everyTime: duration(1, 'hours'),
    offset: duration(45, 'minutes'),
  },
  {
    // SK Modified Ryco
    seriesId: 445,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  },
  {
    // SK Modified Weekly
    seriesId: 441,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes'),
  },
];
