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
      1.1, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.11, 3.1, 4.1, 4.2,
      4.3, 4.4, 4.5, 5.1, 6.1, 6.2, 7.1, 8.1
    ]
  }
];
