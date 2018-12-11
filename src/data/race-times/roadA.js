import { duration } from 'moment';

export default [
  {
    // Grand Prix
    seriesId: 260,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes'),
  },
  {
    // Road Pro Series
    seriesId: 67,
    setTimes: [
      duration({ days: 4, hours: 14 }), // Sat 2pm
    ],
    offWeeks: [5.5, 6.2, 6.5]
  },
  {
    // GT Endurance Pro Series
    seriesId: 365,
    setTimes: [
      duration({ days: 4, hours: 9 }), // Sat 9am
      duration({ days: 4, hours: 19 }), // Sat 7pm
    ],
    weekStartOffset: duration({ days: 7 }),
    weekEndOffset: duration({ days: 0 }),
    offWeeks: [1.1, 2.1, 3.1, 4.1, 5.1]
  }
];
