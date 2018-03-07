import { duration } from 'moment';

export default [
  {
    // NASCAR PEAK Antifreeze Series
    seriesId: 205,
    // setTimes: [
      // duration({ days: 1, hours: 2 }), // Wed 2am
    // ],
    weekStartOffset: duration({ days: 14 }),
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [
      1.1, 1.2, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 7.2, 8.1, 9.1, 10.1, 11.1, 12.1,
      14.1, 15.1, 16.1, 17.1
    ]
  },
  {
    // iRacing.com World Championship Grand Prix Series
    seriesId: 206,
    setTimes: [
      duration({ days: 4, hours: 14 }), // Sat 2pm
    ],
    weekStartOffset: duration({ days: 9 }),
    offWeeks: [
      1.1, 2.1, 3.1, 4.1, 5.1, 5.2, 6.1, 7.1, 7.2, 8.1, 9.1, 9.2, 9.3,
      10.1, 11.1, 12.1, 13.1
    ]
  }
];
206
