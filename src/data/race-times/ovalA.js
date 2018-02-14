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
    // NASCAR iRacing Pro Series
    seriesId: 95,
    setTimes: [
      duration({ days: 1, hours: 2 }), // Wed 2am
    ],
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [3.5, 5.2, 5.5]
  },
  {
    // NASCAR Road to Pro
    seriesId: 328,
    // setTimes: [
      // duration({ days: 1, hours: 2 }), // Wed 2am
    // ],
    weekStartOffset: duration({ days: 7 }),
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [
      1.5, 2.1, 2.2, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 8.2, 9.1, 10.1, 11.1, 12.1,
      13.1, 13.2, 13.3, 13.4, 14.1, 15.1
    ]
  }
];
