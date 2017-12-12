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
  }
];
