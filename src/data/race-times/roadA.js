import { duration } from 'moment';

export default [
  {
    // Grand Prix
    seriesId: 260,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes'),
  },
  {
    // European Sprint
    seriesId: 448,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  },
  {
    // Le Mans Enduro
    seriesId: 331,
    setTimes: [
      duration({ days: 4, hours: 7 }), // Sat 7am
      duration({ days: 4, hours: 18 }), // Sat 6pm
      duration({ days: 5, hours: 14 }), // Sun 2pm
    ],
    offWeeks: [1.1, 1.1, 2.1, 3.1, 4.1, 5.1],
  },
  // {
  //   // Road Pro Series
  //   seriesId: 67,
  //   setTimes: [
  //     duration({ days: 4, hours: 14 }), // Sat 2pm
  //   ],
  //   offWeeks: [5.5, 6.2, 6.5]
  // },
  // {
  //   // GT Endurance Pro Series
  //   seriesId: 365,
  //   setTimes: [
  //     duration({ days: 4, hours: 9 }), // Sat 9am
  //     duration({ days: 4, hours: 19 }), // Sat 7pm
  //   ],
  //   weekStartOffset: duration({ days: 7 }),
  //   weekEndOffset: duration({ days: 0 }),
  //   offWeeks: [1.1, 2.1, 3.1, 4.1, 5.1]
  // },
  // {
  //   // Porsche ESport Challenge
  //   seriesId: 373,
  //   // setTimes: [
  //   //   duration({ days: 4, hours: 9 }), // Sat 9am
  //   //   duration({ days: 4, hours: 19 }), // Sat 7pm
  //   // ],
  //   // weekStartOffset: duration({ days: 7 }),
  //   weekEndOffset: duration({ days: 7 }),
  //   offWeeks: [1.1, 2.1, 3.1, 4.1, 5.1, 5.2, 6.1, 7.1, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 9.1]
  // }
];
