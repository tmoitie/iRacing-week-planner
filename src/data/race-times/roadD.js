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
    // weekStartOffset: duration({ days: 7 }),
    // weekEndOffset: duration({ days: 7 }),
    offWeeks: [
      1.1, 2.1, 2.1, 3.1, 3.1, 3.1, 3.1, 3.1, 4.1, 4.1, 4.1, 4.1, 6.1, 6.1, 6.1, 7.1, 7.1, 8.1, 8.1, 8.1, 8.1, 8.1, 8.1
    ],
    setTimes: [
      duration({ days: 5, hours: 1, minutes: 0 }), // Sat, 01:00 GMT
      duration({ days: 5, hours: 13, minutes: 0 }), // Sat, 13:00 GMT
    ],
  }, {
    // Ferrari GT3 Challenge
    seriesId: 353,
    everyTime: duration(1, 'hours'),
    offset: duration(30, 'minutes')
  }
];
