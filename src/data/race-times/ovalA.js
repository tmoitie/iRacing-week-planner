import { duration } from 'moment';

export default [
  {
    // Sprint Cup Open
    seriesId: 58,
    everyTime: duration(2, 'hours'),
    offset: duration(30, 'minutes'),
  },
  {
    // Sprint Cup Fixed
    seriesId: 191,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes'),
  },
  {
    // NASCAR Road to Pro
    seriesId: 328,
    // setTimes: [
      // duration({ days: 1, hours: 2 }), // Wed 2am
    // ],
    weekStartOffset: duration({ days: 7 }),
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 6.2, 7.1, 8.1, 9.1, 10.1, 11.1, 11.2, 11.3, 11.4, 12.1]
  }
];
