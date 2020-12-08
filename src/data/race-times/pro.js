import { duration } from 'moment';

export default [
  // {
  //   // NASCAR PEAK Antifreeze Series
  //   seriesId: 205,
  //   setTimes: [
  //     duration({ days: 1, hours: 0, minutes: 45 }), // Wed 0:45
  //   ],
  //   // weekStartOffset: duration({ days: 14 }),
  //   weekEndOffset: duration({ days: 7 }),
  //   offWeeks: [
  //     1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 8.2, 9.1, 10.1, 11.1, 12.1, 13.1, 15.1, 16.1, 17.1
  //   ]
  // },
  // {
  //   // iRacing.com World Championship Grand Prix Series
  //   seriesId: 206,
  //   setTimes: [
  //     duration({ days: 4, hours: 14 }), // Sat 2pm
  //   ],
  //   weekStartOffset: duration({ days: 9 }),
  //   offWeeks: [
  //     1.1, 2.1, 3.1, 4.1, 5.1, 5.2, 6.1, 7.1, 7.2, 8.1, 9.1, 9.2, 9.3,
  //     10.1, 11.1, 12.1, 13.1
  //   ]
  // },
  // {
  //   // VRS GT iRacing World Championship
  //   seriesId: 268,
  //   // setTimes: [
  //   //   duration({ days: 4, hours: 13, minutes: 30 }), // Sat 1330
  //   // ],
  //   weekStartOffset: duration({ days: 2 }),
  //   weekEndOffset: duration({ days: 7 }),
  //   offWeeks: [
  //     1.1, 1.2, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 5.1
  //   ]
  // },
  {
    // NASCAR iRacing Pro Series
    seriesId: 95,
    setTimes: [
      duration({ days: 1, hours: 2 }), // Wednesday 2am
    ],
  },
  {
    // WoO Sprint Car WC Series
    seriesId: 338,
    weekStartOffset: duration({ days: 7 }),
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [5.1, 6.1],
    setTimes: [
      duration({ days: 0, hours: 1, minutes: 45 }), // Tuesday 1:45am
    ],
  },
  {
    // eNASCAR Coca-Cola Series
    seriesId: 402,
    setTimes: [
      duration({ days: 1, hours: 0, minutes: 30 }), // Wed 12:30am
    ],
    weekStartOffset: duration({ days: 6 }),
    // weekEndOffset: duration({ days: 7 }),
    offWeeks: [1.1, 2.1, 2.2, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 8.2, 8.3, 8.4, 9.1, 10.1, 11.1, 12.1, 13.1, 13.2],
  },
  {
    // Porsche TAG Heuer Esports Supercup
    seriesId: 409,
    weekEndOffset: duration({ days: 7 }),
    setTimes: [
      duration({ days: 4, hours: 13, minutes: 45 }), // Sat 1:45pm
    ],
    offWeeks: [
      2.1, 3.1, 3.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 10.1, 10.1, 11.1,
    ],
  },
];
