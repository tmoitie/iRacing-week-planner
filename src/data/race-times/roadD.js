import { duration } from 'moment';

export default [
  {
    // Global Challenge
    seriesId: 210,
    everyTime: duration(2, 'hours'),
    offset: duration(90, 'minutes'),
  }, {
    // GT Cup
    seriesId: 130,
    everyTime: duration(2, 'hours'),
    offset: duration(75, 'minutes'),
  }, {
    // SRF
    seriesId: 63,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes'),
  }, {
    // RUF GT3
    seriesId: 277,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes')
  }, {
    // Skippy
    seriesId: 34,
    everyTime: duration(1, 'hours'),
    offset: duration(15, 'minutes'),
  }
];
