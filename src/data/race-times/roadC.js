import { duration } from 'moment';

export default [
  {
    // Blancpain Endurance
    seriesId: 237,
    setTimes: [
      duration({ days: 4, hours: 9 }), // Sat 9am
      duration({ days: 4, hours: 19 }),  // Sat 7pm
      duration({ days: 5, hours: 17 })  // Sun 5pm
    ],
    weekStartOffset: duration({ days: 0 }),
    weekEndOffset: duration({ days: 0 }),
    offWeeks: [2.5, 3.5, 4.2, 4.7, 5.5]
  },
];
