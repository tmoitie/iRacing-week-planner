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
    // eNASCAR Road to Pro
    seriesId: 438,
    setTimes: [
      duration({ days: 2, hours: 1 }), // Thu 1am
    ],
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [1.1, 2.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1],
  },
];
