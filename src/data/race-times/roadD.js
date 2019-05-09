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
  }, {
    // VLN Endurance Champs
    seriesId: 275,
    offWeeks: [
      1.1, 1.2, 2.1, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 4.1, 4.2, 5.1, 5.2, 5.3, 5.4, 6.1,
      6.2, 7.1, 8.1,
    ],
  }, {
    // Ferrari GT3 Challenge
    seriesId: 353,
    everyTime: duration(1, 'hours'),
    offset: duration(30, 'minutes')
  }
];
