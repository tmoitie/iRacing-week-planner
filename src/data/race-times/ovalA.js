import { duration } from 'moment';

export default [
  {
    // Class A Open
    seriesId: 58,
    everyTime: duration(2, 'hours'),
    offset: duration(30, 'minutes'),
  },
  {
    // Class A Fixed
    seriesId: 191,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes'),
  },
  {
    // NASCAR Road to Pro
    seriesId: 328,
    // setTimes: [
    // duration({ days: 1, hours: 2 }), // Wed 2am
    // ],
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 6.1, 7.1, 8.1, 9.1, 10.1, 11.1, 12.1, 12.1, 13.1],
  },
];
